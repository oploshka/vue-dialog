<template>
  <div id="app">

    <DialogCore />

    <HeaderPart title="VUE DIALOG"/>

    <div class="main-content container">
      <router-view />
    </div>

    <FooterPart/>
  </div>
</template>

<script>

import DialogCore from 'vue-dlg/src/DialogCore';
//
import HeaderPart from '@/component/Part/HeaderPart';
import FooterPart from '@/component/Part/FooterPart';
//
export default {
  name: 'App',
  components: {
    DialogCore,
    //
    HeaderPart,
    FooterPart,
  },
};

</script>

<style lang="scss">
html, body, #app {
  height: 100%;
  width: 100%;
}
.main-content {
  min-height: 100%;
  min-height: calc(100% - 80px);
  padding: 100px 0 50px 0;
}
</style>