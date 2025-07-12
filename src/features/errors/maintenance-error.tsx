import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'

export default function MaintenanceError() {
  const { t } = useTranslation('common')
  
  return (
    <div className='h-svh'>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        <h1 className='text-[7rem] leading-tight font-bold'>{t('errors.503.title')}</h1>
        <span className='font-medium'>{t('errors.503.heading')}</span>
        <p className='text-muted-foreground text-center'>
          {t('errors.503.description')}
        </p>
        <div className='mt-6 flex gap-4'>
          <Button variant='outline'>{t('errors.learn_more')}</Button>
        </div>
      </div>
    </div>
  )
}
