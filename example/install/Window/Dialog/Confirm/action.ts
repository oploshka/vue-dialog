export const confirmActions = {
  add: {
    title: 'Подтвердите добавление',
    background: '#eefff4',
    accent: '#198754',
  },
  delete: {
    title: 'Подтвердите удаление',
    background: '#fff3f3',
    accent: '#dc3545',
  },
} as const

export type tConfirmAction = keyof typeof confirmActions
