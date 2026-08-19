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
      @mouseenter="item.pause()"
      @mouseleave="item.resume()"
    >
      <NotificationWrapper :variant="getVariant(item)">
        <component
          :is="item.component"
          v-bind="item.props"
          @close="item.close()"
        />
      </NotificationWrapper>
    </div>
  </TransitionGroup>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { Notification, NotificationController } from 'vue-dlg'
import NotificationWrapper from '@example/install/Window/Notification/Wrapper.vue'
import {
  isNotificationVariant,
  type tNotificationVariant,
} from '@example/install/Window/Notification/variant'

export default defineComponent({
  name: 'NotificationLayout',

  components: {
    NotificationWrapper,
  },

  props: {
    manager: {
      type: Object as PropType<NotificationController>,
      required: true,
    },
  },

  methods: {
    getVariant(item: Notification): tNotificationVariant {
      const variant = item.props.variant
      return isNotificationVariant(variant) ? variant : 'info'
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
  transform-origin: center;
}

.notification-element:last-child {
  margin-bottom: 0;
}

.notification-enter-active {
  transition:
    opacity 0.22s ease,
    transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}

.notification-leave-active {
  position: absolute;
  left: 0;
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: scale(0.82);
}

.notification-leave-to {
  opacity: 0;
  transform: scale(0.92);
}

.notification-move {
  transition: transform 0.22s ease;
}

@media (prefers-reduced-motion: reduce) {
  .notification-enter-active,
  .notification-leave-active,
  .notification-move {
    transition: none;
  }
}
</style>
