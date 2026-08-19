<template>
  <div>
    <h2>Modal</h2>
    <p>Bootstrap-style modal sizes and stacking</p>

    <ul class="icon-list">
      <li><a href="#" @click.prevent="showModal('small')">Show small modal</a></li>
      <li><a href="#" @click.prevent="showModal('medium')">Show medium modal</a></li>
      <li><a href="#" @click.prevent="showModal('large')">Show large modal</a></li>
    </ul>
  </div>
</template>

<script>
import ExampleModalContent from '@app/component/ExampleModalContent.vue'
import { facadeConfig } from '@example/install/facadeConfig'

export default {
  name: 'ExampleBlockModal',

  methods: {
    showModal(size) {
      return facadeConfig.Modal.open(
        ExampleModalContent,
        {
          size,
          openModal: nextSize => this.showModal(nextSize),
          notify: () => facadeConfig.Notification.info(
            'Modal chain',
            `Notification from ${size} modal`,
          ),
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
