import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { showSubmittedData } from '@/utils/show-submitted-data'
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
import { Group } from '../data/schema'

const createFormSchema = (t: any) => z
  .object({
    name: z.string().min(1, { message: t('groups.form.errors.name_required') }),
    isEdit: z.boolean(),
  })
type GroupForm = z.infer<ReturnType<typeof createFormSchema>>

interface Props {
  currentRow?: Group
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function GroupsActionDialog({ currentRow, open, onOpenChange }: Props) {
  const { t } = useTranslation('common')
  const isEdit = !!currentRow
  const formSchema = createFormSchema(t)
  const form = useForm<GroupForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
          isEdit,
        }
      : {
          name: '',
          isEdit,
        },
  })

  const onSubmit = (values: GroupForm) => {
    form.reset()
    showSubmittedData(values, t('groups.form.submitted_data'))
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
          <DialogTitle>{isEdit ? t('groups.form.edit_title') : t('groups.form.add_title')}</DialogTitle>
          <DialogDescription>
            {isEdit ? t('groups.form.edit_description') : t('groups.form.add_description')}
            {t('groups.form.save_instruction')}
          </DialogDescription>
        </DialogHeader>
        <div className='-mr-4 h-[26.25rem] w-full overflow-y-auto py-1 pr-4'>
          <Form {...form}>
            <form
              id='group-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-0.5'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                      {t('groups.form.name')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('groups.form.name_placeholder')}
                        className='col-span-4'
                        autoComplete='off'
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
          <Button type='submit' form='group-form'>
            {t('groups.form.save_button')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
