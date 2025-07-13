import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'
import LongText from '@/components/long-text'
import { Group } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { TFunction } from 'i18next'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { IconUsers } from '@tabler/icons-react'

// Форматирование даты
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}

// Создаем колонки с функцией перевода и функциями для работы с группами в качестве параметров
export function createColumns(
  t: TFunction, 
  setOpen?: (type: 'add' | 'edit' | 'delete' | 'view' | 'students' | 'add_student' | null) => void,
  setCurrentRow?: React.Dispatch<React.SetStateAction<Group | null>>
): ColumnDef<Group>[] {
  
  return [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label={t('groups.select_all')}
        className='translate-y-[2px]'
      />
    ),
    meta: {
      className: cn(
        'sticky md:table-cell left-0 z-10 rounded-tl',
        'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted'
      ),
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label={t('groups.select_row')}
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t('groups.column.name')} />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-80'>{row.getValue('name')}</LongText>
    ),
    meta: {
      className: cn(
        'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none',
        'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
        'sticky left-6 md:table-cell'
      ),
    },
    enableHiding: false,
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t('groups.column.created_at')} />
    ),
    cell: ({ row }) => {
      const date = row.getValue('created_at') as Date
      return <div>{formatDate(date)}</div>
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'students_count',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t('groups.column.students_count')} />
    ),
    cell: ({ row }) => {
      const count = row.getValue('students_count') as number
      const group = row.original
      
      return (
        <div className="flex items-center justify-between">
          <Badge variant={count > 0 ? "default" : "outline"} className={count > 0 ? "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400" : ""}>
            {count}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (setCurrentRow && setOpen) {
                setCurrentRow(group)
                setOpen('students')
              }
            }}
            className="ml-2"
            title={t('groups.view.view_students')}
          >
            <IconUsers className="h-4 w-4" />
          </Button>
        </div>
      )
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
    meta: {
      className: 'text-right',
    },
    enableHiding: false,
  },
  ]
}
