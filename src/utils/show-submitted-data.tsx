import { toast } from 'sonner'
import { CheckCircle, AlertCircle } from 'lucide-react'

// Оригинальная функция для отображения данных (оставляем для обратной совместимости)
export function showSubmittedData(
  data: unknown,
  title: string = 'You submitted the following values:'
) {
  toast.message(title, {
    description: (
      <pre className='mt-2 w-full overflow-x-auto rounded-md bg-slate-950 p-4'>
        <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
      </pre>
    ),
  })
}

// Новая функция для отображения уведомления об успешной операции
export function showSuccessMessage(message: string) {
  toast.success(message, {
    icon: <CheckCircle className="h-5 w-5" />,
    className: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    duration: 3000,
  })
}

// Новая функция для отображения уведомления об ошибке
export function showErrorMessage(message: string, error?: unknown) {
  toast.error(message, {
    icon: <AlertCircle className="h-5 w-5" />,
    className: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    description: error ? (
      <div className="mt-2 text-sm text-red-600 dark:text-red-400">
        {error instanceof Error ? error.message : String(error)}
      </div>
    ) : undefined,
    duration: 5000,
  })
}
