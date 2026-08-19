export type tConfirmChoiceValue = string | number

export type tConfirmChoiceItem = {
  id: tConfirmChoiceValue
  name: string
}

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
  choice: {
    title: 'Выберите вариант',
    background: '#eef6ff',
    accent: '#187fe7',
  },
} as const

export type tConfirmAction = keyof typeof confirmActions
