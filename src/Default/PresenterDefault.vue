<template>
  <div class="presenter-default">
    <OverlayDefault
      :close="close"
      :close-on-click="closeOnBackdrop"
    />

    <component
      :is="wrapComp ?? WrapperDefault"
      class="presenter-default__wrapper"
      v-bind="wrapProps"
    >
      <component
        :is="bridgeComp ?? BridgeDefault"
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
import PresenterMixin from '../Mixin/PresenterMixin'
import OverlayDefault from './OverlayDefault.vue'
import WrapperDefault from './WrapperDefault.vue'
import BridgeDefault from './BridgeDefault.vue'

export default defineComponent({
  name: 'PresenterDefault',

  components: {
    OverlayDefault,
    WrapperDefault,
    BridgeDefault,
  },

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

.presenter-default__wrapper {
  position: relative;
}
</style>
