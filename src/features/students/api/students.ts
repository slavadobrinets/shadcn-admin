// src/features/students/api/students.ts
import { supabase } from '@/lib/supabaseClient'; // Импортируем Supabase клиент
import { Student } from '../data/schema'; // Импортируем схему студента

export async function fetchSupabaseStudents(): Promise<Student[]> {
  // Получаем все записи из базы данных с JOIN к таблице групп
  // Сначала получаем студентов с фамилиями от А до Ч
  const { data: dataFirstPart, error: errorFirstPart } = await supabase
    .from('students')
    .select(`
      *,
      groups:group_id (
        name
      )
    `)
    .lt('full_name', 'Ч') // Все фамилии до "Ч"
    .order('full_name', { ascending: true });

  if (errorFirstPart) {
    console.error('Ошибка при получении первой части студентов из Supabase:', errorFirstPart);
    throw new Error(errorFirstPart.message);
  }

  // Затем получаем студентов с фамилиями от Ч до Я
  const { data: dataSecondPart, error: errorSecondPart } = await supabase
    .from('students')
    .select(`
      *,
      groups:group_id (
        name
      )
    `)
    .gte('full_name', 'Ч') // Все фамилии от "Ч" и далее
    .order('full_name', { ascending: true });

  if (errorSecondPart) {
    console.error('Ошибка при получении второй части студентов из Supabase:', errorSecondPart);
    throw new Error(errorSecondPart.message);
  }

  // Объединяем результаты
  const data = [...dataFirstPart, ...dataSecondPart];

  // Преобразуем данные, чтобы они соответствовали схеме Student
  const transformedData = data.map(student => {
    // Удаляем вложенный объект groups из student, чтобы избежать конфликтов
    const { groups, ...rest } = student;
    
    return {
      ...rest,
      // Используем название группы из связанной таблицы или значение по умолчанию
      // Добавляем дополнительную проверку, чтобы убедиться, что name существует и не пустое
      group_name: groups && groups.name ? groups.name : 'Не указана',
      // Используем group_id из данных студента
      group_id: student.group_id || 'Не указана',
      // Если role не соответствует схеме, устанавливаем значение по умолчанию
      role: student.role === 'student' || student.role === 'graduate' ? student.role : 'student'
    };
  });

  // Возвращаем только реальные данные
  return transformedData as Student[];
}
