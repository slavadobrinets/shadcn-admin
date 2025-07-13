// src/features/groups/hooks/useGroupStudents.ts
import { useQuery } from '@tanstack/react-query';
import { fetchStudentsByGroup } from '../api/group-students'; // Импортируем функцию получения данных
import { Student } from '@/features/students/data/schema';

export function useGroupStudents(groupId: string) {
  return useQuery<Student[], Error>({
    queryKey: ['groupStudents', groupId], // Уникальный ключ для этого запроса, включающий ID группы
    queryFn: () => fetchStudentsByGroup(groupId), // Функция, которая делает запрос к Supabase
    staleTime: 5 * 60 * 1000, // Данные считаются "свежими" в течение 5 минут
    enabled: !!groupId, // Запрос выполняется только если есть ID группы
  });
}
