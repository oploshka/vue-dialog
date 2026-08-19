<template>
  <div id="app">
    <LayerHost :layers="dialogLayers" />

    <HeaderPart title="VUE DIALOG" />

    <div class="main-content container" style="padding-top: 80px;">
      <router-view />
    </div>

    <FooterPart />
  </div>
</template>

<script>
import { LayerHost } from 'vue-dlg'
import { layerEntries } from '@example/install/index'
import HeaderPart from './component/HeaderPart.vue'
import FooterPart from './component/FooterPart.vue'

export default {
  name: 'App',

  components: {
    LayerHost,
    HeaderPart,
    FooterPart,
  },

  computed: {
    dialogLayers() {
      return layerEntries
    },
  },
}
</script>

<style lang="scss">
</style>
