<template>
  <div>
    <h2>Sidebar Right</h2>
    <p>Right sidebar sizes</p>

    <ul class="icon-list">
      <li><a href="#" @click.prevent="showSidebarRight('small', 'profile')">Show small sidebar</a></li>
      <li><a href="#" @click.prevent="showSidebarRight('medium', 'settings')">Show medium sidebar</a></li>
      <li><a href="#" @click.prevent="showSidebarRight('large', 'activity')">Show large sidebar</a></li>
    </ul>
  </div>
</template>

<script>
import ExampleSidebarRightContent from '@app/component/ExampleSidebarRightContent.vue'
import { facadeConfig } from '@example/install/facadeConfig'

export default {
  name: 'ExampleBlockSidebarRight',

  methods: {
    showSidebarRight(size, variant) {
      return facadeConfig.SidebarRight.open(
        ExampleSidebarRightContent,
        { variant },
        {
          presenterProps: { size },
        },
      )
    },
  },
}
</script>

<style scoped>
@import 'ExampleBlock.css';
</style>
