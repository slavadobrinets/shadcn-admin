import { useTranslation } from 'react-i18next'
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

export function useTasksData() {
  const { t } = useTranslation('common')
  
  const labels = [
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

  const statuses = [
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

  const priorities = [
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
  
  return { labels, statuses, priorities }
}
