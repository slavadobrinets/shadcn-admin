// src/features/users/index.tsx
import { Header } from '@/components/layout/header';
import { Main } from '@/components/layout/main';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { Search } from '@/components/search';
import { ThemeSwitch } from '@/components/theme-switch';
import { useTranslation } from 'react-i18next';
import { createColumns } from './components/users-columns';
import { UsersDialogs } from './components/users-dialogs';
import { UsersPrimaryButtons } from './components/users-primary-buttons';
import { UsersTable } from './components/users-table';
import { UsersTableSkeleton } from './components/users-table-skeleton';
import UsersProvider from './context/users-context';
// import { users } from './data/users'; // Удалите или закомментируйте эту строку
import { userListSchema } from './data/schema'; // Оставьте этот импорт для валидации
import { useSupabaseUsers } from './hooks/useSupabaseUsers'; // Добавьте этот импорт

export default function Users() {
  const { t } = useTranslation('common');
  const { data: usersData, isLoading, error } = useSupabaseUsers(); // Используем новый хук

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
              <h2 className='text-2xl font-bold tracking-tight'>{t('users.title')}</h2>
              <p className='text-muted-foreground'>
                {t('users.subtitle')}
              </p>
            </div>
            <div className='flex items-center space-x-2'>
              <div className='h-9 w-[120px]'></div>
            </div>
          </div>
          <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
            <UsersTableSkeleton />
          </div>
        </Main>
      </>
    );
  }

  // Если произошла ошибка при загрузке
  if (error) {
    return (
      <Main>
        <div>Ошибка загрузки пользователей: {error.message}</div>
      </Main>
    );
  }

  // Валидируем полученные данные с помощью схемы
  const userList = userListSchema.parse(usersData);
  const columns = createColumns(t);

  return (
    <UsersProvider>
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
            <h2 className='text-2xl font-bold tracking-tight'>{t('users.title')}</h2>
            <p className='text-muted-foreground'>
              {t('users.subtitle')}
            </p>
          </div>
          <UsersPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <UsersTable data={userList} columns={columns} />
        </div>
      </Main>

      <UsersDialogs />
    </UsersProvider>
  );
}
