import { useNavigate, useRouter } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface GeneralErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  minimal?: boolean
}

export default function GeneralError({
  className,
  minimal = false,
}: GeneralErrorProps) {
  const navigate = useNavigate()
  const { history } = useRouter()
  const { t } = useTranslation('common')
  
  return (
    <div className={cn('h-svh w-full', className)}>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        {!minimal && (
          <h1 className='text-[7rem] leading-tight font-bold'>{t('errors.500.title')}</h1>
        )}
        <span className='font-medium'>{t('errors.500.heading')} {`:')`}</span>
        <p className='text-muted-foreground text-center'>
          {t('errors.500.description')}
        </p>
        {!minimal && (
          <div className='mt-6 flex gap-4'>
            <Button variant='outline' onClick={() => history.go(-1)}>
              {t('errors.back')}
            </Button>
            <Button onClick={() => navigate({ to: '/' })}>{t('errors.home')}</Button>
          </div>
        )}
      </div>
    </div>
  )
}
