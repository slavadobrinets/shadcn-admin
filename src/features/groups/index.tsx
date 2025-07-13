// src/features/groups/index.tsx
import { Header } from '@/components/layout/header';
import { Main } from '@/components/layout/main';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { Search } from '@/components/search';
import { ThemeSwitch } from '@/components/theme-switch';
import { useTranslation } from 'react-i18next';
import { createColumns } from './components/groups-columns';
import { GroupsDialogs } from './components/groups-dialogs';
import { GroupsPrimaryButtons } from './components/groups-primary-buttons';
import { GroupsTable } from './components/groups-table';
import { GroupsTableSkeleton } from './components/groups-table-skeleton';
import GroupsProvider, { useGroups } from './context/groups-context';
import { Group, groupListSchema } from './data/schema';
import { useSupabaseGroups } from './hooks/useSupabaseGroups';
import { TFunction } from 'i18next';

// Компонент для создания колонок с использованием контекста GroupsContext
function GroupsTableWithColumns({ data, t }: { data: Group[], t: TFunction }) {
  const { setOpen, setCurrentRow } = useGroups();
  const columns = createColumns(t, setOpen, setCurrentRow);
  
  return <GroupsTable data={data} columns={columns} />;
}

export default function Groups() {
  const { t } = useTranslation('common');
  const { data: groupsData, isLoading, error } = useSupabaseGroups();

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
              <h2 className='text-2xl font-bold tracking-tight'>{t('groups.title')}</h2>
              <p className='text-muted-foreground'>
                {t('groups.subtitle')}
              </p>
            </div>
            <div className='flex items-center space-x-2'>
              <div className='h-9 w-[180px] bg-muted/30 rounded-md animate-pulse'></div>
            </div>
          </div>
          <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
            <GroupsTableSkeleton />
          </div>
        </Main>
      </>
    );
  }

  // Если произошла ошибка при загрузке
  if (error) {
    return (
      <Main>
        <div>{t('groups.loading_error')}: {error.message}</div>
      </Main>
    );
  }

  // Валидируем полученные данные с помощью схемы
  const groupList = groupListSchema.parse(groupsData);

  return (
    <GroupsProvider>
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
            <h2 className='text-2xl font-bold tracking-tight'>{t('groups.title')} ({groupList.length} {t('groups.groups_count')})</h2>
            <p className='text-muted-foreground'>
              {t('groups.subtitle')}
            </p>
          </div>
          <GroupsPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <GroupsTableWithColumns data={groupList} t={t} />
        </div>
      </Main>

      <GroupsDialogs />
    </GroupsProvider>
  );
}
