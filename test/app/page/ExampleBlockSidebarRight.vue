<template>
  <div>
    <h2>Sidebar Right</h2>
    <p>Right sidebar content variants</p>

    <ul class="icon-list">
      <li><a href="#" @click.prevent="showSidebarRight('profile')">Show profile sidebar</a></li>
      <li><a href="#" @click.prevent="showSidebarRight('settings')">Show settings sidebar</a></li>
      <li><a href="#" @click.prevent="showSidebarRight('activity')">Show activity sidebar</a></li>
    </ul>
  </div>
</template>

<script>
import ExampleSidebarRightContent from '@app/component/ExampleSidebarRightContent.vue'
import { facadeConfig } from '@example/install/facadeConfig'

export default {
  name: 'ExampleBlockSidebarRight',

  methods: {
    showSidebarRight(variant) {
      return facadeConfig.SidebarRight.open(ExampleSidebarRightContent, { variant })
    },
  },
}
</script>

<style scoped>
@import 'ExampleBlock.css';
</style>
