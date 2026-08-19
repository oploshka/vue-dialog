<template>
  <div class="fullscreen-presenter">
    <component
      :is="overlayComp"
      class="fullscreen-presenter__overlay"
      v-bind="overlayProps"
      @click="handleBackdrop"
    />

    <FullscreenPosition>
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
    </FullscreenPosition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PresenterMixin } from 'vue-dlg'
import FullscreenPosition from '@example/install/Window/Fullscreen/Position.vue'

export default defineComponent({
  name: 'FullscreenPresenter',

  components: {
    FullscreenPosition,
  },

  mixins: [PresenterMixin],
})
</script>

<style scoped>
.fullscreen-presenter {
  position: fixed;
  inset: 0;
}

.fullscreen-presenter__overlay {
  position: absolute;
  inset: 0;
}
</style>
