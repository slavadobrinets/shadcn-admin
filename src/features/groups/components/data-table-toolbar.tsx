import { Table } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { IconFilter, IconFilterOff, IconSearch, IconTable, IconDownload, IconPlus, IconTrash } from '@tabler/icons-react'
import { useGroups } from '../context/groups-context'
import { Group } from '../data/schema'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const { t } = useTranslation('common')
  const { setOpen, setCurrentRow } = useGroups()
  const isFiltered = table.getState().columnFilters.length > 0
  const hasSelection = table.getFilteredSelectedRowModel().rows.length > 0

  return (
    <div className='flex flex-wrap items-center justify-between gap-2'>
      <div className='flex flex-1 items-center space-x-2'>
        <div className='relative flex-1 md:max-w-sm'>
          <IconSearch className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder={t('groups.filter_placeholder')}
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('name')?.setFilterValue(event.target.value)
            }
            className='w-full pl-8 md:max-w-sm'
          />
        </div>
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            <IconFilterOff className='mr-2 h-4 w-4' />
            {t('groups.reset_filters')}
          </Button>
        )}
        {hasSelection && (
          <Button
            variant='destructive'
            size='sm'
            className='h-8'
            onClick={() => {
              // Получаем выбранные строки
              const selectedRows = table.getFilteredSelectedRowModel().rows;
              // Если выбрана только одна строка, открываем диалог удаления для этой группы
              if (selectedRows.length === 1) {
                const group = selectedRows[0].original as Group;
                setCurrentRow(group);
                setOpen('delete');
              } else {
                // Здесь можно добавить логику для массового удаления
                // Например, открыть модальное окно с подтверждением
                alert(t('groups.delete_confirmation', { count: selectedRows.length }));
                // В реальном приложении здесь будет вызов API для массового удаления
              }
            }}
          >
            <IconTrash className='mr-2 h-4 w-4' />
            {t('groups.buttons.delete_selected')}
          </Button>
        )}
      </div>
      <div className='flex flex-wrap items-center gap-2'>
        <Button
          variant='outline'
          size='sm'
          className='h-8'
          onClick={() => {
            // Экспорт данных в CSV
            const headers = table.getAllColumns()
              .filter(column => column.id !== 'select' && column.id !== 'actions' && column.getIsVisible())
              .map(column => t(`groups.column.${column.id}`));
            
            const rows = table.getFilteredRowModel().rows.map(row => {
              return table.getAllColumns()
                .filter(column => column.id !== 'select' && column.id !== 'actions' && column.getIsVisible())
                .map(column => {
                  if (column.id === 'created_at') {
                    const date = row.getValue(column.id) as Date;
                    return new Intl.DateTimeFormat('ru-RU', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    }).format(date);
                  }
                  return row.getValue(column.id);
                });
            });
            
            const csvContent = [
              headers.join(','),
              ...rows.map(row => row.join(','))
            ].join('\n');
            
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.setAttribute('href', url);
            link.setAttribute('download', 'groups.csv');
            link.click();
          }}
        >
          <IconDownload className='mr-2 h-4 w-4' />
          {t('groups.buttons.export')}
        </Button>
        
        <Button
          variant='outline'
          size='sm'
          className='h-8'
          onClick={() => setOpen('add')}
        >
          <IconPlus className='mr-2 h-4 w-4' />
          {t('groups.buttons.add_group')}
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='outline'
              size='sm'
              className='ml-auto h-8 lg:flex'
            >
              <IconTable className='mr-2 h-4 w-4' />
              {t('groups.table.view')}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-[150px]'>
            {table
              .getAllColumns()
              .filter(
                (column) =>
                  typeof column.accessorFn !== 'undefined' && column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {t(`groups.column.${column.id}`)}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
