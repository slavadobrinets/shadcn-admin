import { Column } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTranslation } from 'react-i18next'
import { IconArrowsSort, IconSortAscending, IconSortDescending } from '@tabler/icons-react'

interface DataTableColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const { t } = useTranslation('common')
  if (!column.getCanSort()) {
    return <div className='text-xs font-medium'>{title}</div>
  }

  return (
    <div className={cn('flex items-center space-x-2')}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='sm'
            className='-ml-3 h-8 data-[state=open]:bg-accent'
          >
            <span className='text-xs font-medium'>{title}</span>
            {column.getIsSorted() === 'desc' ? (
              <IconSortDescending className='ml-2 h-4 w-4' />
            ) : column.getIsSorted() === 'asc' ? (
              <IconSortAscending className='ml-2 h-4 w-4' />
            ) : (
              <IconArrowsSort className='ml-2 h-4 w-4' />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <IconSortAscending className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
            {t('groups.table.sort.asc')}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <IconSortDescending className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
            {t('groups.table.sort.desc')}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <IconArrowsSort className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
            {t('groups.table.sort.hide')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
