<template>
  <div class="wrapper-default">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import WrapperMixin from '../Mixin/WrapperMixin'

export default defineComponent({
  name: 'WrapperDefault',
  mixins: [WrapperMixin],
})
</script>

<style scoped>
.wrapper-default { background: #fff; }
</style>
