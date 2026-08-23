<template>
  <div class="modal-layout" :style="{ zIndex: manager.zIndex }">
    <TransitionGroup
      name="modal-stack"
      :duration="300"
    >
      <div
        v-for="item in manager.items"
        :key="item.id"
        :ref="element => bindFocusElement(item, element)"
        class="modal-element"
        tabindex="-1"
        :style="{ zIndex: item.zIndex }"
      >
        <component
          :is="item.settings.presenterComp"
          v-bind="getPresenterProps(item)"
        />
      </div>
    </TransitionGroup>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  type ComponentPublicInstance,
  type PropType,
} from 'vue'
import type { Modal } from '@/Layer/Modal/Modal'
import type { ModalController } from '@/Layer/Modal/ModalController'
import { setModalComponentRef } from '@/Layer/Modal/ModalRuntime'
import type { sFocusBinding } from '@/Plugin/useFocus'

export default defineComponent({
  name: 'ModalLayout',

  props: {
    manager: {
      type: Object as PropType<ModalController>,
      required: true,
    },
    focus: {
      type: Object as PropType<sFocusBinding>,
      default: undefined,
    },
  },

  methods: {
    bindFocusElement(
      modal: Modal,
      element: Element | ComponentPublicInstance | null,
    ): void {
      if (!this.focus) return

      if (element instanceof HTMLElement) {
        this.focus.bind(modal, element)
      } else {
        this.focus.unbind(modal)
      }
    },

    getPresenterProps(modal: Modal) {
      return {
        component: modal.component,
        componentProps: modal.props,

        overlayComp: modal.settings.overlayComp,
        overlayProps: modal.settings.overlayProps,

        wrapComp: modal.settings.wrapComp,
        wrapProps: modal.settings.wrapProps,

        bridgeComp: modal.settings.bridgeComp,
        bridgeProps: modal.settings.bridgeProps,

        settings: modal.settings.presenterProps,

        closeOnBackdrop: modal.settings.closeOnBackdrop,
        close: () => modal.close(),
        bindComponentRef: (componentRef: unknown) => setModalComponentRef(modal, componentRef),
      }
    },
  },
})
</script>

<style scoped>
.modal-layout,
.modal-element {
  position: fixed;
  inset: 0;
}

.modal-layout {
  pointer-events: none;
}

.modal-element {
  pointer-events: auto;
}
</style>
