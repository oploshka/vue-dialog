<template>
  <div
    class="dialog-confirm"
    :style="confirmStyle"
  >
    <div class="dialog-confirm__header">
      <strong class="dialog-confirm__title">{{ title }}</strong>
    </div>

    <div class="dialog-confirm__body">
      <div v-if="message" class="dialog-confirm__message">
        {{ message }}
      </div>

      <div v-if="action === 'choice'" class="dialog-confirm__choice">
        <label
          v-for="option in list"
          :key="String(option.id)"
          class="dialog-confirm__option"
        >
          <input
            v-model="inputValue"
            type="radio"
            :name="radioName"
            :value="option.id"
          >
          <span>{{ option.name }}</span>
        </label>
      </div>
    </div>

    <div class="dialog-confirm__footer">
      <button
        class="dialog-confirm__positive"
        type="button"
        :disabled="action === 'choice' && inputValue === null"
        @click="handlePositive"
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
  type tConfirmChoiceItem,
  type tConfirmChoiceValue,
} from './action'

let radioGroupCounter = 0

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
      default: '',
    },
    list: {
      type: Array as PropType<tConfirmChoiceItem[]>,
      default: () => [],
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

  data() {
    return {
      inputValue: null as tConfirmChoiceValue | null,
      radioName: `dialog-confirm-choice-${++radioGroupCounter}`,
    }
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

  methods: {
    handlePositive(): void {
      if (this.action === 'choice') {
        if (this.inputValue === null) return

        this.$emit('positive', {
          action: 'OK',
          inputValue: this.inputValue,
        })
        return
      }

      this.$emit('positive', { action: 'OK' })
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

.dialog-confirm__choice {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.dialog-confirm__option {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
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

.dialog-confirm__positive:disabled {
  cursor: default;
  opacity: 0.5;
}
</style>
