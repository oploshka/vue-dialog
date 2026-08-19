<template>
  <div
    class="sidebar-right-position"
    :class="`sidebar-right-position--${size}`"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

type tSidebarRightSize = 'small' | 'medium' | 'large'

export default defineComponent({
  name: 'SidebarRightPosition',

  props: {
    size: {
      type: String as PropType<tSidebarRightSize>,
      default: 'small',
    },
  },
})
</script>

<style scoped lang="scss">
.sidebar-right-position {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
}

.sidebar-right-position--small {
  width: min(90vw, 380px);
}

.sidebar-right-position--medium {
  width: min(90vw, 760px);
}

.sidebar-right-position--large {
  width: min(90vw, 1140px);
}
</style>
