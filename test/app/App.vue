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
import HeaderPart from '@app/component/HeaderPart.vue'
import FooterPart from '@app/component/FooterPart.vue'
import { LayerHost } from 'vue-dlg'
import { layerConfig } from '@example/install/layerConfig'

export default {
  name: 'App',

  components: {
    LayerHost,
    HeaderPart,
    FooterPart,
  },

  computed: {
    dialogLayers() {
      return layerConfig
    },
  },
}
</script>

<style lang="scss">
</style>
