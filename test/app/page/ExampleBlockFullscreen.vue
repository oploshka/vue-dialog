<template>
  <div>
    <h2>Fullscreen</h2>
    <p>Fullscreen window with dashboard content</p>

    <ul class="icon-list">
      <li><a href="#" @click.prevent="showFullscreen">Show fullscreen</a></li>
    </ul>
  </div>
</template>

<script>
import ExampleFullscreenContent from '@app/component/ExampleFullscreenContent.vue'
import { facadeConfig } from '@example/install/facadeConfig'

export default {
  name: 'ExampleBlockFullscreen',

  methods: {
    showFullscreen() {
      return facadeConfig.Fullscreen.open(ExampleFullscreenContent)
    },
  },
}
</script>

<style scoped>
@import 'ExampleBlock.css';
</style>
