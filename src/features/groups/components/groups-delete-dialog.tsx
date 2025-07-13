import { useTranslation } from 'react-i18next'
import { showSubmittedData } from '@/utils/show-submitted-data'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { Group } from '../data/schema'

interface Props {
  currentRow: Group
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function GroupsDeleteDialog({ currentRow, open, onOpenChange }: Props) {
  const { t } = useTranslation('common')

  const handleConfirm = () => {
    showSubmittedData(
      { id: currentRow.id, action: 'delete' },
      t('groups.delete.submitted_data')
    )
    onOpenChange(false)
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title={t('groups.delete.title')}
      desc={
        <>
          {t('groups.delete.description')}
          <p className="mt-2 font-medium">
            {t('groups.delete.group_name')}: {currentRow.name}
          </p>
        </>
      }
      confirmText={t('groups.delete.confirm_button')}
      cancelBtnText={t('groups.delete.cancel_button')}
      destructive
      handleConfirm={handleConfirm}
    />
  )
}
