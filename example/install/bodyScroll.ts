const bodyScrollClass = 'body-scroll--locked'

export function lockBodyScroll(): void {
  document.body.classList.add(bodyScrollClass)
}

export function unlockBodyScroll(): void {
  document.body.classList.remove(bodyScrollClass)
}
