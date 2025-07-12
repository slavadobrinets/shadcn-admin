import ContentSection from '../components/content-section'
import ProfileForm from './profile-form'
import { useTranslation } from 'react-i18next'

export default function SettingsProfile() {
  const { t } = useTranslation('common')
  
  return (
    <ContentSection
      title={t('settings.profile.title')}
      desc={t('settings.profile.description')}
    >
      <ProfileForm />
    </ContentSection>
  )
}
