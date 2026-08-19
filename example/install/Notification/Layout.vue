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
        @close="item.close()"
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
  right: 10px;
  bottom: 10px;
  width: 320px;
  filter:
    drop-shadow(0 -18px 45px rgba(0, 0, 0, 0.03))
    drop-shadow(0 4px 8px rgba(28, 41, 61, 0.1));
}

.notification-element {
  width: 100%;
  margin-bottom: 10px;
  overflow: hidden;
}

.notification-element:last-child {
  margin-bottom: 0;
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
