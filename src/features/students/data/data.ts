import {
  IconSchool,
  IconUsers,
} from '@tabler/icons-react'
import { TFunction } from 'i18next'

// Создаем функцию, которая возвращает массив типов студентов с локализованными метками
export const getStudentTypes = (t: TFunction) => [  
  {
    label: t('students.role.student'),
    value: 'student',
    icon: IconUsers,
  },
  {
    label: t('students.role.graduate'),
    value: 'graduate',
    icon: IconSchool,
  },  
] as const

// Создаем функцию, которая возвращает массив статусов с локализованными метками
export const getStatuses = (t: TFunction) => [
  { label: t('students.status.active'), value: 'active' },
  { label: t('students.status.inactive'), value: 'inactive' },
  { label: t('students.status.invited'), value: 'invited' },
  { label: t('students.status.suspended'), value: 'suspended' },
] as const

// Для обратной совместимости оставляем старые переменные
export const studentTypes = [  
  {
    label: 'Студент',
    value: 'student',
    icon: IconUsers,
  },
  {
    label: 'Выпускник',
    value: 'graduate',
    icon: IconSchool,
  },  
] as const

export const statuses = [
  { label: 'Активен', value: 'active' },
  { label: 'Неактивен', value: 'inactive' },
  { label: 'Приглашен', value: 'invited' },
  { label: 'Приостановлен', value: 'suspended' },
] as const
