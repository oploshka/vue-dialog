<template>
  <div class="sidebar-right-presenter">
    <component
      :is="overlayComp"
      class="sidebar-right-presenter__overlay"
      v-bind="overlayProps"
      @click="handleBackdrop"
    />

    <SidebarRightPosition>
      <component
        :is="wrapComp"
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
    </SidebarRightPosition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PresenterMixin } from 'vue-dlg'
import SidebarRightPosition from './Position.vue'

export default defineComponent({
  name: 'SidebarRightPresenter',

  components: {
    SidebarRightPosition,
  },

  mixins: [PresenterMixin],
})
</script>

<style scoped>
.sidebar-right-presenter {
  position: fixed;
  inset: 0;
}

.sidebar-right-presenter__overlay {
  position: absolute;
  inset: 0;
}
</style>
