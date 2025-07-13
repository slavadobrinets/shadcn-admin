import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function GroupsTableSkeleton() {
  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-1 items-center space-x-2'>
          <Skeleton className='h-9 w-full md:max-w-sm' />
        </div>
        <div className='flex flex-wrap items-center gap-2'>
          <Skeleton className='h-8 w-24' />
        </div>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-12'>
                <Skeleton className='h-4 w-4' />
              </TableHead>
              <TableHead>
                <Skeleton className='h-4 w-24' />
              </TableHead>
              <TableHead className='w-12'>
                <Skeleton className='h-4 w-4' />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 10 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className='h-4 w-4' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-full max-w-[200px]' />
                </TableCell>
                <TableCell>
                  <div className='flex justify-end'>
                    <Skeleton className='h-8 w-8' />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className='flex flex-col items-center justify-between gap-4 px-2 sm:flex-row'>
        <Skeleton className='h-4 w-40' />
        <div className='flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8'>
          <div className='flex items-center space-x-2'>
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-8 w-16' />
          </div>
          <Skeleton className='h-4 w-24' />
          <div className='flex items-center space-x-2'>
            <Skeleton className='h-8 w-8' />
            <Skeleton className='h-8 w-8' />
            <Skeleton className='h-8 w-8' />
            <Skeleton className='h-8 w-8' />
          </div>
        </div>
      </div>
    </div>
  )
}
