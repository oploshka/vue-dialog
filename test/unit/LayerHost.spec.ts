/**
 * @vitest-environment happy-dom
 */

import { defineComponent, h, markRaw, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import LayerHost from '@/LayerHost.vue'
import { ModalController } from '@/Layer/Modal/ModalController'
import { NotificationController } from '@/Layer/Notification/NotificationController'
import type { sLayerController } from '@/Type/Type'

const LayerTemplate = markRaw(defineComponent({
  props: ['manager'],
  setup() {
    return () => h('div')
  },
}))

const ModalComponent = markRaw(defineComponent({
  setup() {
    return () => h('div')
  },
}))

function createManager(
  id: string,
  zIndex: number,
  handleEsc: () => boolean,
): sLayerController {
  return {
    id,
    zIndex,
    items: [],
    handleEsc,
  }
}

afterEach(() => {
  document.body.innerHTML = ''
})

describe('LayerHost', () => {
  it.each([undefined, false, true])('respects blockLowerEsc=%s on an occupied modal layer', (blockLowerEsc) => {
    const low = new ModalController(1000)
    const high = new ModalController(2000)
    const lowModal = low.open(ModalComponent)
    const highModal = high.open(ModalComponent, {}, { closeOnEsc: false })
    expect(low.id).not.toBe(high.id)

    const wrapper = mount(LayerHost, {
      props: { layers: [
        { manager: low, template: LayerTemplate },
        { manager: high, template: LayerTemplate, blockLowerEsc },
      ] },
    })

    document.body.firstElementChild?.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Escape', bubbles: true,
    }))

    expect(high.items).toEqual([highModal])
    expect(low.items).toEqual(blockLowerEsc ? [lowModal] : [])
    wrapper.unmount()
  })

  it('lets ESC through an empty blocking layer and closes at most one window', () => {
    const low = new ModalController(1000)
    const high = new ModalController(2000)
    const lowModal = low.open(ModalComponent)
    high.open(ModalComponent)
    const wrapper = mount(LayerHost, {
      props: { layers: [
        { manager: low, template: LayerTemplate },
        { manager: high, template: LayerTemplate, blockLowerEsc: true },
      ] },
    })
    const pressEsc = () => document.body.firstElementChild?.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
    )
    pressEsc()
    expect(high.items).toHaveLength(0)
    expect(low.items).toEqual([lowModal])
    pressEsc()
    expect(low.items).toHaveLength(0)
    wrapper.unmount()
  })

  it('can block ESC in a custom occupied layer without an ESC handler', async () => {
    const low = new ModalController(1000)
    low.open(ModalComponent)
    const layer = { manager: { id: 'custom', zIndex: 2000, items: [{ id: 'item' }] }, template: LayerTemplate }
    const wrapper = mount(LayerHost, {
      props: { layers: [
        { manager: low, template: LayerTemplate },
        { ...layer, blockLowerEsc: true },
      ] },
    })
    document.body.firstElementChild?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    expect(low.items).toHaveLength(1)
    await wrapper.setProps({ layers: [
      { manager: low, template: LayerTemplate },
      { ...layer, blockLowerEsc: false },
    ] })
    console.log('HOST PROPS', wrapper.props('layers')[1]?.blockLowerEsc, wrapper.vm.sortedLayers[1]?.blockLowerEsc)
    document.body.firstElementChild?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    expect(low.items).toHaveLength(0)
    wrapper.unmount()
  })

  it('keeps notification controllers independent and passes ESC through them by default', () => {
    const low = new ModalController()
    low.open(ModalComponent)
    const first = new NotificationController({ duration: 0 })
    const second = new NotificationController({ duration: 0 })
    first.show(ModalComponent)
    second.show(ModalComponent)
    expect(first.id).not.toBe(second.id)
    const wrapper = mount(LayerHost, { props: { layers: [
      { manager: low, template: LayerTemplate },
      { manager: first, template: LayerTemplate },
      { manager: second, template: LayerTemplate },
    ] } })
    document.body.firstElementChild?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    expect(low.items).toHaveLength(0)
    expect(first.items).toHaveLength(1)
    expect(second.items).toHaveLength(1)
    wrapper.unmount()
  })

  it('updates body locking when layers change and unsubscribes removed controllers', async () => {
    const first = new ModalController()
    const second = new ModalController()
    first.open(ModalComponent)
    second.open(ModalComponent)
    const onLockBodyScroll = vi.fn()
    const onUnlockBodyScroll = vi.fn()
    const wrapper = mount(LayerHost, { props: {
      layers: [{ manager: first, template: LayerTemplate, lockBodyScroll: true }],
      onLockBodyScroll, onUnlockBodyScroll,
    } })
    await wrapper.setProps({ layers: [{ manager: second, template: LayerTemplate, lockBodyScroll: true }] })
    expect(onLockBodyScroll).toHaveBeenCalledTimes(1)
    expect(onUnlockBodyScroll).not.toHaveBeenCalled()
    first.closeAll()
    expect(onUnlockBodyScroll).not.toHaveBeenCalled()
    await wrapper.setProps({ layers: [{ manager: second, template: LayerTemplate, lockBodyScroll: false }] })
    expect(onUnlockBodyScroll).toHaveBeenCalledTimes(1)
    first.open(ModalComponent)
    expect(onLockBodyScroll).toHaveBeenCalledTimes(1)
    await wrapper.setProps({ layers: [{ manager: second, template: LayerTemplate, lockBodyScroll: true }] })
    expect(onLockBodyScroll).toHaveBeenCalledTimes(2)
    await wrapper.setProps({ layers: [] })
    expect(onUnlockBodyScroll).toHaveBeenCalledTimes(2)
    wrapper.unmount()
    second.closeAll()
    expect(onUnlockBodyScroll).toHaveBeenCalledTimes(2)
  })

  it('locks on the first lock-enabled item and unlocks after the last one closes', async () => {
    const controller = new ModalController()
    const onLockBodyScroll = vi.fn()
    const onUnlockBodyScroll = vi.fn()

    const wrapper = mount(LayerHost, {
      props: {
        layers: [{
          manager: controller,
          template: LayerTemplate,
          lockBodyScroll: true,
        }],
        onLockBodyScroll,
        onUnlockBodyScroll,
      },
    })

    expect(onLockBodyScroll).not.toHaveBeenCalled()
    expect(onUnlockBodyScroll).not.toHaveBeenCalled()

    const first = controller.open(ModalComponent)
    await nextTick()
    expect(onLockBodyScroll).toHaveBeenCalledTimes(1)

    const second = controller.open(ModalComponent)
    await nextTick()
    expect(onLockBodyScroll).toHaveBeenCalledTimes(1)

    first.close()
    await nextTick()
    expect(onUnlockBodyScroll).not.toHaveBeenCalled()

    second.close()
    await nextTick()
    expect(onUnlockBodyScroll).toHaveBeenCalledTimes(1)

    wrapper.unmount()
    expect(onUnlockBodyScroll).toHaveBeenCalledTimes(1)
  })

  it('locks immediately when mounted with an existing lock-enabled item', () => {
    const controller = new ModalController()
    controller.open(ModalComponent)
    const onLockBodyScroll = vi.fn()

    const wrapper = mount(LayerHost, {
      props: {
        layers: [{
          manager: controller,
          template: LayerTemplate,
          lockBodyScroll: true,
        }],
        onLockBodyScroll,
      },
    })

    expect(onLockBodyScroll).toHaveBeenCalledTimes(1)
    wrapper.unmount()
  })

  it('unlocks once when unmounted while a scroll lock is active', () => {
    const controller = new ModalController()
    controller.open(ModalComponent)
    const onLockBodyScroll = vi.fn()
    const onUnlockBodyScroll = vi.fn()

    const wrapper = mount(LayerHost, {
      props: {
        layers: [{
          manager: controller,
          template: LayerTemplate,
          lockBodyScroll: true,
        }],
        onLockBodyScroll,
        onUnlockBodyScroll,
      },
    })

    expect(onLockBodyScroll).toHaveBeenCalledTimes(1)

    wrapper.unmount()
    expect(onUnlockBodyScroll).toHaveBeenCalledTimes(1)
  })

  it('does not lock for layers that do not request body-scroll locking', () => {
    const controller = new ModalController()
    controller.open(ModalComponent)
    const onLockBodyScroll = vi.fn()

    const wrapper = mount(LayerHost, {
      props: {
        layers: [{
          manager: controller,
          template: LayerTemplate,
          lockBodyScroll: false,
        }],
        onLockBodyScroll,
      },
    })

    expect(onLockBodyScroll).not.toHaveBeenCalled()
    wrapper.unmount()
  })

  it('delegates ESC from highest z-index down and stops after it is handled', () => {
    const lowHandleEsc = vi.fn(() => true)
    const middleHandleEsc = vi.fn(() => true)
    const highHandleEsc = vi.fn(() => false)

    const wrapper = mount(LayerHost, {
      props: {
        layers: [
          {
            manager: createManager('low', 1000, lowHandleEsc),
            template: LayerTemplate,
          },
          {
            manager: createManager('high', 3000, highHandleEsc),
            template: LayerTemplate,
          },
          {
            manager: createManager('middle', 2000, middleHandleEsc),
            template: LayerTemplate,
          },
        ],
      },
    })

    const host = document.body.firstElementChild
    expect(host).not.toBeNull()

    host?.dispatchEvent(new KeyboardEvent('keydown', {
      key: 'Escape',
      bubbles: true,
    }))

    expect(highHandleEsc).toHaveBeenCalledTimes(1)
    expect(middleHandleEsc).toHaveBeenCalledTimes(1)
    expect(lowHandleEsc).not.toHaveBeenCalled()

    wrapper.unmount()
  })
})
