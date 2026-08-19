<template>
  <TransitionGroup
    tag="div"
    name="notification"
    class="notification-layout"
    :style="{ zIndex: manager.zIndex }"
  >
    <div
      v-for="item in manager.items"
      :key="item.id"
      class="notification-element"
    >
      <component
        :is="item.component"
        v-bind="item.props"
      />
    </div>
  </TransitionGroup>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { NotificationController } from 'vue-dlg'

export default defineComponent({
  name: 'NotificationLayout',

  props: {
    manager: {
      type: Object as PropType<NotificationController>,
      required: true,
    },
  },
})
</script>

<style scoped>
.notification-layout {
  position: fixed;
  top: 16px;
  right: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.notification-enter-active,
.notification-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateX(24px);
}
</style>
