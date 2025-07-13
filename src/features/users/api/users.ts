// src/features/users/api/users.ts
import { supabase } from '@/lib/supabaseClient'; // Импортируйте ваш Supabase клиент
import { User } from '../data/schema'; // Импортируйте схему пользователя

export async function fetchSupabaseUsers(): Promise<User[]> {
  const { data, error } = await supabase.from('users').select('*');

  if (error) {
    console.error('Ошибка при получении пользователей из Supabase:', error);
    throw new Error(error.message);
  }

  // Supabase возвращает массив объектов, который нужно привести к вашей схеме User
  // Важно, чтобы структура данных из Supabase совпадала с `User` схемой.
  return data as User[];
}