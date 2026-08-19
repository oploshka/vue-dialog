<template>
  <div
    class="notification-item"
    :class="`notification-item--${variant}`"
  >
    <strong
      v-if="title"
      class="notification-item__title"
    >
      {{ title }}
    </strong>

    <div>{{ message }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

type tNotificationVariant = 'info' | 'success' | 'warning' | 'error'

export default defineComponent({
  name: 'NotificationItem',

  props: {
    title: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      required: true,
    },
    variant: {
      type: String as PropType<tNotificationVariant>,
      default: 'info',
    },
  },
})
</script>

<style scoped>
.notification-item {
  box-sizing: border-box;
  min-width: 280px;
  max-width: 380px;
  padding: 12px 16px;
  background: #fff;
  border-left: 4px solid #6c757d;
  border-radius: 4px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.16);
}

.notification-item__title {
  display: block;
  margin-bottom: 4px;
}

.notification-item--success {
  border-left-color: #198754;
}

.notification-item--warning {
  border-left-color: #ffc107;
}

.notification-item--error {
  border-left-color: #dc3545;
}
</style>
