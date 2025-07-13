// src/features/groups/api/group-students.ts
import { supabase } from '@/lib/supabaseClient'; // Импортируем Supabase клиент
import { Student } from '@/features/students/data/schema'; // Импортируем схему студента

export async function fetchStudentsByGroup(groupId: string): Promise<Student[]> {
  // Получаем студентов конкретной группы из базы данных
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('group_id', groupId) // Фильтруем по ID группы
    .order('full_name', { ascending: true });

  if (error) {
    console.error('Ошибка при получении студентов группы из Supabase:', error);
    throw new Error(error.message);
  }

  // Преобразуем данные, чтобы они соответствовали схеме Student
  const transformedData = data.map(student => ({
    ...student,
    // Если role не соответствует схеме, устанавливаем значение по умолчанию
    role: student.role === 'student' || student.role === 'graduate' ? student.role : 'student'
  }));

  // Возвращаем только реальные данные
  return transformedData as Student[];
}
