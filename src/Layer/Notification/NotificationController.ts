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
  duration?: number
}

type tNotificationConfig = {
  id: string
  component: Component
  props: tProps
  duration: number
  onClose?: () => void
}

type tNotificationTimer = {
  timer: ReturnType<typeof setTimeout> | null
  remaining: number
  startedAt: number
}

export class Notification implements sLayerItem {
  readonly id: string
  readonly component: Component
  readonly props: tProps
  readonly duration: number
  readonly onClose?: () => void

  private readonly requestClose: (notification: Notification) => void
  private readonly requestPause: (notification: Notification) => void
  private readonly requestResume: (notification: Notification) => void

  constructor(
    config: tNotificationConfig,
    requestClose: (notification: Notification) => void,
    requestPause: (notification: Notification) => void,
    requestResume: (notification: Notification) => void,
  ) {
    this.id = config.id
    this.component = config.component
    this.props = config.props
    this.duration = config.duration
    this.onClose = config.onClose
    this.requestClose = requestClose
    this.requestPause = requestPause
    this.requestResume = requestResume
  }

  close(): this {
    this.requestClose(this)
    return this
  }

  pause(): this {
    this.requestPause(this)
    return this
  }

  resume(): this {
    this.requestResume(this)
    return this
  }
}

export class NotificationController implements sLayerController {
  id = 'notification-controller'
  zIndex: number

  private readonly maxVisible: number
  private readonly duration: number
  private _items = shallowRef<Notification[]>([])
  private _queue: Notification[] = []
  private _timers = new Map<Notification, tNotificationTimer>()

  constructor(settings: sNotificationControllerSettings = {}) {
    this.zIndex = settings.zIndex ?? 5000
    this.maxVisible = Math.max(1, Math.floor(settings.maxVisible ?? Infinity))
    this.duration = Math.max(0, settings.duration ?? 5000)
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
      duration: Math.max(0, settings.duration ?? this.duration),
      onClose: settings.onClose,
    },
    item => this.removeNotification(item),
    item => this.pauseNotification(item),
    item => this.resumeNotification(item),
    )

    if (this._items.value.length < this.maxVisible) {
      this.showNotification(notification)
    } else {
      this._queue.push(notification)
    }

    return notification
  }

  private showNotification(notification: Notification): void {
    this._items.value = [...this._items.value, notification]
    this.startTimer(notification, notification.duration)
  }

  private startTimer(notification: Notification, duration: number): void {
    if (duration <= 0) return

    const state: tNotificationTimer = {
      timer: null,
      remaining: duration,
      startedAt: Date.now(),
    }

    state.timer = setTimeout(() => notification.close(), duration)
    this._timers.set(notification, state)
  }

  private pauseNotification(notification: Notification): void {
    if (!this._items.value.includes(notification)) return

    const state = this._timers.get(notification)
    if (!state?.timer) return

    state.remaining = Math.max(0, state.remaining - (Date.now() - state.startedAt))
    clearTimeout(state.timer)
    state.timer = null
  }

  private resumeNotification(notification: Notification): void {
    if (!this._items.value.includes(notification)) return

    const state = this._timers.get(notification)
    if (!state || state.timer) return

    if (state.remaining <= 0) {
      notification.close()
      return
    }

    state.startedAt = Date.now()
    state.timer = setTimeout(() => notification.close(), state.remaining)
  }

  private removeNotification(notification: Notification): void {
    const visibleIndex = this._items.value.indexOf(notification)

    if (visibleIndex !== -1) {
      this.clearTimer(notification)

      this._items.value = [
        ...this._items.value.slice(0, visibleIndex),
        ...this._items.value.slice(visibleIndex + 1),
      ]

      notification.onClose?.()
      this.showNext()
      return
    }

    const queueIndex = this._queue.indexOf(notification)
    if (queueIndex === -1) return

    this._queue.splice(queueIndex, 1)
    notification.onClose?.()
  }

  private showNext(): void {
    while (this._items.value.length < this.maxVisible && this._queue.length > 0) {
      const notification = this._queue.shift()
      if (notification) this.showNotification(notification)
    }
  }

  private clearTimer(notification: Notification): void {
    const state = this._timers.get(notification)
    if (!state) return

    if (state.timer) clearTimeout(state.timer)
    this._timers.delete(notification)
  }

  closeAll(): void {
    const notifications = [
      ...this._items.value,
      ...this._queue,
    ]

    for (const notification of this._items.value) {
      this.clearTimer(notification)
    }

    this._items.value = []
    this._queue = []

    for (const notification of notifications) {
      notification.onClose?.()
    }
  }

  get items(): readonly Notification[] {
    return this._items.value
  }

  handleEsc(): boolean {
    return false
  }
}
