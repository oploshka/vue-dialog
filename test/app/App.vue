<template>
  <div id="app">

    <DlgCore />

    <HeaderPart title="VUE DIALOG"/>

    <div class="main-content container" style="padding-top: 80px;">
      <router-view />
    </div>

    <FooterPart/>
  </div>
</template>

<script>

import DlgCore from 'vue-dlg/core/DlgCore.vue';
//
import HeaderPart from './component/HeaderPart.vue';
import FooterPart from './component/FooterPart.vue';
//
export default {
  name: 'App',
  components: {
    DlgCore,
    //
    HeaderPart,
    FooterPart,
  },
};

</script>

<style lang="scss">

</style>