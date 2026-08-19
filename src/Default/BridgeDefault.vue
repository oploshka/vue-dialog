<template>
  <component
    :is="component"
    v-bind="componentProps"
    :ref="bindComponentRef"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BridgeMixin from 'vue-dlg/Mixin/BridgeMixin'

export default defineComponent({
  name: 'BridgeDefault',
  mixins: [BridgeMixin],
})
</script>
