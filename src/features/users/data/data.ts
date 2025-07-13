import {
  IconUsersGroup,
  IconUserShield,
} from '@tabler/icons-react'
import { TFunction } from 'i18next'

// Создаем функцию, которая возвращает массив типов пользователей с локализованными метками
export const getUserTypes = (t: TFunction) => [  
  {
    label: t('users.role.admin'),
    value: 'admin',
    icon: IconUserShield,
  },
  {
    label: t('users.role.teacher'),
    value: 'teacher',
    icon: IconUsersGroup,
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
    label: 'Админ',
    value: 'admin',
    icon: IconUserShield,
  },
  {
    label: 'Преподаватель',
    value: 'teacher',
    icon: IconUsersGroup,
  },  
] as const

export const statuses = [
  { label: 'Активен', value: 'active' },
  { label: 'Неактивен', value: 'inactive' },
  { label: 'Приглашен', value: 'invited' },
  { label: 'Приостановлен', value: 'suspended' },
] as const
