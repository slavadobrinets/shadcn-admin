import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { showSubmittedData } from '@/utils/show-submitted-data'
import { Button } from '@/components/ui/button'
import { useSupabaseGroups } from '@/features/groups/hooks/useSupabaseGroups'
import { CheckIcon, CaretSortIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
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
import { SelectDropdown } from '@/components/select-dropdown'
import { getStudentTypes } from '../data/data'
import { Student } from '../data/schema'

const createFormSchema = (t: any) => z
  .object({
    full_name: z.string().min(1, { message: t('students.form.errors.name_required') }),
    group: z.string().min(1, { message: t('students.form.errors.group_required') }),
    role: z.string().min(1, { message: t('students.form.errors.role_required') }),
    isEdit: z.boolean(),
  })
type StudentForm = z.infer<ReturnType<typeof createFormSchema>>

interface Props {
  currentRow?: Student
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function StudentsActionDialog({ currentRow, open, onOpenChange }: Props) {
  const { t } = useTranslation('common')
  const isEdit = !!currentRow
  const formSchema = createFormSchema(t)
  const form = useForm<StudentForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
          isEdit,
        }
      : {
          full_name: '',
          group: '',
          role: '',
          isEdit,
        },
  })

  const onSubmit = (values: StudentForm) => {
    form.reset()
    showSubmittedData(values, t('students.form.submitted_data'))
    onOpenChange(false)
  }

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
          <DialogTitle>{isEdit ? t('students.form.edit_title') : t('students.form.add_title')}</DialogTitle>
          <DialogDescription>
            {isEdit ? t('students.form.edit_description') : t('students.form.add_description')}
            {t('students.form.save_instruction')}
          </DialogDescription>
        </DialogHeader>
        <div className='-mr-4 h-[26.25rem] w-full overflow-y-auto py-1 pr-4'>
          <Form {...form}>
            <form
              id='student-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-0.5'
            >
              <FormField
                control={form.control}
                name='full_name'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                      {t('students.form.full_name')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('students.form.full_name_placeholder')}
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
                name='group'
                render={({ field }) => {
                  // Получаем список всех групп
                  const { data: groups, isLoading } = useSupabaseGroups();
                  
                  return (
                    <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                      <FormLabel className='col-span-2 text-right'>
                        {t('students.form.group')}
                      </FormLabel>
                      <div className='col-span-4'>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant='outline'
                                role='combobox'
                                className={cn(
                                  'w-full justify-between',
                                  !field.value && 'text-muted-foreground'
                                )}
                                disabled={isLoading}
                              >
                                {field.value && groups
                                  ? groups.find((group) => group.id === field.value)?.name || t('students.form.group_placeholder')
                                  : isLoading 
                                    ? t('common.loading') 
                                    : t('students.form.group_placeholder')}
                                <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className='w-full p-0'>
                            <Command>
                              <CommandInput placeholder={t('students.form.group_search_placeholder') || 'Поиск группы...'} />
                              <CommandEmpty>{t('students.form.group_not_found') || 'Группа не найдена'}</CommandEmpty>
                              <CommandGroup>
                                <CommandList>
                                  {groups && groups.map((group) => (
                                    <CommandItem
                                      value={group.name}
                                      key={group.id}
                                      onSelect={() => {
                                        form.setValue('group', group.id);
                                      }}
                                    >
                                      <CheckIcon
                                        className={cn(
                                          'mr-2 h-4 w-4',
                                          group.id === field.value
                                            ? 'opacity-100'
                                            : 'opacity-0'
                                        )}
                                      />
                                      {group.name}
                                    </CommandItem>
                                  ))}
                                </CommandList>
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <FormMessage className='col-span-4 col-start-3' />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                      {t('students.form.role')}
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder={t('students.form.role_placeholder')}
                      className='col-span-4'
                      items={getStudentTypes(t).map((type) => ({
                        label: type.label,
                        value: type.value,
                      }))}
                    />
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button type='submit' form='student-form'>
            {t('students.form.save_button')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
