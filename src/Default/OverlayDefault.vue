<template>
  <div class="overlay-default" />
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
  background: rgba(0, 0, 0, 0.45);
}
</style>
