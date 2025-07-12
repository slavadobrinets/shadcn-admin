import ContentSection from '../components/content-section'
import { DisplayForm } from './display-form'
import { useTranslation } from 'react-i18next'

export default function SettingsDisplay() {
  const { t } = useTranslation('common')
  
  return (
    <ContentSection
      title={t('settings.display.title')}
      desc={t('settings.display.description')}
    >
      <DisplayForm />
    </ContentSection>
  )
}
