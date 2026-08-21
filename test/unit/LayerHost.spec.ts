/**
 * @vitest-environment happy-dom
 */

import { defineComponent, h, markRaw, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import LayerHost from '@/LayerHost.vue'
import { ModalController } from '@/Layer/Modal/ModalController'
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
