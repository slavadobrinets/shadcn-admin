import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IconAlertTriangle } from '@tabler/icons-react'
import { showSubmittedData } from '@/utils/show-submitted-data'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { Student } from '../data/schema'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Student
}

export function StudentsDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const { t } = useTranslation('common')
  const [value, setValue] = useState('')

  const handleDelete = () => {
    if (value.trim() !== currentRow.full_name) return

    onOpenChange(false)
    showSubmittedData(currentRow, t('students.delete.success_message'))
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.full_name}
      title={
        <span className='text-destructive'>
          <IconAlertTriangle
            className='stroke-destructive mr-1 inline-block'
            size={18}
          />{' '}
          {t('students.delete.title')}
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            {t('students.delete.confirmation_question', { name: currentRow.full_name })}{' '}
            <br />
            {t('students.delete.warning_role', { role: currentRow.role.toUpperCase() })}
          </p>

          <Label className='my-2'>
            {t('students.delete.full_name_label')}
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={t('students.delete.full_name_placeholder')}
            />
          </Label>

          <Alert variant='destructive'>
            <AlertTitle>{t('students.delete.alert_title')}</AlertTitle>
            <AlertDescription>
              {t('students.delete.alert_description')}
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText={t('students.delete.confirm_button')}
      destructive
    />
  )
}
