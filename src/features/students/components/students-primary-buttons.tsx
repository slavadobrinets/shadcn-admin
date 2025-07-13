import { IconPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useStudents } from '../context/students-context'
import { useTranslation } from 'react-i18next'

export function StudentsPrimaryButtons() {
  const { setOpen } = useStudents()
  const { t } = useTranslation('common')

  return (
    <div className='flex flex-wrap items-center gap-2'>
      <Button size='sm' className='h-8 gap-1' onClick={() => setOpen('add')}>
        <IconPlus size={16} />
        {t('students.buttons.add_student')}
      </Button>
    </div>
  )
}
