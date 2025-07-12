/**
 * Список доступных языков для приложения.
 * Этот массив используется для генерации выбора языка в настройках внешнего вида.
 * 
 * Формат: [код языка, название языка]
 */
export const languages = [
  ['ru', 'Русский'],
  ['en', 'English'],
] as const

export type LanguageCode = (typeof languages)[number][0]
export type LanguageName = (typeof languages)[number][1]
