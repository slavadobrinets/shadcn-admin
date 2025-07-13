import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'
import LongText from '@/components/long-text'
import { getStudentTypes } from '../data/data'
import { Student } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { TFunction } from 'i18next'

// Создаем колонки с функцией перевода в качестве параметра
export function createColumns(t: TFunction): ColumnDef<Student>[] {
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
        aria-label={t('students.select_all')}
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
        aria-label={t('students.select_row')}
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'full_name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t('students.column.name')} />
    ),
    cell: ({ row }) => (
      <LongText className='max-w-80'>{row.getValue('full_name')}</LongText>
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
    accessorKey: 'group_id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t('students.column.group')} />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.original.group_name || row.getValue('group_id')}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={t('students.column.role')} />
    ),
    cell: ({ row }) => {
      const { role } = row.original
      const studentTypes = getStudentTypes(t)
      const studentType = studentTypes.find(({ value }) => value === role)

      if (!studentType) {
        return null
      }

      return (
        <div className='flex items-center gap-x-2'>
          {studentType.icon && (
            <studentType.icon size={16} className='text-muted-foreground' />
          )}
          <span className='text-sm capitalize'>{studentType.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
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
