import { z } from 'zod'



const userRoleSchema = z.union([
  z.literal('admin'),
  z.literal('teacher'),
])

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
export type User = z.infer<typeof userSchema>

export const userListSchema = z.array(userSchema)
