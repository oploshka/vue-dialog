<template>
  <div
    class="notification-item"
    :class="`notification-item--${variant}`"
  >
    <div class="notification-item__header">
      <div class="notification-item__title-row">
        <span class="notification-item__icon" aria-hidden="true">
          {{ variant === 'success' ? '✓' : '!' }}
        </span>

        <strong
          v-if="title"
          class="notification-item__title"
        >
          {{ title }}
        </strong>
      </div>

      <button
        class="notification-item__close"
        type="button"
        aria-label="Close notification"
        @click="$emit('close')"
      >
        ×
      </button>
    </div>

    <div class="notification-item__message">
      {{ message }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

type tNotificationVariant = 'info' | 'success' | 'warning' | 'error'

export default defineComponent({
  name: 'NotificationItem',

  emits: ['close'],

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
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  padding: 24px;
  gap: 8px;
  color: #181a35;
  background: #eef6ff;
  border-left: 5px solid #187fe7;
  font-size: 12px;
  text-align: left;
}

.notification-item__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.notification-item__title-row {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.notification-item__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 18px;
  width: 18px;
  height: 18px;
  border: 1.5px solid currentColor;
  border-radius: 50%;
  color: #187fe7;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
}

.notification-item__title {
  min-width: 0;
  font-size: 16px;
  font-weight: 600;
}

.notification-item__close {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 24px;
  width: 24px;
  height: 24px;
  padding: 0;
  color: inherit;
  background: transparent;
  border: 0;
  cursor: pointer;
  font: inherit;
  font-size: 20px;
  line-height: 1;
}

.notification-item__message {
  font-size: 14px;
}

.notification-item--success {
  background: #eefff4;
  border-left-color: #2d9d5b;
}

.notification-item--success .notification-item__icon {
  color: #2d9d5b;
}

.notification-item--warning {
  background: #fff8e6;
  border-left-color: #d99a00;
}

.notification-item--warning .notification-item__icon {
  color: #d99a00;
}

.notification-item--error {
  background: #fff3f3;
  border-left-color: #d64545;
}

.notification-item--error .notification-item__icon {
  color: #d64545;
}
</style>
