<template>
  <div class="sidebar-right-wrapper">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { WrapperMixin } from 'vue-dlg'

export default defineComponent({
  name: 'SidebarRightWrapper',
  mixins: [WrapperMixin],
})
</script>

<style scoped lang="scss">
.sidebar-right-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
  padding: 35px 16px 35px 0;
  border-radius: 8px 0 0 8px;
  box-shadow: 4px 0 12px rgba(233, 233, 243, 0.4);
}
</style>
