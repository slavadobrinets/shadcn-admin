import { useTranslation } from 'react-i18next'
import { ColumnDef } from '@tanstack/react-table'
import { Task } from '../data/schema'
import { columns as originalColumns } from './columns'
import { DataTableColumnHeader } from './data-table-column-header'

export function useTaskColumns(): ColumnDef<Task>[] {
  const { t } = useTranslation('common')
  
  // Создаем копию оригинальных колонок
  const translatedColumns = [...originalColumns]
  
  // Обновляем заголовки колонок
  translatedColumns.forEach((column) => {
    if (column.id === 'select') {
      // Для колонки с чекбоксами не меняем заголовок, так как там нет текста
    } else if ('accessorKey' in column) {
      if (column.accessorKey === 'id') {
        column.header = ({ column }) => (
          <DataTableColumnHeader column={column} title={t('tasks.column.task')} />
        )
      } else if (column.accessorKey === 'title') {
        column.header = ({ column }) => (
          <DataTableColumnHeader column={column} title={t('tasks.column.title')} />
        )
      } else if (column.accessorKey === 'status') {
        column.header = ({ column }) => (
          <DataTableColumnHeader column={column} title={t('tasks.column.status')} />
        )
      } else if (column.accessorKey === 'priority') {
        column.header = ({ column }) => (
          <DataTableColumnHeader column={column} title={t('tasks.column.priority')} />
        )
      }
    }
  })
  
  return translatedColumns
}
