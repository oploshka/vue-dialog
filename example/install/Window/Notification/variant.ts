export const notificationVariants = {
  info: {
    background: '#eef6ff',
    border: '#187fe7',
    text: '#181a35',
    icon: '!',
  },
  success: {
    background: '#eefff4',
    border: '#2d9d5b',
    text: '#181a35',
    icon: '✓',
  },
  warning: {
    background: '#fff8e6',
    border: '#d99a00',
    text: '#181a35',
    icon: '!',
  },
  error: {
    background: '#fff3f3',
    border: '#d64545',
    text: '#181a35',
    icon: '!',
  },
} as const

export type tNotificationVariant = keyof typeof notificationVariants

export function isNotificationVariant(value: unknown): value is tNotificationVariant {
  return typeof value === 'string' && value in notificationVariants
}
