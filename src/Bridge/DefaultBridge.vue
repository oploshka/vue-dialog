<template>
  <component
    :is="component"
    v-bind="componentProps"
    :ref="bindComponentRef"
  />
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import type { tProps } from '../Type/Type'

defineProps<{
  component: Component
  componentProps: tProps
  close: () => void
  bindComponentRef: (componentRef: unknown) => void
}>()
</script>
