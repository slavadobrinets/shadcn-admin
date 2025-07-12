import { useNavigate, useRouter } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'

export default function UnauthorisedError() {
  const navigate = useNavigate()
  const { history } = useRouter()
  const { t } = useTranslation('common')
  
  return (
    <div className='h-svh'>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        <h1 className='text-[7rem] leading-tight font-bold'>{t('errors.401.title')}</h1>
        <span className='font-medium'>{t('errors.401.heading')}</span>
        <p className='text-muted-foreground text-center'>
          {t('errors.401.description')}
        </p>
        <div className='mt-6 flex gap-4'>
          <Button variant='outline' onClick={() => history.go(-1)}>
            {t('errors.back')}
          </Button>
          <Button onClick={() => navigate({ to: '/' })}>{t('errors.home')}</Button>
        </div>
      </div>
    </div>
  )
}
