<template>
  <div>
    <h2>Modal</h2>
    <p>Modal example</p>
    <ul class="icon-list">
      <li><a href="#" @click.stop="showModal">Show modal</a></li>
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
      const props = reactive({ version: '213' })
      const modal = this.$dialog.Modal.open(ExampleBlockModalAbout, props)
      console.log(modal, props)
    },
  },
}
</script>

<style scoped>
@import 'ExampleBlock.css';
</style>
