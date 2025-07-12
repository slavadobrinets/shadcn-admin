import { useTranslation } from 'react-i18next'
import {
  IconCash,
  IconShield,
  IconUsersGroup,
  IconUserShield,
} from '@tabler/icons-react'
import { UserStatus } from './schema'

export function useUsersData() {
  const { t } = useTranslation('common')
  
  const callTypes = new Map<UserStatus, string>([
    ['active', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
    ['inactive', 'bg-neutral-300/40 border-neutral-300'],
    ['invited', 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300'],
    [
      'suspended',
      'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10',
    ],
  ])

  const userTypes = [
    {
      label: t('users.role.superadmin'),
      value: 'superadmin',
      icon: IconShield,
    },
    {
      label: t('users.role.admin'),
      value: 'admin',
      icon: IconUserShield,
    },
    {
      label: t('users.role.manager'),
      value: 'manager',
      icon: IconUsersGroup,
    },
    {
      label: t('users.role.cashier'),
      value: 'cashier',
      icon: IconCash,
    },
  ] as const

  const statuses = [
    { label: t('users.status.active'), value: 'active' },
    { label: t('users.status.inactive'), value: 'inactive' },
    { label: t('users.status.invited'), value: 'invited' },
    { label: t('users.status.suspended'), value: 'suspended' },
  ] as const
  
  return { callTypes, userTypes, statuses }
}
