import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { showSubmittedData } from '@/utils/show-submitted-data'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { SelectDropdown } from '@/components/select-dropdown'
import { Task } from '../data/schema'
import { useTranslation } from 'react-i18next'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Task
}

const formSchema = (t: any) => z.object({
  title: z.string().min(1, t('tasks.create_update.validation.title_required')),
  status: z.string().min(1, t('tasks.create_update.validation.status_required')),
  label: z.string().min(1, t('tasks.create_update.validation.label_required')),
  priority: z.string().min(1, t('tasks.create_update.validation.priority_required')),
})
type TasksForm = z.infer<ReturnType<typeof formSchema>>

export function TasksMutateDrawer({ open, onOpenChange, currentRow }: Props) {
  const { t } = useTranslation('common')
  const isUpdate = !!currentRow

  const form = useForm<TasksForm>({
    resolver: zodResolver(formSchema(t)),
    defaultValues: currentRow ?? {
      title: '',
      status: '',
      label: '',
      priority: '',
    },
  })

  const onSubmit = (data: TasksForm) => {
    // do something with the form data
    onOpenChange(false)
    form.reset()
    showSubmittedData(data)
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v)
        form.reset()
      }}
    >
      <SheetContent className='flex flex-col'>
        <SheetHeader className='text-left'>
          <SheetTitle>
            {isUpdate 
              ? t('tasks.create_update.update_title') 
              : t('tasks.create_update.create_title')
            }
          </SheetTitle>
          <SheetDescription>
            {isUpdate
              ? t('tasks.create_update.update_description')
              : t('tasks.create_update.create_description')}
            {' '}{t('tasks.create_update.finish_description')}
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            id='tasks-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex-1 space-y-5 px-4'
          >
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>{t('tasks.create_update.title_label')}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={t('tasks.create_update.title_placeholder')} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>{t('tasks.create_update.status_label')}</FormLabel>
                  <SelectDropdown
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    placeholder={t('tasks.create_update.status_placeholder')}
                    items={[
                      { label: t('tasks.status.in_progress'), value: 'in progress' },
                      { label: t('tasks.status.backlog'), value: 'backlog' },
                      { label: t('tasks.status.todo'), value: 'todo' },
                      { label: t('tasks.status.canceled'), value: 'canceled' },
                      { label: t('tasks.status.done'), value: 'done' },
                    ]}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='label'
              render={({ field }) => (
                <FormItem className='relative space-y-3'>
                  <FormLabel>{t('tasks.create_update.label_label')}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex flex-col space-y-1'
                    >
                      <FormItem className='flex items-center space-y-0 space-x-3'>
                        <FormControl>
                          <RadioGroupItem value='documentation' />
                        </FormControl>
                        <FormLabel className='font-normal'>
                          {t('tasks.label.documentation')}
                        </FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-y-0 space-x-3'>
                        <FormControl>
                          <RadioGroupItem value='feature' />
                        </FormControl>
                        <FormLabel className='font-normal'>{t('tasks.label.feature')}</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-y-0 space-x-3'>
                        <FormControl>
                          <RadioGroupItem value='bug' />
                        </FormControl>
                        <FormLabel className='font-normal'>{t('tasks.label.bug')}</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='priority'
              render={({ field }) => (
                <FormItem className='relative space-y-3'>
                  <FormLabel>{t('tasks.create_update.priority_label')}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex flex-col space-y-1'
                    >
                      <FormItem className='flex items-center space-y-0 space-x-3'>
                        <FormControl>
                          <RadioGroupItem value='high' />
                        </FormControl>
                        <FormLabel className='font-normal'>{t('tasks.priority.high')}</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-y-0 space-x-3'>
                        <FormControl>
                          <RadioGroupItem value='medium' />
                        </FormControl>
                        <FormLabel className='font-normal'>{t('tasks.priority.medium')}</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-y-0 space-x-3'>
                        <FormControl>
                          <RadioGroupItem value='low' />
                        </FormControl>
                        <FormLabel className='font-normal'>{t('tasks.priority.low')}</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <SheetFooter className='gap-2'>
          <SheetClose asChild>
            <Button variant='outline'>{t('tasks.create_update.close')}</Button>
          </SheetClose>
          <Button form='tasks-form' type='submit'>
            {t('tasks.create_update.save')}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
