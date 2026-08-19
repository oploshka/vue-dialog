<template>
  <div
    class="dialog-confirm"
    :style="confirmStyle"
  >
    <div class="dialog-confirm__header">
      <strong class="dialog-confirm__title">{{ title }}</strong>
    </div>

    <div class="dialog-confirm__body">
      {{ message }}
    </div>

    <div class="dialog-confirm__footer">
      <button
        class="dialog-confirm__positive"
        type="button"
        @click="$emit('positive', { action: 'OK' })"
      >
        {{ okLabel }}
      </button>

      <button
        class="dialog-confirm__negative"
        type="button"
        @click="$emit('negative', { action: 'CANCEL' })"
      >
        {{ cancelLabel }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import {
  confirmActions,
  type tConfirmAction,
} from '@example/install/Window/Dialog/Confirm/action'

export default defineComponent({
  name: 'DialogConfirmItem',

  emits: ['positive', 'negative'],

  props: {
    action: {
      type: String as PropType<tConfirmAction>,
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
      default: 'Да',
    },
    cancelLabel: {
      type: String,
      default: 'Отмена',
    },
  },

  computed: {
    confirmStyle(): Record<string, string> {
      const config = confirmActions[this.action]
      return {
        '--dialog-confirm-background': config.background,
        '--dialog-confirm-accent': config.accent,
      }
    },
  },
})
</script>

<style scoped>
.dialog-confirm {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 75vh;
  color: #50596c;
  background: #fff;
}

.dialog-confirm__header {
  padding: 16px 32px;
  background: var(--dialog-confirm-background);
}

.dialog-confirm__title {
  color: #454d5d;
  font-size: 18px;
  font-weight: 600;
}

.dialog-confirm__body {
  overflow-y: auto;
  padding: 32px;
  font-size: 14px;
  line-height: 1.4;
}

.dialog-confirm__footer {
  display: flex;
  gap: 16px;
  padding: 16px 32px 24px;
}

.dialog-confirm__positive,
.dialog-confirm__negative {
  flex: 1 1 0;
  min-height: 40px;
  padding: 8px 20px;
  border-radius: 8px;
  cursor: pointer;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
}

.dialog-confirm__positive {
  color: #fff;
  background: var(--dialog-confirm-accent);
  border: 1px solid var(--dialog-confirm-accent);
}

.dialog-confirm__negative {
  color: #50596c;
  background: #fff;
  border: 1px solid #c8ced8;
}
</style>
