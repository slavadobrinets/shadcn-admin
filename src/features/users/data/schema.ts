import { z } from 'zod'

// Определяем роли пользователей
const userRoleSchema = z.union([
  z.literal('admin'),
  z.literal('teacher'),
])

// Схема для пользователя в базе данных
const userSchema = z.object({
  id: z.string(),
  full_name: z.string(),
  login: z.string(),
  email: z.string(),
  department: z.string(),
  position: z.string(),
  role: userRoleSchema,
  created_at: z.coerce.date(),
  // updatedAt: z.coerce.date(),
})

// Расширенная схема для создания/обновления пользователя
const userInputSchema = userSchema.omit({ id: true, created_at: true }).extend({
  password: z.string().optional(),
})

export type User = z.infer<typeof userSchema>
export type UserInput = z.infer<typeof userInputSchema>

export const userListSchema = z.array(userSchema)
