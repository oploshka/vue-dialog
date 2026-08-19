<template>
  <div class="sidebar-left-wrapper">
    <button
      class="sidebar-left-wrapper__close"
      type="button"
      aria-label="Close sidebar"
      @click="close()"
    >
      ×
    </button>

    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { WrapperMixin } from 'vue-dlg'

export default defineComponent({
  name: 'SidebarLeftWrapper',
  mixins: [WrapperMixin],

  props: {
    close: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
})
</script>

<style scoped lang="scss">
.sidebar-left-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
  padding: 35px 0 35px 16px;
  border-radius: 0 8px 8px 0;
  box-shadow: -4px 0 12px rgba(233, 233, 243, 0.4);
  background: #ffffff;
}

.sidebar-left-wrapper__close {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: #6c757d;
  cursor: pointer;
  font: inherit;
  font-size: 24px;
  line-height: 1;
}

.sidebar-left-wrapper__close:hover {
  background: #f3f4f6;
}
</style>
