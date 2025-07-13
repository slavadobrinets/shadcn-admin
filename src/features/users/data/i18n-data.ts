import { useTranslation } from 'react-i18next'
import {
  IconUsersGroup,
  IconUserShield,
} from '@tabler/icons-react'

export function useUsersData() {
  const { t } = useTranslation('common') 

  const userTypes = [    
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
  
  return { userTypes }
}
