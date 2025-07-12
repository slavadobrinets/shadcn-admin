'use client'

import { useState } from 'react'
import { IconAlertTriangle } from '@tabler/icons-react'
import { showSubmittedData } from '@/utils/show-submitted-data'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { User } from '../data/schema'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: User
}

export function UsersDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const [value, setValue] = useState('')

  const handleDelete = () => {
    if (value.trim() !== currentRow.username) return

    onOpenChange(false)
    showSubmittedData(currentRow, 'Следующий пользователь был удален:')
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.username}
      title={
        <span className='text-destructive'>
          <IconAlertTriangle
            className='stroke-destructive mr-1 inline-block'
            size={18}
          />{' '}
          Удалить пользователя
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            Вы уверены, что хотите удалить{' '}
            <span className='font-bold'>{currentRow.username}</span>?
            <br />
            Это действие навсегда удалит пользователя с ролью{' '}
            <span className='font-bold'>
              {currentRow.role.toUpperCase()}
            </span>{' '}
            из системы. Это действие не может быть отменено.
          </p>

          <Label className='my-2'>
            Имя пользователя:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Введите имя пользователя для подтверждения удаления.'
            />
          </Label>

          <Alert variant='destructive'>
            <AlertTitle>Внимание!</AlertTitle>
            <AlertDescription>
              Будьте осторожны, эту операцию нельзя отменить.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText='Удалить'
      destructive
    />
  )
}
