import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { IconSearch, IconPlus, IconUserCheck, IconUserX, IconSortAscending, IconSortDescending } from '@tabler/icons-react'
import { Group } from '../data/schema'
import { Skeleton } from '@/components/ui/skeleton'
import { useGroupStudents } from '../hooks/useGroupStudents'
import { useGroups } from '../context/groups-context'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Props {
  currentRow: Group
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function GroupsStudentsDialog({ currentRow, open, onOpenChange }: Props) {
  const { t } = useTranslation('common')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortField, setSortField] = useState<'full_name' | 'role'>('full_name')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const { setOpen, setCurrentRow: setContextCurrentRow } = useGroups()
  
  // Используем хук для получения студентов группы
  const { data: students, isLoading: loading } = useGroupStudents(currentRow.id)

  // Функция для сортировки и фильтрации студентов
  const filteredAndSortedStudents = useMemo(() => {
    // Сначала фильтруем
    const filtered = students ? students.filter(student => 
      student.full_name.toLowerCase().includes(searchQuery.toLowerCase())
    ) : [];
    
    // Затем сортируем
    return [...filtered].sort((a, b) => {
      const valueA = a[sortField];
      const valueB = b[sortField];
      
      if (sortDirection === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
  }, [students, searchQuery, sortField, sortDirection]);
  
  // Функция для переключения сортировки
  const toggleSort = (field: 'full_name' | 'role') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className='sm:max-w-4xl'>
        <DialogHeader className='text-left'>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle>{t('groups.students.title', { groupName: currentRow.name })}</DialogTitle>
              <DialogDescription>
                {t('groups.students.description')}
              </DialogDescription>
            </div>
              <Badge variant="outline" className="text-lg px-3 py-1">
                {loading ? (
                  <Skeleton className="h-6 w-8" />
                ) : (
                  filteredAndSortedStudents.length
                )}
              </Badge>
          </div>
        </DialogHeader>
        
        <div className='flex justify-between items-center mb-4'>
          <div className='relative flex-1 md:max-w-sm'>
            <IconSearch className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              placeholder={t('groups.students.search_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full pl-8 md:max-w-sm'
            />
          </div>
          <Button
            variant='outline'
            onClick={() => {
              setContextCurrentRow(currentRow)
              setOpen('add_student')
            }}
            className='ml-2'
          >
            <IconPlus className='mr-2 h-4 w-4' />
            {t('groups.add_student.button')}
          </Button>
        </div>
        
        <ScrollArea className='rounded-md border h-[400px]'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="sticky top-0 bg-background z-10 cursor-pointer"
                  onClick={() => toggleSort('full_name')}
                >
                  <div className="flex items-center">
                    {t('students.column.name')}
                    {sortField === 'full_name' && (
                      sortDirection === 'asc' 
                        ? <IconSortAscending className="ml-1 h-4 w-4" /> 
                        : <IconSortDescending className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="sticky top-0 bg-background z-10 cursor-pointer"
                  onClick={() => toggleSort('role')}
                >
                  <div className="flex items-center">
                    {t('students.column.role')}
                    {sortField === 'role' && (
                      sortDirection === 'asc' 
                        ? <IconSortAscending className="ml-1 h-4 w-4" /> 
                        : <IconSortDescending className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead className="sticky top-0 bg-background z-10 text-right">{t('students.column.status')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                // Скелетон для загрузки
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell><Skeleton className='h-4 w-24' /></TableCell>
                    <TableCell><Skeleton className='h-4 w-40' /></TableCell>
                    <TableCell><Skeleton className='h-4 w-32' /></TableCell>
                  </TableRow>
                ))
              ) : filteredAndSortedStudents.length > 0 ? (
                // Отображение студентов
                filteredAndSortedStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.full_name}</TableCell>
                    <TableCell>{t(`students.role.${student.role}`)}</TableCell>
                    <TableCell className="text-right">
                      {student.role === 'student' ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          <IconUserCheck className="mr-1 h-3 w-3" />
                          {t('students.status.active')}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400">
                          <IconUserX className="mr-1 h-3 w-3" />
                          {t('students.status.graduate')}
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                // Нет результатов
                <TableRow>
                  <TableCell colSpan={2} className='h-24 text-center'>
                    {t('groups.students.no_results')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
        
        <DialogFooter>
          <Button
            variant='outline'
            onClick={() => onOpenChange(false)}
          >
            {t('groups.students.close')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
