<template>
  <div class="modal-layout" :style="{ zIndex: manager.zIndex }">
    <TransitionGroup
      name="modal-stack"
      :duration="300"
    >
      <div
        v-for="item in manager.items"
        :key="item.id"
        class="modal-element"
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
import { defineComponent, type PropType } from 'vue'
import type { Modal } from './Modal'
import type { ModalController } from './ModalController'
import { setModalComponentRef } from './ModalRuntime'

export default defineComponent({
  name: 'ModalLayout',

  props: {
    manager: {
      type: Object as PropType<ModalController>,
      required: true,
    },
  },

  methods: {
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
