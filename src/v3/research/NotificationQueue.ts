import type { LayerItem, LayerManager } from './types'

let counter = 0
function generateId(): string {
  return `notify-${++counter}-${Date.now()}`
}

export interface NotificationDescriptor extends LayerItem {
  type: 'notification'
  message: string
  variant: 'info' | 'success' | 'warning' | 'error'
  duration: number
  action?: {
    label: string
    callback: () => void
  }
  callbacks: {
    onClose?: () => void
  }
}

export class NotificationQueue implements LayerManager {
  id = 'notification-queue'
  zIndex: number
  private _items: NotificationDescriptor[] = []
  private _timers = new Map<string, ReturnType<typeof setTimeout>>()

  constructor(zIndex: number = 5000) {
    this.zIndex = zIndex
  }

  show(
    message: string,
    variant: NotificationDescriptor['variant'] = 'info',
    duration: number = 5000,
    action?: NotificationDescriptor['action'],
    callbacks: NotificationDescriptor['callbacks'] = {}
  ): string {
    const item: NotificationDescriptor = {
      id: generateId(),
      type: 'notification',
      message,
      variant,
      duration,
      action,
      callbacks,
    }

    this._items.push(item)

    if (duration > 0) {
      const timer = setTimeout(() => this.close(item.id), duration)
      this._timers.set(item.id, timer)
    }

    return item.id
  }

  pauseTimer(id: string): void {
    const timer = this._timers.get(id)
    if (timer) {
      clearTimeout(timer)
      this._timers.delete(id)
    }
  }

  resumeTimer(id: string, duration?: number): void {
    const item = this._items.find(i => i.id === id)
    if (!item) return
    const newDuration = duration ?? item.duration
    if (newDuration > 0) {
      const timer = setTimeout(() => this.close(id), newDuration)
      this._timers.set(id, timer)
    }
  }

  close(id?: string): void {
    let removed: NotificationDescriptor | undefined

    if (id) {
      const index = this._items.findIndex(item => item.id === id)
      if (index === -1) return
      removed = this._items.splice(index, 1)[0]
      const timer = this._timers.get(id)
      if (timer) {
        clearTimeout(timer)
        this._timers.delete(id)
      }
    } else {
      removed = this._items.shift()
      if (removed) {
        const timer = this._timers.get(removed.id)
        if (timer) {
          clearTimeout(timer)
          this._timers.delete(removed.id)
        }
      }
    }

    removed?.callbacks.onClose?.()
  }

  closeAll(): void {
    while (this._items.length) {
      this.close()
    }
  }

  get items(): readonly NotificationDescriptor[] {
    return this._items
  }

  handleEsc(): boolean {
    return false
  }
}