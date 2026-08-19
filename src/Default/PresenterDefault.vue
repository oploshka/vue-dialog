<template>
  <div class="presenter-default">
    <component
      :is="overlayComp"
      class="presenter-default__overlay"
      v-bind="overlayProps"
      @click="handleBackdrop"
    />

    <component
      :is="wrapComp"
      class="presenter-default__wrapper"
      v-bind="wrapProps"
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PresenterMixin from 'vue-dlg/Mixin/PresenterMixin'

export default defineComponent({
  name: 'PresenterDefault',
  mixins: [PresenterMixin],
})
</script>

<style scoped>
.presenter-default {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
}

.presenter-default__overlay {
  position: absolute;
  inset: 0;
}

.presenter-default__wrapper {
  position: relative;
}
</style>
