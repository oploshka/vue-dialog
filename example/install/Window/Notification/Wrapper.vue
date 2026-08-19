<template>
  <div
    class="notification-wrapper"
    :class="`notification-wrapper--${variant}`"
    :style="wrapperStyle"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import {
  notificationVariants,
  type tNotificationVariant,
} from '@example/install/Window/Notification/variant'

export default defineComponent({
  name: 'NotificationWrapper',

  props: {
    variant: {
      type: String as PropType<tNotificationVariant>,
      default: 'info',
    },
  },

  computed: {
    wrapperStyle(): Record<string, string> {
      const config = notificationVariants[this.variant]

      return {
        '--notification-background': config.background,
        '--notification-border': config.border,
        '--notification-color': config.text,
        '--notification-accent': config.border,
      }
    },
  },
})
</script>

<style scoped>
.notification-wrapper {
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  color: var(--notification-color);
  background: var(--notification-background);
  border-left: 5px solid var(--notification-border);
  border-radius: 8px;
}
</style>
