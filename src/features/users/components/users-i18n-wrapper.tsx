import React from 'react'
import { useTranslation } from 'react-i18next'
import { ColumnDef } from '@tanstack/react-table'
import { User } from '../data/schema'
import { createColumns } from './users-columns'
import { DataTableColumnHeader } from './data-table-column-header'

export function useUsersColumns(): ColumnDef<User>[] {
  const { t } = useTranslation('common')
  
  // Создаем колонки с функцией перевода
  const translatedColumns = [...createColumns(t)]
  
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
      if (column.accessorKey === 'login') {
        column.header = ({ column }) => (
          <DataTableColumnHeader column={column} title={t('users.column.login')} />
        )
      } else if (column.accessorKey === 'email') {
        column.header = ({ column }) => (
          <DataTableColumnHeader column={column} title={t('users.column.email')} />
        )
      } else if (column.accessorKey === 'department') {
        column.header = ({ column }) => (
          <DataTableColumnHeader column={column} title={t('users.column.department')} />
        )
      } else if (column.accessorKey === 'position') {
        column.header = ({ column }) => (
          <DataTableColumnHeader column={column} title={t('users.column.position')} />
        )
      } else if (column.accessorKey === 'role') {
        column.header = ({ column }) => (
          <DataTableColumnHeader column={column} title={t('users.column.role')} />
        )
      }
    } else if (column.id === 'full_name') {
      column.header = ({ column }) => (
        <DataTableColumnHeader column={column} title={t('users.column.full_name')} />
      )
    }
  })
  
  return translatedColumns
}
