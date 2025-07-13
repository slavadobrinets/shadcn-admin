// src/features/students/index.tsx
import { Header } from '@/components/layout/header';
import { Main } from '@/components/layout/main';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { Search } from '@/components/search';
import { ThemeSwitch } from '@/components/theme-switch';
import { useTranslation } from 'react-i18next';
import { createColumns } from './components/students-columns';
import { StudentsDialogs } from './components/students-dialogs';
import { StudentsPrimaryButtons } from './components/students-primary-buttons';
import { StudentsTable } from './components/students-table';
import { StudentsTableSkeleton } from './components/students-table-skeleton';
import StudentsProvider from './context/students-context';
import { studentListSchema } from './data/schema';
import { useSupabaseStudents } from './hooks/useSupabaseStudents';

export default function Students() {
  const { t } = useTranslation('common');
  const { data: studentsData, isLoading, error } = useSupabaseStudents();

  // Если данные еще загружаются
  if (isLoading) {
    return (
      <>
        <Header fixed>
          <Search />
          <div className='ml-auto flex items-center space-x-4'>
            <ThemeSwitch />
            <ProfileDropdown />
          </div>
        </Header>

        <Main>
          <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
            <div>
              <h2 className='text-2xl font-bold tracking-tight'>{t('students.title')}</h2>
              <p className='text-muted-foreground'>
                {t('students.subtitle')}
              </p>
            </div>
            <div className='flex items-center space-x-2'>
              <div className='h-9 w-[120px]'></div>
            </div>
          </div>
          <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
            <StudentsTableSkeleton />
          </div>
        </Main>
      </>
    );
  }

  // Если произошла ошибка при загрузке
  if (error) {
    return (
      <Main>
        <div>Ошибка загрузки студентов: {error.message}</div>
      </Main>
    );
  }

  // Валидируем полученные данные с помощью схемы
  const studentList = studentListSchema.parse(studentsData);
  
  const columns = createColumns(t);

  return (
    <StudentsProvider>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>{t('students.title')} ({studentList.length} студентов)</h2>
            <p className='text-muted-foreground'>
              {t('students.subtitle')}
            </p>
          </div>
          <StudentsPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <StudentsTable data={studentList} columns={columns} />
        </div>
      </Main>

      <StudentsDialogs />
    </StudentsProvider>
  );
}
