export type tEventListener<TArgs extends unknown[]> = (...args: TArgs) => void

export class EventEmitter<
  TEvents extends { [K in keyof TEvents]: unknown[] },
> {
  private readonly listeners = new Map<
    keyof TEvents,
    Set<(...args: any[]) => void>
  >()

  on<K extends keyof TEvents>(
    event: K,
    listener: tEventListener<TEvents[K]>,
  ): () => void {
    const listeners = this.listeners.get(event) ?? new Set()
    listeners.add(listener)
    this.listeners.set(event, listeners)

    return () => listeners.delete(listener)
  }

  emit<K extends keyof TEvents>(event: K, ...args: TEvents[K]): void {
    this.listeners.get(event)?.forEach(listener => listener(...args))
  }
}
