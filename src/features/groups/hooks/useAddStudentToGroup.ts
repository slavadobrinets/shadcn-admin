// src/features/groups/hooks/useAddStudentToGroup.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addStudentToGroup } from '../api/add-student-to-group';

interface AddStudentToGroupParams {
  groupId: string;
  studentId: string;
}

export function useAddStudentToGroup() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, AddStudentToGroupParams>({
    mutationFn: (params) => addStudentToGroup(params),
    onSuccess: (_, variables) => {
      // Инвалидируем кеш для обновления списка студентов группы
      queryClient.invalidateQueries({ queryKey: ['groupStudents', variables.groupId] });
      // Также инвалидируем кеш для обновления списка всех студентов
      queryClient.invalidateQueries({ queryKey: ['supabaseStudents'] });
      // И кеш для обновления списка всех групп (для обновления счетчика студентов)
      queryClient.invalidateQueries({ queryKey: ['supabaseGroups'] });
    },
  });
}
