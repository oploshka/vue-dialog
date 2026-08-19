<template>
  <div class="overlay-default" @click="handleClick" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import OverlayMixin from '../Mixin/OverlayMixin'

export default defineComponent({
  name: 'OverlayDefault',
  mixins: [OverlayMixin],
})
</script>

<style scoped>
.overlay-default {
  position: absolute;
  inset: 0;
}
</style>
