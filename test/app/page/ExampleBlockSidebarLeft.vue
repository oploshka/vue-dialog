<template>
  <div>
    <h2>Sidebar Left</h2>
    <p>Navigation sidebar example</p>

    <ul class="icon-list">
      <li><a href="#" @click.prevent="showSidebarLeft">Show navigation menu</a></li>
    </ul>
  </div>
</template>

<script>
import ExampleSidebarLeftMenu from '@app/component/ExampleSidebarLeftMenu.vue'
import { facadeConfig } from '@example/install/facadeConfig'

export default {
  name: 'ExampleBlockSidebarLeft',

  methods: {
    showSidebarLeft() {
      return facadeConfig.SidebarLeft.open(ExampleSidebarLeftMenu)
    },
  },
}
</script>

<style scoped>
@import 'ExampleBlock.css';
</style>
