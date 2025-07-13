import { useGroups } from '../context/groups-context'
import { GroupsActionDialog } from './groups-action-dialog'
import { GroupsDeleteDialog } from './groups-delete-dialog'
import { GroupsViewDialog } from './groups-view-dialog'
import { GroupsStudentsDialog } from './groups-students-dialog'
import { AddStudentToGroupDialog } from './add-student-to-group-dialog'

export function GroupsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useGroups()
  return (
    <>
      <GroupsActionDialog
        key='group-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      {currentRow && (
        <>
          <GroupsActionDialog
            key={`group-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <GroupsDeleteDialog
            key={`group-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <GroupsViewDialog
            key={`group-view-${currentRow.id}`}
            open={open === 'view'}
            onOpenChange={() => {
              setOpen('view')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
            onViewStudents={() => {
              setOpen('students')
            }}
          />

          <GroupsStudentsDialog
            key={`group-students-${currentRow.id}`}
            open={open === 'students'}
            onOpenChange={() => {
              setOpen('students')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <AddStudentToGroupDialog
            key={`add-student-to-group-${currentRow.id}`}
            open={open === 'add_student'}
            onOpenChange={() => {
              setOpen('add_student')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentGroup={currentRow}
          />
        </>
      )}
    </>
  )
}
