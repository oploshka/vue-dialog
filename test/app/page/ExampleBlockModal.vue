<template>
  <div>
    <h2>Window</h2>
    <p>Window facade examples</p>

    <ul class="icon-list">
      <li><a href="#" @click.prevent="showModal">Show modal</a></li>
      <li><a href="#" @click.prevent="showFullscreen">Show fullscreen</a></li>
      <li><a href="#" @click.prevent="showSidebarLeft">Show sidebar left</a></li>
      <li><a href="#" @click.prevent="showSidebarRight">Show sidebar right</a></li>
    </ul>
  </div>
</template>

<script>
import ExampleBlockModalAbout from '@app/page/ExampleBlockModalAbout.vue'
import { facadeConfig } from '@example/install/facadeConfig'
import { modalController } from '@example/install/layerConfig'

export default {
  name: 'ExampleBlockModal',

  methods: {
    showModal() {
      const props = { version: 'Modal', companyName: 'Centered window' }

      console.log('modal items before open', modalController.items.length)
      const modal = facadeConfig.Modal.open(ExampleBlockModalAbout, props)
      console.log('modal items after open', modalController.items.length, modal)
    },

    showFullscreen() {
      const props = { version: 'Fullscreen', companyName: 'Fullscreen window' }
      const modal = facadeConfig.Fullscreen.open(ExampleBlockModalAbout, props)
      console.log(modal, props)
    },

    showSidebarLeft() {
      const props = { version: 'SidebarLeft', companyName: 'Left sidebar' }
      const modal = facadeConfig.SidebarLeft.open(ExampleBlockModalAbout, props)
      console.log(modal, props)
    },

    showSidebarRight() {
      const props = { version: 'SidebarRight', companyName: 'Right sidebar' }
      const modal = facadeConfig.SidebarRight.open(ExampleBlockModalAbout, props)
      console.log(modal, props)
    },
  },
}
</script>

<style scoped>
@import 'ExampleBlock.css';
</style>
