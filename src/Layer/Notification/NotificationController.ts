import { shallowRef, type Component } from 'vue'
import type { sLayerController, sLayerItem, tProps } from '../../Type/Type'

let counter = 0
function generateId(): string {
  return `notification-${++counter}-${Date.now()}`
}

export interface sNotificationSettings {
  duration?: number
  onClose?: () => void
}

export interface sNotificationControllerSettings {
  zIndex?: number
  maxVisible?: number
}

type tNotificationConfig = {
  id: string
  component: Component
  props: tProps
  duration: number
  onClose?: () => void
}

export class Notification implements sLayerItem {
  readonly id: string
  readonly component: Component
  readonly props: tProps
  readonly duration: number
  readonly onClose?: () => void

  private readonly requestClose: (notification: Notification) => void

  constructor(
    config: tNotificationConfig,
    requestClose: (notification: Notification) => void,
  ) {
    this.id = config.id
    this.component = config.component
    this.props = config.props
    this.duration = config.duration
    this.onClose = config.onClose
    this.requestClose = requestClose
  }

  close(): this {
    this.requestClose(this)
    return this
  }
}

export class NotificationController implements sLayerController {
  id = 'notification-controller'
  zIndex: number

  private readonly maxVisible: number
  private _items = shallowRef<Notification[]>([])
  private _timers = new Map<Notification, ReturnType<typeof setTimeout>>()

  constructor(settings: sNotificationControllerSettings = {}) {
    this.zIndex = settings.zIndex ?? 5000
    this.maxVisible = Math.max(1, Math.floor(settings.maxVisible ?? Infinity))
  }

  show(
    component: Component,
    props: tProps = {},
    settings: sNotificationSettings = {},
  ): Notification {
    const notification = new Notification({
      id: generateId(),
      component,
      props,
      duration: settings.duration ?? 5000,
      onClose: settings.onClose,
    }, item => this.removeNotification(item))

    while (this._items.value.length >= this.maxVisible) {
      this._items.value[0]?.close()
    }

    this._items.value = [...this._items.value, notification]

    if (notification.duration > 0) {
      const timer = setTimeout(() => notification.close(), notification.duration)
      this._timers.set(notification, timer)
    }

    return notification
  }

  private removeNotification(notification: Notification): void {
    const index = this._items.value.indexOf(notification)
    if (index === -1) return

    const timer = this._timers.get(notification)
    if (timer) {
      clearTimeout(timer)
      this._timers.delete(notification)
    }

    this._items.value = [
      ...this._items.value.slice(0, index),
      ...this._items.value.slice(index + 1),
    ]

    notification.onClose?.()
  }

  closeAll(): void {
    while (this._items.value.length > 0) {
      this._items.value[this._items.value.length - 1]?.close()
    }
  }

  get items(): readonly Notification[] {
    return this._items.value
  }

  handleEsc(): boolean {
    return false
  }
}
