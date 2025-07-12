import { ColumnDef } from '@tanstack/react-table'
import { DataTable as OriginalDataTable } from './data-table'
import { useTaskColumns } from './tasks-i18n-wrapper'
import { Task } from '../data/schema'

interface I18nDataTableProps {
  data: Task[]
  columns: ColumnDef<Task>[]
}

export function I18nDataTable({ data }: I18nDataTableProps) {
  const translatedColumns = useTaskColumns()
  
  return (
    <OriginalDataTable
      columns={translatedColumns}
      data={data}
    />
  )
}
