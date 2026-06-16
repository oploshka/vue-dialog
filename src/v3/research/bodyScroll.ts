export function lockBodyScroll(type: 'modal' | 'notification'): void {
  document.body.classList.add(`body-scroll--${type}`)
}

export function unlockBodyScroll(type: 'modal' | 'notification'): void {
  document.body.classList.remove(`body-scroll--${type}`)
}