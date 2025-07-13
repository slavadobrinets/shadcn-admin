// src/features/groups/api/add-student-to-group.ts
import { supabase } from '@/lib/supabaseClient'; // Импортируем Supabase клиент

interface AddStudentToGroupParams {
  groupId: string;
  studentId: string;
}

export async function addStudentToGroup({ groupId, studentId }: AddStudentToGroupParams): Promise<void> {
  // Проверяем, существует ли студент
  const { data: studentData, error: studentError } = await supabase
    .from('students')
    .select('id')
    .eq('id', studentId)
    .single();

  if (studentError || !studentData) {
    console.error('Ошибка при проверке студента:', studentError);
    throw new Error('Студент не найден');
  }

  // Обновляем группу студента
  const { error: updateError } = await supabase
    .from('students')
    .update({ group_id: groupId })
    .eq('id', studentId);

  if (updateError) {
    console.error('Ошибка при добавлении студента в группу:', updateError);
    throw new Error(updateError.message);
  }
}
