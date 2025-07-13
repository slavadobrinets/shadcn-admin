import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getStudentTypes } from '../data/data'
import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { DataTableViewOptions } from './data-table-view-options'
import { useTranslation } from 'react-i18next'
import { Student } from '../data/schema'
import { useSupabaseGroups } from '../../groups/hooks/useSupabaseGroups'

interface DataTableToolbarProps {
  table: Table<Student>
}

export function DataTableToolbar({
  table,
}: DataTableToolbarProps) {
  const { t } = useTranslation('common')
  const isFiltered = table.getState().columnFilters.length > 0
  const { data: groupsData } = useSupabaseGroups()

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder={t('students.filter_placeholder')}
          value={
            (table.getColumn('full_name')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('full_name')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
        <div className='flex gap-x-2'>
          {table.getColumn('role') && (
            <DataTableFacetedFilter
              column={table.getColumn('role')}
              title={t('students.column.role')}
              options={getStudentTypes(t).map((type) => ({ ...type }))}
            />
          )}
          {table.getColumn('group_id') && (
            <DataTableFacetedFilter
              column={table.getColumn('group_id')}
              title={t('students.column.group')}
              options={
                groupsData 
                  ? groupsData.map(group => ({
                      label: group.name,
                      value: group.id,
                    }))
                  : Array.from(table.getColumn('group_id')?.getFacetedUniqueValues() || [])
                      .map(([value]) => {
                        // Создаем объект с уникальными названиями групп для каждого ID
                        const groupNames = new Map();
                        
                        // Проходим по всем строкам и собираем названия групп
                        table.getRowModel().rows.forEach(row => {
                          if (row.getValue('group_id') === value && row.original.group_name) {
                            groupNames.set(value, row.original.group_name);
                          }
                        });
                        
                        // Используем название группы, если оно найдено, иначе используем ID
                        const groupName = groupNames.get(value) || value;
                        
                        return {
                          label: groupName as string,
                          value: value as string,
                        };
                      })
              }
            />
          )}
        </div>
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            {t('students.reset_filters') || 'Сбросить фильтры'}
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
