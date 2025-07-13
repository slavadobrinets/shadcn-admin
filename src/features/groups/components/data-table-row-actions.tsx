import { Row } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { IconDotsVertical, IconEdit, IconTrash, IconEye } from '@tabler/icons-react'
import { useGroups } from '../context/groups-context'
import { Group } from '../data/schema'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const { t } = useTranslation('common')
  const { setOpen, setCurrentRow } = useGroups()
  const group = row.original as Group

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <IconDotsVertical className='h-4 w-4' />
          <span className='sr-only'>{t('groups.table.open_menu')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(group)
            setOpen('edit')
          }}
        >
          <IconEdit className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
          {t('groups.table.edit')}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(group)
            setOpen('view')
          }}
        >
          <IconEye className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
          {t('groups.table.view_details')}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow(group)
            setOpen('delete')
          }}
        >
          <IconTrash className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
          {t('groups.table.delete')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
