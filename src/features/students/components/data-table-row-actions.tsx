import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useStudents } from '../context/students-context'
import { useTranslation } from 'react-i18next'
import { Student } from '../data/schema'

interface DataTableRowActionsProps {
  row: Row<Student>
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { setOpen, setCurrentRow } = useStudents()
  const { t } = useTranslation('common')

  const handleAction = (action: 'edit' | 'delete') => {
    setCurrentRow(row.original)
    setOpen(action)
  }

  return (
    <div className="flex justify-end mr-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
          aria-label={t('students.table.open_menu')}
        >
          <DotsHorizontalIcon className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        <DropdownMenuItem onClick={() => handleAction('edit')}>
          {t('students.table.edit')}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='text-destructive focus:text-destructive'
          onClick={() => handleAction('delete')}
        >
          {t('students.table.delete')}
        </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
