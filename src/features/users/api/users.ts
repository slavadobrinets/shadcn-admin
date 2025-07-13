// src/features/users/api/users.ts
import { supabase } from '@/lib/supabaseClient';
import { User, UserInput } from '../data/schema';

// Получение всех пользователей
export async function fetchSupabaseUsers(): Promise<User[]> {
  const { data, error } = await supabase.from('users').select('*');

  if (error) {
    console.error('Ошибка при получении пользователей из Supabase:', error);
    throw new Error(error.message);
  }

  return data as User[];
}

// Создание нового пользователя
export async function createSupabaseUser(userData: UserInput): Promise<User> {
  // Извлекаем пароль из данных пользователя
  const { password, ...userDataWithoutPassword } = userData;
  
  // Проверяем, что пароль указан
  if (!password) {
    throw new Error('Пароль обязателен для создания пользователя');
  }
  
  // Сначала создаем пользователя в Auth системе
  const { error: authError } = await supabase.auth.signUp({
    email: userData.email,
    password: password,
    options: {
      data: {
        full_name: userData.full_name,
        role: userData.role
      }
    }
  });
  
  if (authError) {
    console.error('Ошибка при создании аутентификации пользователя:', authError);
    throw new Error(authError.message);
  }
  
  // Добавляем текущую дату создания и хеш пароля
  const userWithDate = {
    ...userDataWithoutPassword,
    created_at: new Date().toISOString(),
    password_hash: await hashPassword(password), // Хешируем пароль
  };

  // Затем сохраняем данные пользователя в таблицу users
  const { data, error } = await supabase
    .from('users')
    .insert([userWithDate])
    .select()
    .single();

  if (error) {
    console.error('Ошибка при создании пользователя в Supabase:', error);
    throw new Error(error.message);
  }

  return data as User;
}

// Функция для хеширования пароля
async function hashPassword(password: string): Promise<string> {
  // Используем встроенный в браузер API для хеширования
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  
  // Преобразуем хеш в строку в формате hex
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
}

// Обновление существующего пользователя
export async function updateSupabaseUser(id: string, userData: Partial<UserInput>): Promise<User> {
  // Извлекаем пароль из данных пользователя
  const { password, ...userDataWithoutPassword } = userData;
  
  // Если указан пароль, обновляем его через Auth API и обновляем хеш пароля
  if (password) {
    // Обновляем пароль в Auth системе через RPC
    const { error: authError } = await supabase.rpc('update_user_password', {
      user_id: id,
      new_password: password
    });
    
    if (authError) {
      console.error('Ошибка при обновлении пароля пользователя:', authError);
      throw new Error(authError.message);
    }
    
    // Также обновляем хеш пароля в таблице users
    const passwordHash = await hashPassword(password);
    const { error: hashError } = await supabase
      .from('users')
      .update({ password_hash: passwordHash })
      .eq('id', id);
      
    if (hashError) {
      console.error('Ошибка при обновлении хеша пароля:', hashError);
      throw new Error(hashError.message);
    }
  }
  
  // Если есть другие данные для обновления, кроме пароля
  if (Object.keys(userDataWithoutPassword).length > 0) {
    // Обновляем остальные данные пользователя в таблице users
    const { data, error } = await supabase
      .from('users')
      .update(userDataWithoutPassword)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Ошибка при обновлении пользователя в Supabase:', error);
      throw new Error(error.message);
    }
    
    return data as User;
  } else {
    // Если обновлялся только пароль, получаем текущие данные пользователя
    const { data, error } = await supabase
      .from('users')
      .select()
      .eq('id', id)
      .single();
      
    if (error) {
      console.error('Ошибка при получении данных пользователя:', error);
      throw new Error(error.message);
    }
    
    return data as User;
  }
}

// Удаление пользователя
export async function deleteSupabaseUser(id: string): Promise<void> {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Ошибка при удалении пользователя из Supabase:', error);
    throw new Error(error.message);
  }
}
