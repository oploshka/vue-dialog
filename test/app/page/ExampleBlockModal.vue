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
import { reactive } from 'vue'
import ExampleBlockModalAbout from '@app/page/ExampleBlockModalAbout.vue'

export default {
  name: 'ExampleBlockModal',

  methods: {
    showModal() {
      const props = reactive({ version: 'Modal', companyName: 'Centered window' })
      const modal = this.$dialog.Modal.open(ExampleBlockModalAbout, props)
      console.log(modal, props)
    },

    showFullscreen() {
      const props = reactive({ version: 'Fullscreen', companyName: 'Fullscreen window' })
      const modal = this.$dialog.Fullscreen.open(ExampleBlockModalAbout, props)
      console.log(modal, props)
    },

    showSidebarLeft() {
      const props = reactive({ version: 'SidebarLeft', companyName: 'Left sidebar' })
      const modal = this.$dialog.SidebarLeft.open(ExampleBlockModalAbout, props)
      console.log(modal, props)
    },

    showSidebarRight() {
      const props = reactive({ version: 'SidebarRight', companyName: 'Right sidebar' })
      const modal = this.$dialog.SidebarRight.open(ExampleBlockModalAbout, props)
      console.log(modal, props)
    },
  },
}
</script>

<style scoped>
@import 'ExampleBlock.css';
</style>
