<template>
  <div class="sidebar-left-presenter">
    <component
      :is="overlayComp"
      class="sidebar-left-presenter__overlay"
      v-bind="overlayProps"
      @click="handleBackdrop"
    />

    <SidebarLeftPosition>
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
    </SidebarLeftPosition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PresenterMixin } from 'vue-dlg'
import SidebarLeftPosition from '@example/install/Window/SidebarLeft/Position.vue'

export default defineComponent({
  name: 'SidebarLeftPresenter',

  components: {
    SidebarLeftPosition,
  },

  mixins: [PresenterMixin],
})
</script>

<style scoped>
.sidebar-left-presenter {
  position: fixed;
  inset: 0;
}

.sidebar-left-presenter__overlay {
  position: absolute;
  inset: 0;
}
</style>
