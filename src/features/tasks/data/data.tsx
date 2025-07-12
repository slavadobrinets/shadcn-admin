import {
  IconArrowDown,
  IconArrowRight,
  IconArrowUp,
  IconCircle,
  IconCircleCheck,
  IconCircleX,
  IconExclamationCircle,
  IconStopwatch,
} from '@tabler/icons-react'
import { useTranslation } from 'react-i18next'

// Базовые данные без локализации для обратной совместимости
export const labels = [
  {
    value: 'bug',
    label: 'Ошибка',
  },
  {
    value: 'feature',
    label: 'Функция',
  },
  {
    value: 'documentation',
    label: 'Документация',
  },
]

export const statuses = [
  {
    value: 'backlog',
    label: 'Бэклог',
    icon: IconExclamationCircle,
  },
  {
    value: 'todo',
    label: 'К выполнению',
    icon: IconCircle,
  },
  {
    value: 'in progress',
    label: 'В процессе',
    icon: IconStopwatch,
  },
  {
    value: 'done',
    label: 'Выполнено',
    icon: IconCircleCheck,
  },
  {
    value: 'canceled',
    label: 'Отменено',
    icon: IconCircleX,
  },
]

export const priorities = [
  {
    label: 'Низкий',
    value: 'low',
    icon: IconArrowDown,
  },
  {
    label: 'Средний',
    value: 'medium',
    icon: IconArrowRight,
  },
  {
    label: 'Высокий',
    value: 'high',
    icon: IconArrowUp,
  },
]

// Функции для получения локализованных данных
export const getLabels = () => {
  const { t } = useTranslation('common')
  return [
    {
      value: 'bug',
      label: t('tasks.label.bug'),
    },
    {
      value: 'feature',
      label: t('tasks.label.feature'),
    },
    {
      value: 'documentation',
      label: t('tasks.label.documentation'),
    },
  ]
}

export const getStatuses = () => {
  const { t } = useTranslation('common')
  return [
    {
      value: 'backlog',
      label: t('tasks.status.backlog'),
      icon: IconExclamationCircle,
    },
    {
      value: 'todo',
      label: t('tasks.status.todo'),
      icon: IconCircle,
    },
    {
      value: 'in progress',
      label: t('tasks.status.in_progress'),
      icon: IconStopwatch,
    },
    {
      value: 'done',
      label: t('tasks.status.done'),
      icon: IconCircleCheck,
    },
    {
      value: 'canceled',
      label: t('tasks.status.canceled'),
      icon: IconCircleX,
    },
  ]
}

export const getPriorities = () => {
  const { t } = useTranslation('common')
  return [
    {
      label: t('tasks.priority.low'),
      value: 'low',
      icon: IconArrowDown,
    },
    {
      label: t('tasks.priority.medium'),
      value: 'medium',
      icon: IconArrowRight,
    },
    {
      label: t('tasks.priority.high'),
      value: 'high',
      icon: IconArrowUp,
    },
  ]
}
