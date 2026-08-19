export const alertVariants = {
  success: {
    title: 'Успешно',
    accent: '#5cd182',
  },
  warning: {
    title: 'Предупреждение',
    accent: '#f5ac1c',
  },
  error: {
    title: 'Ошибка',
    accent: '#ffb3b3',
  },
} as const

export type tAlertVariant = keyof typeof alertVariants
