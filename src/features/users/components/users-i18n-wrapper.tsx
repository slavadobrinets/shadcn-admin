import React from 'react'
import { useTranslation } from 'react-i18next'
import { ColumnDef } from '@tanstack/react-table'
import { User } from '../data/schema'
import { columns as originalColumns } from './users-columns'
import { DataTableColumnHeader } from './data-table-column-header'

export function useUsersColumns(): ColumnDef<User>[] {
  const { t } = useTranslation('common')
  
  // Создаем копию оригинальных колонок
  const translatedColumns = [...originalColumns]
  
  // Обновляем заголовки колонок
  translatedColumns.forEach((column) => {
    if (column.id === 'select') {
      // Для колонки с чекбоксами обновляем aria-label
      const selectColumn = column as any
      const originalHeader = selectColumn.header
      const originalCell = selectColumn.cell
      
      selectColumn.header = (props: any) => {
        const originalElement = originalHeader(props)
        return React.cloneElement(originalElement, {
          'aria-label': t('users.select_all')
        })
      }
      
      selectColumn.cell = (props: any) => {
        const originalElement = originalCell(props)
        return React.cloneElement(originalElement, {
          'aria-label': t('users.select_row')
        })
      }
    } else if ('accessorKey' in column) {
      if (column.accessorKey === 'username') {
        column.header = ({ column }) => (
          <DataTableColumnHeader column={column} title={t('users.column.username')} />
        )
      } else if (column.accessorKey === 'email') {
        column.header = ({ column }) => (
          <DataTableColumnHeader column={column} title={t('users.column.email')} />
        )
      } else if (column.accessorKey === 'phoneNumber') {
        column.header = ({ column }) => (
          <DataTableColumnHeader column={column} title={t('users.column.phone')} />
        )
      } else if (column.accessorKey === 'status') {
        column.header = ({ column }) => (
          <DataTableColumnHeader column={column} title={t('users.column.status')} />
        )
      } else if (column.accessorKey === 'role') {
        column.header = ({ column }) => (
          <DataTableColumnHeader column={column} title={t('users.column.role')} />
        )
      }
    } else if (column.id === 'fullName') {
      column.header = ({ column }) => (
        <DataTableColumnHeader column={column} title={t('users.column.name')} />
      )
    }
  })
  
  return translatedColumns
}
