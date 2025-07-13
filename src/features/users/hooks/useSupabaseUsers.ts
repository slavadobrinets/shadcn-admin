// src/features/users/hooks/useSupabaseUsers.ts
import { useQuery } from '@tanstack/react-query';
import { fetchSupabaseUsers } from '../api/users'; // Импортируйте функцию получения данных

export function useSupabaseUsers() {
  return useQuery({
    queryKey: ['supabaseUsers'], // Уникальный ключ для этого запроса
    queryFn: fetchSupabaseUsers, // Ваша функция, которая делает запрос к Supabase
    staleTime: 5 * 60 * 1000, // Данные считаются "свежими" в течение 5 минут
    // другие опции TanStack Query по необходимости
  });
}