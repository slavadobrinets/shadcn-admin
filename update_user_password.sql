-- Функция для обновления пароля пользователя
-- Эту функцию нужно выполнить в SQL Editor в панели управления Supabase

-- Создаем функцию update_user_password, которая принимает ID пользователя и новый пароль
create or replace function update_user_password(user_id uuid, new_password text)
returns void
language plpgsql
security definer -- Выполняется с правами создателя функции
as $$
begin
  -- Обновление пароля пользователя в таблице auth.users
  update auth.users
  set encrypted_password = crypt(new_password, gen_salt('bf'))
  where id = user_id;
end;
$$;

-- Предоставляем доступ к функции для аутентифицированных пользователей
grant execute on function update_user_password(uuid, text) to authenticated;
