<template>
  <div>
    <h2>Sidebar Left</h2>
    <p>Navigation sidebar with chained actions</p>

    <ul class="icon-list">
      <li><a href="#" @click.prevent="showSidebarLeft">Show navigation menu</a></li>
    </ul>
  </div>
</template>

<script>
import ExampleSidebarLeftMenu from '@app/component/ExampleSidebarLeftMenu.vue'
import ExampleModalContent from '@app/component/ExampleModalContent.vue'
import { facadeConfig } from '@example/install/facadeConfig'

export default {
  name: 'ExampleBlockSidebarLeft',

  methods: {
    showSidebarLeft() {
      return facadeConfig.SidebarLeft.open(
        ExampleSidebarLeftMenu,
        {
          showNotification: () => facadeConfig.Notification.info(
            'Sidebar left',
            'Notification opened from the navigation menu',
          ),
          openModal: size => this.showModal(size),
        },
      )
    },

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
