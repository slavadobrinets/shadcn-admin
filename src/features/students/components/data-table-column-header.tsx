import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
} from '@radix-ui/react-icons'
import { Column } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  // Функция для циклического переключения состояния сортировки
  const cycleSorting = () => {
    // Если не отсортировано, сортируем по возрастанию
    // Если отсортировано по возрастанию, сортируем по убыванию
    // Если отсортировано по убыванию, сбрасываем сортировку
    if (column.getIsSorted() === false) {
      column.toggleSorting(false) // asc
    } else if (column.getIsSorted() === 'asc') {
      column.toggleSorting(true) // desc
    } else {
      column.clearSorting()
    }
  }

  return (
    <div className={cn('flex items-center justify-between', className)}>
      <Button
        variant='ghost'
        size='sm'
        className='-ml-3 h-8 cursor-pointer'
        onClick={cycleSorting}
      >
        <span>{title}</span>
        {column.getIsSorted() === 'desc' ? (
          <ArrowDownIcon className='ml-2 h-4 w-4' />
        ) : column.getIsSorted() === 'asc' ? (
          <ArrowUpIcon className='ml-2 h-4 w-4' />
        ) : (
          <CaretSortIcon className='ml-2 h-4 w-4' />
        )}
      </Button>
    </div>
  )
}
