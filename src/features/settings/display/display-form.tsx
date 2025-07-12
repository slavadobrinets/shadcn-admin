import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { showSubmittedData } from '@/utils/show-submitted-data'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const getItems = (t: (key: string) => string) => [
  {
    id: 'recents',
    label: t('settings.display.recents'),
  },
  {
    id: 'home',
    label: t('settings.display.home'),
  },
  {
    id: 'applications',
    label: t('settings.display.applications'),
  },
  {
    id: 'desktop',
    label: t('settings.display.desktop'),
  },
  {
    id: 'downloads',
    label: t('settings.display.downloads'),
  },
  {
    id: 'documents',
    label: t('settings.display.documents'),
  },
] as const

// Создаем базовую схему без сообщений об ошибках
const baseDisplayFormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'Required',
  }),
})

// Функция для создания схемы с переведенными сообщениями
const displayFormSchema = (t: (key: string) => string) => z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: t('settings.display.items_required'),
  }),
})

// Используем базовую схему для вывода типа
type DisplayFormValues = z.infer<typeof baseDisplayFormSchema>

// This can come from your database or API.
const defaultValues: Partial<DisplayFormValues> = {
  items: ['recents', 'home'],
}

export function DisplayForm() {
  const { t } = useTranslation('common')
  const items = getItems(t)
  
  const form = useForm<DisplayFormValues>({
    resolver: zodResolver(displayFormSchema(t)),
    defaultValues,
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => showSubmittedData(data))}
        className='space-y-8'
      >
        <FormField
          control={form.control}
          name='items'
          render={() => (
            <FormItem>
              <div className='mb-4'>
                <FormLabel className='text-base'>{t('settings.display.sidebar')}</FormLabel>
                <FormDescription>
                  {t('settings.display.sidebar_description')}
                </FormDescription>
              </div>
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name='items'
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className='flex flex-row items-start space-y-0 space-x-3'
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className='font-normal'>
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>{t('settings.display.update_display')}</Button>
      </form>
    </Form>
  )
}
