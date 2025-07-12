import ContentSection from '../components/content-section'
import { AccountForm } from './account-form'
import { useTranslation } from 'react-i18next'

export default function SettingsAccount() {
  const { t } = useTranslation('common')
  
  return (
    <ContentSection
      title={t('settings.account.title')}
      desc={t('settings.account.description')}
    >
      <AccountForm />
    </ContentSection>
  )
}
