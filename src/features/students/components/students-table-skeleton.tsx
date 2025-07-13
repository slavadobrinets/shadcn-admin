import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useTranslation } from 'react-i18next'

export function StudentsTableSkeleton() {
  const { t } = useTranslation('common')
  
  // Создаем массив из 10 элементов для имитации строк таблицы
  const skeletonRows = Array.from({ length: 10 }, (_, i) => i)

  return (
    <div className='space-y-4'>
      {/* Имитация панели инструментов */}
      <div className='flex items-center justify-between'>
        <div className='flex flex-1 items-center space-x-2'>
          <Skeleton className='h-8 w-[150px]' />
          <Skeleton className='h-8 w-[100px]' />
        </div>
        <Skeleton className='h-8 w-[120px]' />
      </div>
      
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow className='group/row'>
              {/* Чекбокс */}
              <TableHead className='sticky md:table-cell left-0 z-10 rounded-tl bg-background'>
                <Skeleton className='h-4 w-4' />
              </TableHead>
              
              {/* Имя */}
              <TableHead className='sticky left-6 md:table-cell bg-background'>
                <Skeleton className='h-4 w-[100px]' />
              </TableHead>
              
              {/* Группа */}
              <TableHead>
                <Skeleton className='h-4 w-[80px]' />
              </TableHead>
              
              {/* Роль */}
              <TableHead>
                <Skeleton className='h-4 w-[60px]' />
              </TableHead>
              
              {/* Действия */}
              <TableHead className='text-right'>
                <Skeleton className='h-4 w-[40px] ml-auto' />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skeletonRows.map((index) => (
              <TableRow key={index} className='group/row'>
                {/* Чекбокс */}
                <TableCell className='sticky md:table-cell left-0 z-10 bg-background'>
                  <Skeleton className='h-4 w-4' />
                </TableCell>
                
                {/* Имя */}
                <TableCell className='sticky left-6 md:table-cell bg-background'>
                  <Skeleton className='h-4 w-[180px]' />
                </TableCell>
                
                {/* Группа */}
                <TableCell>
                  <Skeleton className='h-4 w-[100px]' />
                </TableCell>
                
                {/* Роль */}
                <TableCell>
                  <div className='flex items-center gap-x-2'>
                    <Skeleton className='h-4 w-4' />
                    <Skeleton className='h-4 w-[80px]' />
                  </div>
                </TableCell>
                
                {/* Действия */}
                <TableCell className='text-right'>
                  <div className='flex justify-end'>
                    <Skeleton className='h-8 w-8 rounded-full' />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Имитация пагинации */}
      <div className='flex items-center justify-between'>
        <div className='text-muted-foreground flex-1 text-sm'>
          {t('students.table.rows_selected', { count: 0, total: 1000 })}
        </div>
        <div className='flex items-center space-x-6 lg:space-x-8'>
          <div className='flex items-center space-x-2'>
            <p className='text-sm font-medium'>{t('students.table.rows_per_page')}</p>
            <Skeleton className='h-8 w-[70px]' />
          </div>
          <div className='flex w-[120px] items-center justify-center text-sm font-medium'>
            <Skeleton className='h-4 w-[100px]' />
          </div>
          <div className='flex items-center space-x-2'>
            <Skeleton className='h-8 w-8 rounded' />
            <Skeleton className='h-8 w-8 rounded' />
            <Skeleton className='h-8 w-8 rounded' />
            <Skeleton className='h-8 w-8 rounded' />
          </div>
        </div>
      </div>
    </div>
  )
}
