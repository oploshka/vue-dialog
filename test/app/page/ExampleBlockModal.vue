<template>
  <div>
    <h2>Modal</h2>
    <p>Centered modal sizes</p>

    <ul class="icon-list">
      <li><a href="#" @click.prevent="showModal('small')">Show small modal</a></li>
      <li><a href="#" @click.prevent="showModal('medium')">Show medium modal</a></li>
      <li><a href="#" @click.prevent="showModal('large')">Show large modal</a></li>
    </ul>
  </div>
</template>

<script>
import ExampleBlockModalAbout from '@app/page/ExampleBlockModalAbout.vue'
import { facadeConfig } from '@example/install/facadeConfig'

export default {
  name: 'ExampleBlockModal',

  methods: {
    showModal(size) {
      return facadeConfig.Modal.open(
        ExampleBlockModalAbout,
        {
          version: `Modal ${size}`,
          companyName: `${size} centered window`,
        },
        {
          wrapProps: { size },
        },
      )
    },
  },
}
</script>

<style scoped>
@import 'ExampleBlock.css';
</style>
