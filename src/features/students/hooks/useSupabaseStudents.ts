// src/features/students/hooks/useSupabaseStudents.ts
import { useQuery } from '@tanstack/react-query';
import { fetchSupabaseStudents } from '../api/students'; // Импортируем функцию получения данных

export function useSupabaseStudents() {
  return useQuery({
    queryKey: ['supabaseStudents'], // Уникальный ключ для этого запроса
    queryFn: fetchSupabaseStudents, // Функция, которая делает запрос к Supabase
    staleTime: 5 * 60 * 1000, // Данные считаются "свежими" в течение 5 минут
    // другие опции TanStack Query по необходимости
  });
}
