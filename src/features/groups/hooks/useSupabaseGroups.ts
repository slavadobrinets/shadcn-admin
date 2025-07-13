// src/features/groups/hooks/useSupabaseGroups.ts
import { useQuery } from '@tanstack/react-query';
import { fetchSupabaseGroups } from '../api/groups'; // Импортируем функцию получения данных

export function useSupabaseGroups() {
  return useQuery({
    queryKey: ['supabaseGroups'], // Уникальный ключ для этого запроса
    queryFn: fetchSupabaseGroups, // Функция, которая делает запрос к Supabase
    staleTime: 5 * 60 * 1000, // Данные считаются "свежими" в течение 5 минут
    // другие опции TanStack Query по необходимости
  });
}
