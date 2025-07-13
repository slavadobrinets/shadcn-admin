import {
  IconBarrierBlock,
  IconBrowserCheck,
  IconBug,
  IconChecklist,
  IconError404,
  IconHelp,
  IconLayoutDashboard,
  IconLock,
  IconLockAccess,
  IconMessages,
  IconNotification,
  IconPackages,
  IconPalette,
  IconSchool,
  IconServerOff,
  IconSettings,
  IconTool,
  IconUserCog,
  IconUserOff,
  IconUsers,
} from '@tabler/icons-react'
import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react'
import { ClerkLogo } from '@/assets/clerk-logo'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Shadcn Admin',
      logo: Command,
      plan: 'Vite + ShadcnUI',
      // TODO: Translate this plan name if it's user-facing and not a technical description
      // plan: 'Вайт + ШадснЮИ',
    },
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Корпоративный',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Стартап',
    },
  ],
  navGroups: [
    {
      title: 'sidebar.groups.main',
      items: [
        {
          title: 'sidebar.items.dashboard',
          url: '/',
          icon: IconLayoutDashboard,
        },        
        {
          title: 'sidebar.items.students',
          url: '/students',
          icon: IconSchool,
        },
        {
          title: 'sidebar.items.groups',
          url: '/groups',
          icon: IconSchool,
        },
        {
          title: 'sidebar.items.users',
          url: '/users',
          icon: IconUsers,
        },
        {
          title: 'sidebar.items.tasks',
          url: '/tasks',
          icon: IconChecklist,
        },
        {
          title: 'sidebar.items.apps',
          url: '/apps',
          icon: IconPackages,
        },
        {
          title: 'sidebar.items.chats',
          url: '/chats',
          badge: '3',
          icon: IconMessages,
        },
        {
          title: 'sidebar.items.clerk_protected',
          icon: ClerkLogo,
          items: [
            {
              title: 'sidebar.items.sign_in',
              url: '/clerk/sign-in',
            },
            {
              title: 'sidebar.items.sign_up',
              url: '/clerk/sign-up',
            },
            {
              title: 'sidebar.items.user_management',
              url: '/clerk/user-management',
            },
          ],
        },
      ],
    },
    {
      title: 'sidebar.groups.pages',
      items: [
        {
          title: 'sidebar.items.authentication',
          icon: IconLockAccess,
          items: [
            {
              title: 'sidebar.items.sign_in',
              url: '/sign-in',
            },
            {
              title: 'sidebar.items.sign_in_2_columns',
              url: '/sign-in-2',
            },
            {
              title: 'sidebar.items.sign_up',
              url: '/sign-up',
            },
            {
              title: 'sidebar.items.forgot_password',
              url: '/forgot-password',
            },
            {
              title: 'sidebar.items.otp',
              url: '/otp',
            },
          ],
        },
        {
          title: 'sidebar.items.errors',
          icon: IconBug,
          items: [
            {
              title: 'sidebar.items.unauthorized',
              url: '/401',
              icon: IconLock,
            },
            {
              title: 'sidebar.items.forbidden',
              url: '/403',
              icon: IconUserOff,
            },
            {
              title: 'sidebar.items.not_found',
              url: '/404',
              icon: IconError404,
            },
            {
              title: 'sidebar.items.server_error',
              url: '/500',
              icon: IconServerOff,
            },
            {
              title: 'sidebar.items.maintenance_error',
              url: '/503',
              icon: IconBarrierBlock,
            },
          ],
        },
      ],
    },
    {
      title: 'sidebar.groups.other',
      items: [
        {
          title: 'sidebar.items.settings',
          icon: IconSettings,
          items: [
            {
              title: 'sidebar.items.profile',
              url: '/settings',
              icon: IconUserCog,
            },
            {
              title: 'sidebar.items.account',
              url: '/settings/account',
              icon: IconTool,
            },
            {
              title: 'sidebar.items.appearance',
              url: '/settings/appearance',
              icon: IconPalette,
            },
            {
              title: 'sidebar.items.notifications',
              url: '/settings/notifications',
              icon: IconNotification,
            },
            {
              title: 'sidebar.items.display',
              url: '/settings/display',
              icon: IconBrowserCheck,
            },
          ],
        },
        {
          title: 'sidebar.items.help_center',
          url: '/help-center',
          icon: IconHelp,
        },
      ],
    },
  ],
}
