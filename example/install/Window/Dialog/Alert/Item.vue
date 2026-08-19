<template>
  <div
    class="dialog-alert"
    :style="alertStyle"
  >
    <div class="dialog-alert__header">
      <strong class="dialog-alert__title">{{ title }}</strong>

      <button
        v-if="closeBtn"
        class="dialog-alert__close"
        type="button"
        aria-label="Close alert"
        @click="$emit('close', { action: 'CLOSE' })"
      >
        ×
      </button>
    </div>

    <div class="dialog-alert__body">
      {{ message }}
    </div>

    <div class="dialog-alert__footer">
      <button
        class="dialog-alert__positive"
        type="button"
        @click="$emit('positive', { action: 'OK' })"
      >
        {{ okLabel }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import {
  alertVariants,
  type tAlertVariant,
} from '@example/install/Window/Dialog/Alert/variant'

export default defineComponent({
  name: 'DialogAlertItem',

  emits: ['positive', 'close'],

  props: {
    variant: {
      type: String as PropType<tAlertVariant>,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    okLabel: {
      type: String,
      default: 'OK',
    },
    closeBtn: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    alertStyle(): Record<string, string> {
      return {
        '--dialog-alert-accent': alertVariants[this.variant].accent,
      }
    },
  },
})
</script>

<style scoped>
.dialog-alert {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 75vh;
  color: #50596c;
  background: #fff;
}

.dialog-alert__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 16px 16px 32px;
  background: var(--dialog-alert-accent);
}

.dialog-alert__title {
  color: #454d5d;
  font-size: 18px;
  font-weight: 600;
}

.dialog-alert__close {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 24px;
  width: 24px;
  height: 24px;
  padding: 0;
  color: #50596c;
  background: transparent;
  border: 0;
  cursor: pointer;
  font: inherit;
  font-size: 20px;
  line-height: 1;
}

.dialog-alert__body {
  overflow-y: auto;
  padding: 32px 16px 32px 32px;
  color: #50596c;
  font-size: 18px;
  line-height: 1.4;
}

.dialog-alert__footer {
  padding: 16px 16px 16px 32px;
  text-align: center;
}

.dialog-alert__positive {
  min-width: 100px;
  height: 36px;
  padding: 7px 20px;
  color: #fff;
  background: var(--dialog-alert-accent);
  border: 0;
  border-radius: 18px;
  cursor: pointer;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.6;
}
</style>
