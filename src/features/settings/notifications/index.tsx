import ContentSection from '../components/content-section'
import { NotificationsForm } from './notifications-form'
import { useTranslation } from 'react-i18next'

export default function SettingsNotifications() {
  const { t } = useTranslation('common')
  
  return (
    <ContentSection
      title={t('settings.notifications.title')}
      desc={t('settings.notifications.description')}
    >
      <NotificationsForm />
    </ContentSection>
  )
}
