<template>
  <div class="sidebar-left-wrapper">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { WrapperMixin } from 'vue-dlg'

export default defineComponent({
  name: 'SidebarLeftWrapper',
  mixins: [WrapperMixin],
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
</style>
