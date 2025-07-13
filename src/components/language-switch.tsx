import { useLanguage } from '@/context/language-context'
import { Button } from '@/components/ui/button'
import { languages } from '@/config/languages'

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    // Переключаем между русским и английским языками
    const newLanguage = language === 'ru' ? 'en' : 'ru'
    setLanguage(newLanguage)
  }

  // Находим название текущего языка для отображения
  const currentLanguageName = languages.find(([code]) => code === language)?.[1] || ''

  return (
    <Button
      variant='ghost'
      size='sm'
      className='w-full justify-start'
      onClick={toggleLanguage}
    >
      <span className="mr-2">{language === 'ru' ? '🇷🇺' : '🇬🇧'}</span>
      <span>{currentLanguageName}</span>
    </Button>
  )
}
