import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useTranslation } from 'react-i18next'

export function RecentSales() {
  const { t } = useTranslation('common')
  
  return (
    <div className='space-y-8'>
      <div className='flex items-center gap-4'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/01.png' alt='Avatar' />
          <AvatarFallback>{t('dashboard.recent_sales.people.olivia.initials')}</AvatarFallback>
        </Avatar>
        <div className='flex flex-1 flex-wrap items-center justify-between'>
          <div className='space-y-1'>
            <p className='text-sm leading-none font-medium'>{t('dashboard.recent_sales.people.olivia.name')}</p>
            <p className='text-muted-foreground text-sm'>
              {t('dashboard.recent_sales.people.olivia.email')}
            </p>
          </div>
          <div className='font-medium'>+$1,999.00</div>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <Avatar className='flex h-9 w-9 items-center justify-center space-y-0 border'>
          <AvatarImage src='/avatars/02.png' alt='Avatar' />
          <AvatarFallback>{t('dashboard.recent_sales.people.jackson.initials')}</AvatarFallback>
        </Avatar>
        <div className='flex flex-1 flex-wrap items-center justify-between'>
          <div className='space-y-1'>
            <p className='text-sm leading-none font-medium'>{t('dashboard.recent_sales.people.jackson.name')}</p>
            <p className='text-muted-foreground text-sm'>
              {t('dashboard.recent_sales.people.jackson.email')}
            </p>
          </div>
          <div className='font-medium'>+$39.00</div>
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/03.png' alt='Avatar' />
          <AvatarFallback>{t('dashboard.recent_sales.people.isabella.initials')}</AvatarFallback>
        </Avatar>
        <div className='flex flex-1 flex-wrap items-center justify-between'>
          <div className='space-y-1'>
            <p className='text-sm leading-none font-medium'>{t('dashboard.recent_sales.people.isabella.name')}</p>
            <p className='text-muted-foreground text-sm'>
              {t('dashboard.recent_sales.people.isabella.email')}
            </p>
          </div>
          <div className='font-medium'>+$299.00</div>
        </div>
      </div>

      <div className='flex items-center gap-4'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/04.png' alt='Avatar' />
          <AvatarFallback>{t('dashboard.recent_sales.people.william.initials')}</AvatarFallback>
        </Avatar>
        <div className='flex flex-1 flex-wrap items-center justify-between'>
          <div className='space-y-1'>
            <p className='text-sm leading-none font-medium'>{t('dashboard.recent_sales.people.william.name')}</p>
            <p className='text-muted-foreground text-sm'>{t('dashboard.recent_sales.people.william.email')}</p>
          </div>
          <div className='font-medium'>+$99.00</div>
        </div>
      </div>

      <div className='flex items-center gap-4'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/05.png' alt='Avatar' />
          <AvatarFallback>{t('dashboard.recent_sales.people.sophia.initials')}</AvatarFallback>
        </Avatar>
        <div className='flex flex-1 flex-wrap items-center justify-between'>
          <div className='space-y-1'>
            <p className='text-sm leading-none font-medium'>{t('dashboard.recent_sales.people.sophia.name')}</p>
            <p className='text-muted-foreground text-sm'>
              {t('dashboard.recent_sales.people.sophia.email')}
            </p>
          </div>
          <div className='font-medium'>+$39.00</div>
        </div>
      </div>
    </div>
  )
}
