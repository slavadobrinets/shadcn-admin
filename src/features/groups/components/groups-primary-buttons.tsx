import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { IconPlus } from '@tabler/icons-react'
import { useGroups } from '../context/groups-context'

export function GroupsPrimaryButtons() {
  const { t } = useTranslation('common')
  const { setOpen } = useGroups()

  return (
    <div className='flex items-center space-x-2'>
      <Button
        onClick={() => setOpen('add')}
        className='h-9'
      >
        <IconPlus className='mr-2 h-4 w-4' />
        {t('groups.buttons.add_group')}
      </Button>
    </div>
  )
}
