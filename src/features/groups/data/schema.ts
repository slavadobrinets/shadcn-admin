import { z } from 'zod'

const groupSchema = z.object({
  id: z.string(),
  name: z.string(),
  created_at: z.coerce.date(),
  students_count: z.number().optional().default(0),
})
export type Group = z.infer<typeof groupSchema>

export const groupListSchema = z.array(groupSchema)
