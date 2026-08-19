<template>
  <div
    class="dialog-prompt"
    :style="promptStyle"
  >
    <div class="dialog-prompt__header">
      <strong class="dialog-prompt__title">{{ title }}</strong>
    </div>

    <div class="dialog-prompt__body">
      <label
        v-if="action === 'text'"
        class="dialog-prompt__text"
      >
        <span v-if="message" class="dialog-prompt__message">{{ message }}</span>
        <input
          v-model="value"
          class="dialog-prompt__input"
          type="text"
          @keydown.enter.prevent="handlePositive"
        >
      </label>

      <div v-else class="dialog-prompt__choice">
        <div v-if="message" class="dialog-prompt__message">
          {{ message }}
        </div>

        <label
          v-for="option in list"
          :key="String(option.id)"
          class="dialog-prompt__option"
        >
          <input
            v-model="value"
            type="radio"
            :name="radioName"
            :value="option.id"
          >
          <span>{{ option.name }}</span>
        </label>
      </div>
    </div>

    <div class="dialog-prompt__footer">
      <button
        class="dialog-prompt__positive"
        type="button"
        :disabled="isSubmitDisabled"
        @click="handlePositive"
      >
        {{ okLabel }}
      </button>

      <button
        class="dialog-prompt__negative"
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
  promptActions,
  type tPromptAction,
  type tPromptChoiceItem,
  type tPromptValue,
} from './action'

let radioGroupCounter = 0

export default defineComponent({
  name: 'DialogPromptItem',

  emits: ['positive', 'negative'],

  props: {
    action: {
      type: String as PropType<tPromptAction>,
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
      type: Array as PropType<tPromptChoiceItem[]>,
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
      value: null as tPromptValue | null,
      radioName: `dialog-prompt-choice-${++radioGroupCounter}`,
    }
  },

  computed: {
    promptStyle(): Record<string, string> {
      const config = promptActions[this.action]
      return {
        '--dialog-prompt-background': config.background,
        '--dialog-prompt-accent': config.accent,
      }
    },

    isSubmitDisabled(): boolean {
      if (this.action === 'text') {
        return typeof this.value !== 'string' || this.value.length === 0
      }

      return this.value === null
    },
  },

  methods: {
    handlePositive(): void {
      if (this.isSubmitDisabled || this.value === null) return

      this.$emit('positive', {
        action: 'OK',
        value: this.value,
      })
    },
  },
})
</script>

<style scoped>
.dialog-prompt {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 75vh;
  color: #50596c;
  background: #fff;
}

.dialog-prompt__header {
  padding: 16px 32px;
  background: var(--dialog-prompt-background);
}

.dialog-prompt__title {
  color: #454d5d;
  font-size: 18px;
  font-weight: 600;
}

.dialog-prompt__body {
  overflow-y: auto;
  padding: 32px;
  font-size: 14px;
  line-height: 1.4;
}

.dialog-prompt__text,
.dialog-prompt__choice {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.dialog-prompt__input {
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding: 8px 12px;
  border: 1px solid #c8ced8;
  border-radius: 4px;
  font: inherit;
}

.dialog-prompt__option {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.dialog-prompt__footer {
  display: flex;
  gap: 16px;
  padding: 16px 32px 24px;
}

.dialog-prompt__positive,
.dialog-prompt__negative {
  flex: 1 1 0;
  min-height: 40px;
  padding: 8px 20px;
  border-radius: 8px;
  cursor: pointer;
  font: inherit;
  font-size: 14px;
  font-weight: 600;
}

.dialog-prompt__positive {
  color: #fff;
  background: var(--dialog-prompt-accent);
  border: 1px solid var(--dialog-prompt-accent);
}

.dialog-prompt__negative {
  color: #50596c;
  background: #fff;
  border: 1px solid #c8ced8;
}

.dialog-prompt__positive:disabled {
  cursor: default;
  opacity: 0.5;
}
</style>
