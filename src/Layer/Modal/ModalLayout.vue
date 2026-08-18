<template>
  <div class="modal-layout" :style="{ zIndex: manager.zIndex }">
    <TransitionGroup name="modal-stack">
      <div
        v-for="item in manager.items"
        :key="item.id"
        class="modal-element"
        :style="{ zIndex: item.zIndex }"
      >
        <component
          :is="item.settings.presenterComp ?? ModalPresenter"
          v-bind="getPresenterProps(item)"
        />
      </div>
    </TransitionGroup>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import ModalPresenter from '../../Presenter/ModalPresenter.vue'
import type { Modal } from './Modal'
import type { ModalController } from './ModalController'
import { setModalComponentRef } from './ModalRuntime'

export default defineComponent({
  name: 'ModalLayout',

  components: {
    ModalPresenter,
  },

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

        wrapComp: modal.settings.wrapComp,
        wrapProps: modal.settings.wrapProps ?? {},

        bridgeComp: modal.settings.bridgeComp,
        bridgeProps: modal.settings.bridgeProps ?? {},

        settings: modal.settings.presenterProps ?? {},

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
</style>
