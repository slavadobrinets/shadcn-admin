import { z } from 'zod'

const studentRoleSchema = z.union([
  z.literal('student'),
  z.literal('graduate'),
])

const studentSchema = z.object({
  id: z.string(),
  full_name: z.string(),
  group_id: z.string(),
  group_name: z.string().optional(),
  role: studentRoleSchema,
  created_at: z.coerce.date(),
})
export type Student = z.infer<typeof studentSchema>

export const studentListSchema = z.array(studentSchema)
