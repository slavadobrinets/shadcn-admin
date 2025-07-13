import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Group } from '../data/schema'

type GroupsDialogType = 'add' | 'edit' | 'delete' | 'view' | 'students' | 'add_student'

interface GroupsContextType {
  open: GroupsDialogType | null
  setOpen: (str: GroupsDialogType | null) => void
  currentRow: Group | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Group | null>>
}

const GroupsContext = React.createContext<GroupsContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function GroupsProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<GroupsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Group | null>(null)

  return (
    <GroupsContext.Provider value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </GroupsContext.Provider>
  )
}

export const useGroups = () => {
  const groupsContext = React.useContext(GroupsContext)

  if (!groupsContext) {
    throw new Error('useGroups has to be used within <GroupsContext>')
  }

  return groupsContext
}
