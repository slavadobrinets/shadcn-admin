import {
  IconCash,
  IconShield,
  IconUsersGroup,
  IconUserShield,
} from '@tabler/icons-react'
import { UserStatus } from './schema'
import { TFunction } from 'i18next'

export const callTypes = new Map<UserStatus, string>([
  ['active', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  ['inactive', 'bg-neutral-300/40 border-neutral-300'],
  ['invited', 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300'],
  [
    'suspended',
    'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10',
  ],
])

// Создаем функцию, которая возвращает массив типов пользователей с локализованными метками
export const getUserTypes = (t: TFunction) => [
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

// Создаем функцию, которая возвращает массив статусов с локализованными метками
export const getStatuses = (t: TFunction) => [
  { label: t('users.status.active'), value: 'active' },
  { label: t('users.status.inactive'), value: 'inactive' },
  { label: t('users.status.invited'), value: 'invited' },
  { label: t('users.status.suspended'), value: 'suspended' },
] as const

// Для обратной совместимости оставляем старые переменные
export const userTypes = [
  {
    label: 'Суперадмин',
    value: 'superadmin',
    icon: IconShield,
  },
  {
    label: 'Админ',
    value: 'admin',
    icon: IconUserShield,
  },
  {
    label: 'Менеджер',
    value: 'manager',
    icon: IconUsersGroup,
  },
  {
    label: 'Кассир',
    value: 'cashier',
    icon: IconCash,
  },
] as const

export const statuses = [
  { label: 'Активен', value: 'active' },
  { label: 'Неактивен', value: 'inactive' },
  { label: 'Приглашен', value: 'invited' },
  { label: 'Приостановлен', value: 'suspended' },
] as const
