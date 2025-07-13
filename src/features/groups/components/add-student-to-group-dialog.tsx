import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Group } from '../data/schema'
import { useAddStudentToGroup } from '../hooks/useAddStudentToGroup'
import { useSupabaseStudents } from '@/features/students/hooks/useSupabaseStudents'

interface Props {
  currentGroup: Group
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddStudentToGroupDialog({ currentGroup, open, onOpenChange }: Props) {
  const { t } = useTranslation('common')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { mutateAsync: addStudentToGroup } = useAddStudentToGroup()
  const { data: allStudents, isLoading: studentsLoading } = useSupabaseStudents()

  // Создаем схему формы
  const formSchema = z.object({
    studentId: z.string().min(1, { message: t('groups.add_student.errors.student_required') }),
  })

  type FormValues = z.infer<typeof formSchema>

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentId: '',
    },
  })

  // Фильтруем студентов, которые еще не в этой группе
  const availableStudents = allStudents?.filter(student => student.group_id !== currentGroup.id) || []

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true)
      await addStudentToGroup({
        groupId: currentGroup.id,
        studentId: values.studentId,
      })
      form.reset()
      onOpenChange(false)
    } catch (error) {
      console.error('Ошибка при добавлении студента в группу:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        if (!isSubmitting) {
          form.reset()
          onOpenChange(state)
        }
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-left'>
          <DialogTitle>{t('groups.add_student.title')}</DialogTitle>
          <DialogDescription>
            {t('groups.add_student.description', { groupName: currentGroup.name })}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form
            id='add-student-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4 p-0.5'
          >
            <FormField
              control={form.control}
              name='studentId'
              render={({ field }) => (
                <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                  <FormLabel className='col-span-2 text-right'>
                    {t('groups.add_student.student')}
                  </FormLabel>
                  <div className='col-span-4'>
                    <FormControl>
                      <Select
                        disabled={studentsLoading || availableStudents.length === 0}
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t('groups.add_student.select_student')} />
                        </SelectTrigger>
                        <SelectContent>
                          {availableStudents.length > 0 ? (
                            availableStudents.map((student) => (
                              <SelectItem key={student.id} value={student.id}>
                                {student.full_name}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="no-students" disabled>
                              {studentsLoading 
                                ? t('groups.add_student.loading_students')
                                : t('groups.add_student.no_available_students')
                              }
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>
                  <FormMessage className='col-span-4 col-start-3' />
                </FormItem>
              )}
            />
          </form>
        </Form>
        
        <DialogFooter>
          <Button
            variant='outline'
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            {t('groups.add_student.cancel')}
          </Button>
          <Button
            type='submit'
            form='add-student-form'
            disabled={isSubmitting || studentsLoading || availableStudents.length === 0}
          >
            {isSubmitting ? t('groups.add_student.adding') : t('groups.add_student.add')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
