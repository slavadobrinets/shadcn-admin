'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IconAlertTriangle } from '@tabler/icons-react'
import { showSuccessMessage, showErrorMessage } from '@/utils/show-submitted-data'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { User } from '../data/schema'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteSupabaseUser } from '../api/users'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: User
}

export function UsersDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const { t } = useTranslation('common')
  const [value, setValue] = useState('')
  
  // Получаем queryClient для инвалидации кэша после мутации
  const queryClient = useQueryClient()
  
  // Мутация для удаления пользователя
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteSupabaseUser(id),
    onSuccess: () => {
      // Инвалидируем кэш, чтобы получить обновленные данные
      queryClient.invalidateQueries({ queryKey: ['supabaseUsers'] })
    },
  })

  const handleDelete = async () => {
    if (value.trim() !== currentRow.login) return

    try {
      // Удаляем пользователя из базы данных
      await deleteMutation.mutateAsync(currentRow.id)
      
      onOpenChange(false)
      showSuccessMessage(t('users.delete.success_message'))
    } catch (error) {
      console.error('Ошибка при удалении пользователя:', error)
      showErrorMessage(
        t('users.delete.error_message'),
        error
      )
    }
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.login}
      title={
        <span className='text-destructive'>
          <IconAlertTriangle
            className='stroke-destructive mr-1 inline-block'
            size={18}
          />{' '}
          {t('users.delete.title')}
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            {t('users.delete.confirmation_question', { login: currentRow.login })}{' '}
            <br />
            {t('users.delete.warning_role', { role: currentRow.role.toUpperCase() })}
          </p>

          <Label className='my-2'>
            {t('users.delete.username_label')}
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={t('users.delete.username_placeholder')}
            />
          </Label>

          <Alert variant='destructive'>
            <AlertTitle>{t('users.delete.alert_title')}</AlertTitle>
            <AlertDescription>
              {t('users.delete.alert_description')}
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText={t('users.delete.confirm_button')}
      destructive
    />
  )
}
