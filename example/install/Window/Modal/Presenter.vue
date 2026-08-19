<template>
  <div class="modal-presenter">
    <component
      :is="overlayComp"
      class="modal-presenter__overlay"
      v-bind="overlayProps"
      @click="handleBackdrop"
    />

    <ModalPosition>
      <component
        :is="wrapComp"
        v-bind="wrapProps"
        :close="close"
      >
        <component
          :is="bridgeComp"
          v-bind="bridgeProps"
          :component="component"
          :component-props="componentProps"
          :close="close"
          :bind-component-ref="bindComponentRef"
        />
      </component>
    </ModalPosition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PresenterMixin } from 'vue-dlg'
import ModalPosition from '@example/install/Window/Modal/Position.vue'

export default defineComponent({
  name: 'ModalPresenter',

  components: {
    ModalPosition,
  },

  mixins: [PresenterMixin],
})
</script>

<style scoped>
.modal-presenter {
  position: fixed;
  inset: 0;
}

.modal-presenter__overlay {
  position: absolute;
  inset: 0;
}
</style>
