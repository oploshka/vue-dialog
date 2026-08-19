export type tPromptValue = string | number

export type tPromptChoiceItem = {
  id: tPromptValue
  name: string
}

export const promptActions = {
  text: {
    title: 'Подтвердите действие',
    background: '#eefff4',
    accent: '#198754',
  },
  choice: {
    title: 'Выберите вариант',
    background: '#eef6ff',
    accent: '#187fe7',
  },
} as const

export type tPromptAction = keyof typeof promptActions
