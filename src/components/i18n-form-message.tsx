import { useTranslation } from 'react-i18next'
import { FormMessage, useFormField } from '@/components/ui/form'

interface I18nFormMessageProps extends React.ComponentProps<typeof FormMessage> {}

export function I18nFormMessage(props: I18nFormMessageProps) {
  const { t } = useTranslation()
  const { error } = useFormField()
  
  // Если есть ошибка, переводим её сообщение
  if (error?.message) {
    return (
      <FormMessage
        {...props}
        children={t(error.message)}
      />
    )
  }
  
  // Если нет ошибки, но есть children, переводим их
  if (props.children) {
    return (
      <FormMessage
        {...props}
        children={t(props.children as string)}
      />
    )
  }
  
  // В остальных случаях просто передаем пропсы
  return <FormMessage {...props} />
}
