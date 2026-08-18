<template>
  <component
    :is="component"
    v-bind="componentProps"
    :ref="bindComponentRef"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { modalBridgeProps } from '../Presenter/ModalPresenterContract'

export default defineComponent({
  name: 'DefaultBridge',
  props: modalBridgeProps,
})
</script>
