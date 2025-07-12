import { Outlet } from '@tanstack/react-router'
import {
  IconBrowserCheck,
  IconNotification,
  IconPalette,
  IconTool,
  IconUser,
} from '@tabler/icons-react'
import { Separator } from '@/components/ui/separator'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { useTranslation } from 'react-i18next'
import SidebarNav from './components/sidebar-nav'

export default function Settings() {
  const { t } = useTranslation('common')
  
  const sidebarNavItems = [
    {
      title: t('sidebar.items.profile'),
      icon: <IconUser size={18} />,
      href: '/settings',
    },
    {
      title: t('sidebar.items.account'),
      icon: <IconTool size={18} />,
      href: '/settings/account',
    },
    {
      title: t('sidebar.items.appearance'),
      icon: <IconPalette size={18} />,
      href: '/settings/appearance',
    },
    {
      title: t('sidebar.items.notifications'),
      icon: <IconNotification size={18} />,
      href: '/settings/notifications',
    },
    {
      title: t('sidebar.items.display'),
      icon: <IconBrowserCheck size={18} />,
      href: '/settings/display',
    },
  ]
  
  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main fixed>
        <div className='space-y-0.5'>
          <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
            {t('settings.title')}
          </h1>
          <p className='text-muted-foreground'>
            {t('settings.subtitle')}
          </p>
        </div>
        <Separator className='my-4 lg:my-6' />
        <div className='flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <aside className='top-0 lg:sticky lg:w-1/5'>
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className='flex w-full overflow-y-hidden p-1'>
            <Outlet />
          </div>
        </div>
      </Main>
    </>
  )
}
