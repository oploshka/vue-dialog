<template>
  <div>
    <h2>Fullscreen</h2>
    <p>Fullscreen window example</p>

    <ul class="icon-list">
      <li><a href="#" @click.prevent="showFullscreen">Show fullscreen</a></li>
    </ul>
  </div>
</template>

<script>
import ExampleBlockModalAbout from '@app/page/ExampleBlockModalAbout.vue'
import { facadeConfig } from '@example/install/facadeConfig'

export default {
  name: 'ExampleBlockFullscreen',

  methods: {
    showFullscreen() {
      return facadeConfig.Fullscreen.open(ExampleBlockModalAbout, {
        version: 'Fullscreen',
        companyName: 'Fullscreen window',
      })
    },
  },
}
</script>

<style scoped>
@import 'ExampleBlock.css';
</style>
