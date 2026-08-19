<template>
  <div>
    <h2>Sidebar Right</h2>
    <p>Right sidebar sizes and stacking</p>

    <ul class="icon-list">
      <li><a href="#" @click.prevent="showSidebarRight('small')">Show small sidebar</a></li>
      <li><a href="#" @click.prevent="showSidebarRight('medium')">Show medium sidebar</a></li>
      <li><a href="#" @click.prevent="showSidebarRight('large')">Show large sidebar</a></li>
    </ul>
  </div>
</template>

<script>
import ExampleSidebarRightContent from '@app/component/ExampleSidebarRightContent.vue'
import ExampleModalContent from '@app/component/ExampleModalContent.vue'
import { facadeConfig } from '@example/install/facadeConfig'

const variantBySize = {
  small: 'profile',
  medium: 'settings',
  large: 'activity',
}

export default {
  name: 'ExampleBlockSidebarRight',

  methods: {
    showSidebarRight(size) {
      return facadeConfig.SidebarRight.open(
        ExampleSidebarRightContent,
        {
          size,
          variant: variantBySize[size],
          openSidebar: nextSize => this.showSidebarRight(nextSize),
          openModal: modalSize => this.showModal(modalSize),
          notify: () => facadeConfig.Notification.info(
            'Sidebar right',
            `Notification from ${size} sidebar`,
          ),
        },
        {
          presenterProps: { size },
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
