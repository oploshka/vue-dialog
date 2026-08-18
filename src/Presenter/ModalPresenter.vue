<template>
  <div class="modal-presenter">
    <div class="modal-overlay" @click="handleBackdrop" />

    <div class="modal-position">
      <component :is="wrapComp ?? 'div'" v-bind="wrapProps">
        <component
          :is="bridgeComp ?? DefaultBridge"
          v-bind="bridgeProps"
          :component="component"
          :component-props="componentProps"
          :close="close"
          :bind-component-ref="bindComponentRef"
        />
      </component>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DefaultBridge from '../Bridge/DefaultBridge.vue'
import { modalPresenterProps } from './ModalPresenterContract'

export default defineComponent({
  name: 'ModalPresenter',

  components: {
    DefaultBridge,
  },

  props: modalPresenterProps,

  methods: {
    handleBackdrop(): void {
      if (this.closeOnBackdrop) {
        this.close()
      }
    },
  },
})
</script>

<style scoped>
.modal-presenter {
  position: fixed;
  inset: 0;
}

.modal-overlay {
  position: absolute;
  inset: 0;
}

.modal-position {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
}
</style>
