// src/features/groups/api/groups.ts
import { supabase } from '@/lib/supabaseClient'; // Импортируем Supabase клиент
import { Group } from '../data/schema'; // Импортируем схему группы

export async function fetchSupabaseGroups(): Promise<Group[]> {
  // Получаем все записи из базы данных
  const { data, error } = await supabase
    .from('groups')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Ошибка при получении групп из Supabase:', error);
    throw new Error(error.message);
  }

  // Получаем количество студентов для каждой группы
  const groupIds = data.map(group => group.id);
  
  // Получаем всех студентов для подсчета
  const { data: studentsData, error: studentsError } = await supabase
    .from('students')
    .select('group_id')
    .in('group_id', groupIds);

  if (studentsError) {
    console.error('Ошибка при получении студентов:', studentsError);
    // Продолжаем выполнение, но без данных о количестве студентов
  }

  // Создаем объект с количеством студентов для каждой группы
  const studentsCountMap: Record<string, number> = {};
  if (studentsData) {
    // Подсчитываем количество студентов для каждой группы
    studentsData.forEach((student: { group_id: string }) => {
      if (student.group_id) {
        studentsCountMap[student.group_id] = (studentsCountMap[student.group_id] || 0) + 1;
      }
    });
  }

  // Преобразуем данные, чтобы они соответствовали схеме Group
  const transformedData = data.map(group => ({
    ...group,
    // Если name отсутствует, устанавливаем значение по умолчанию
    name: group.name || 'Не указана',
    // Добавляем количество студентов
    students_count: studentsCountMap[group.id] || 0,
  }));

  // Возвращаем только реальные данные
  return transformedData as Group[];
}
