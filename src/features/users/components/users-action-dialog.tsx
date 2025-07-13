'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { showSuccessMessage, showErrorMessage } from '@/utils/show-submitted-data'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createSupabaseUser, updateSupabaseUser } from '../api/users'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'
import { SelectDropdown } from '@/components/select-dropdown'
import { userTypes, getDepartments } from '../data/data'
import { User, UserInput } from '../data/schema'


// Создаем схему формы
const createFormSchema = (t: any) => z
  .object({
    full_name: z.string().min(1, { message: t('users.form.errors.name_required') }),
    login: z.string().min(1, { message: t('users.form.errors.username_required') }),
    department: z.string().min(1, { message: t('users.form.errors.department_required') }),
    position: z.string().min(1, { message: t('users.form.errors.position_required') }),
    email: z
      .string()
      .min(1, { message: t('users.form.errors.email_required') })
      .email({ message: t('users.form.errors.email_invalid') }),
    password: z.string().transform((pwd) => pwd.trim()),
    role: z.enum(['admin', 'teacher'], {
      required_error: t('users.form.errors.role_required'),
      invalid_type_error: t('users.form.errors.role_invalid'),
    }),
    confirmPassword: z.string().transform((pwd) => pwd.trim()),
    isEdit: z.boolean(),
  })
  .superRefine(({ isEdit, password, confirmPassword }, ctx) => {
    if (!isEdit || (isEdit && password !== '')) {
      if (password === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('users.form.errors.password_required'),
          path: ['password'],
        })
      }

      if (password.length < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('users.form.errors.password_min_length'),
          path: ['password'],
        })
      }

      if (!password.match(/[a-z]/)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('users.form.errors.password_lowercase'),
          path: ['password'],
        })
      }

      if (!password.match(/\d/)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('users.form.errors.password_number'),
          path: ['password'],
        })
      }

      if (password !== confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: t('users.form.errors.passwords_not_match'),
          path: ['confirmPassword'],
        })
      }
    }
  })
type UserForm = z.infer<ReturnType<typeof createFormSchema>>

interface Props {
  currentRow?: User
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UsersActionDialog({ currentRow, open, onOpenChange }: Props) {
  const { t } = useTranslation('common')
  const isEdit = !!currentRow
  const formSchema = createFormSchema(t)
  const form = useForm<UserForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
          password: '',
          confirmPassword: '',
          isEdit,
        }
      : {
          full_name: '',
          login: '',
          department: '',
          position: '',
          email: '',
          role: 'teacher', // Устанавливаем значение по умолчанию
          password: '',
          confirmPassword: '',
          isEdit,
        },
  })

  // Получаем queryClient для инвалидации кэша после мутации
  const queryClient = useQueryClient()

  // Мутация для создания нового пользователя
  const createMutation = useMutation({
    mutationFn: (userData: UserInput) => createSupabaseUser(userData),
    onSuccess: () => {
      // Инвалидируем кэш, чтобы получить обновленные данные
      queryClient.invalidateQueries({ queryKey: ['supabaseUsers'] })
    },
  })

  // Мутация для обновления существующего пользователя
  const updateMutation = useMutation({
    mutationFn: ({ id, userData }: { id: string; userData: Partial<UserInput> }) => 
      updateSupabaseUser(id, userData),
    onSuccess: () => {
      // Инвалидируем кэш, чтобы получить обновленные данные
      queryClient.invalidateQueries({ queryKey: ['supabaseUsers'] })
    },
  })

  const onSubmit = async (values: UserForm) => {
    try {
      // Удаляем служебные поля перед отправкой
      const { isEdit, confirmPassword, ...userData } = values;
      
      if (isEdit && currentRow) {
        // Обновляем существующего пользователя
        const updateData: Partial<UserInput> = {
          full_name: userData.full_name,
          login: userData.login,
          email: userData.email,
          department: userData.department,
          position: userData.position,
          role: userData.role
        };
        
        // Добавляем пароль только если он был изменен
        if (userData.password) {
          updateData.password = userData.password;
        }
        
        await updateMutation.mutateAsync({ 
          id: currentRow.id, 
          userData: updateData
        });
        showSuccessMessage(t('users.form.update_success'));
      } else {
        // Создаем нового пользователя
        const newUser: UserInput = {
          full_name: userData.full_name,
          login: userData.login,
          email: userData.email,
          department: userData.department,
          position: userData.position,
          role: userData.role,
          password: userData.password
        };
        
        await createMutation.mutateAsync(newUser);
        showSuccessMessage(t('users.form.create_success'));
      }
      
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error('Ошибка при сохранении пользователя:', error);
      showErrorMessage(
        t('users.form.error'),
        error
      );
    }
  }

  const isPasswordTouched = !!form.formState.dirtyFields.password

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-left'>
          <DialogTitle>{isEdit ? t('users.form.edit_title') : t('users.form.add_title')}</DialogTitle>
          <DialogDescription>
            {isEdit ? t('users.form.edit_description') : t('users.form.add_description')}
            {t('users.form.save_instruction')}
          </DialogDescription>
        </DialogHeader>
        <div className='-mr-4 h-[26.25rem] w-full overflow-y-auto py-1 pr-4'>
          <Form {...form}>
            <form
              id='user-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-0.5'
            >
              <FormField
                control={form.control}
                name='full_name'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                      {t('users.form.full_name')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('users.form.full_name_placeholder')}
                        className='col-span-4'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='login'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                      {t('users.form.username')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('users.form.username_placeholder')}
                        className='col-span-4'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
                            <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                      {t('users.form.email')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('users.form.email_placeholder')}
                        className='col-span-4'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='department'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                      {t('users.form.department')}
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder="Выберите кафедру"
                      className='col-span-4'
                      items={getDepartments(t).map(({ label, value }) => ({
                        label,
                        value,
                      }))}
                    />
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='position'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                      {t('users.form.position')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('users.form.position_placeholder')}
                        className='col-span-4'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                      {t('users.form.role')}
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder={t('users.form.role_placeholder')}
                      className='col-span-4'
                      items={userTypes.map(({ label, value }) => ({
                        label,
                        value,
                      }))}
                    />
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                      {t('users.form.password')}
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder={t('users.form.password_placeholder')}
                        className='col-span-4'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                      {t('users.form.confirm_password')}
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        disabled={!isPasswordTouched}
                        placeholder={t('users.form.confirm_password_placeholder')}
                        className='col-span-4'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      <DialogFooter>
        <Button 
          type='submit' 
          form='user-form'
          disabled={createMutation.isPending || updateMutation.isPending}
        >
          {createMutation.isPending || updateMutation.isPending 
            ? t('users.form.saving') 
            : t('users.form.save_button')}
        </Button>
      </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
