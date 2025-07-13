import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Group } from '../data/schema'
import { formatDate } from './groups-columns'
import { Badge } from '@/components/ui/badge'
import { IconUsers } from '@tabler/icons-react'

interface Props {
  currentRow: Group
  open: boolean
  onOpenChange: (open: boolean) => void
  onViewStudents: () => void
}

export function GroupsViewDialog({ currentRow, open, onOpenChange, onViewStudents }: Props) {
  const { t } = useTranslation('common')

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-left'>
          <DialogTitle>{t('groups.view.title')}</DialogTitle>
          <DialogDescription>
            {t('groups.view.description')}
          </DialogDescription>
        </DialogHeader>
        <div className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <h3 className='text-sm font-medium text-muted-foreground'>{t('groups.column.name')}</h3>
              <p className='text-base'>{currentRow.name}</p>
            </div>
            <div>
              <h3 className='text-sm font-medium text-muted-foreground'>{t('groups.column.created_at')}</h3>
              <p className='text-base'>{formatDate(currentRow.created_at)}</p>
            </div>
          </div>
          <div>
            <h3 className='text-sm font-medium text-muted-foreground'>{t('groups.column.students_count')}</h3>
            <div className='flex items-center gap-2 mt-1'>
              <Badge 
                variant={currentRow.students_count > 0 ? "default" : "outline"} 
                className={currentRow.students_count > 0 ? "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 text-base px-3 py-1" : "text-base px-3 py-1"}
              >
                <IconUsers className="mr-1 h-4 w-4" />
                {currentRow.students_count} {t('groups.view.students')}
              </Badge>
            </div>
          </div>
        </div>
        <DialogFooter className='flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2'>
          <Button
            variant='outline'
            onClick={() => onOpenChange(false)}
          >
            {t('groups.view.close')}
          </Button>
          <Button
            onClick={() => {
              onViewStudents()
              onOpenChange(false)
            }}
          >
            {t('groups.view.view_students')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
