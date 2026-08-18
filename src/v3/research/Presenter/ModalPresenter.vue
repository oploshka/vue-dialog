<template>
  <div class="modal-presenter">
    <div class="modal-overlay" @click="handleBackdrop" />

    <div class="modal-position">
      <component :is="wrapComp ?? 'div'" v-bind="wrapProps">
        <component
          :is="bridgeComp ?? DefaultBridge"
          v-bind="bridgeProps"
          :component="component"
          :component-props="componentProps"
          :close="close"
          :bind-component-ref="bindComponentRef"
        />
      </component>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import DefaultBridge from '../Bridge/DefaultBridge.vue'
import type { tProps } from '../Type/Type'

const props = withDefaults(defineProps<{
  component: Component
  componentProps?: tProps

  wrapComp?: Component
  wrapProps?: tProps

  bridgeComp?: Component
  bridgeProps?: tProps

  settings?: tProps

  close: () => void
  closeOnBackdrop?: boolean
  bindComponentRef: (componentRef: unknown) => void
}>(), {
  componentProps: () => ({}),
  wrapProps: () => ({}),
  bridgeProps: () => ({}),
  settings: () => ({}),
})

function handleBackdrop(): void {
  if (props.closeOnBackdrop !== false) {
    props.close()
  }
}
</script>

<style scoped>
.modal-presenter {
  position: fixed;
  inset: 0;
}

.modal-overlay {
  position: absolute;
  inset: 0;
}

.modal-position {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
}
</style>
