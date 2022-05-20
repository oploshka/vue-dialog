<template>
  <div id="app">

    <DialogCore />

    <div class="main-content container">
      <router-view />
    </div>

  </div>
</template>

<script>

import DialogCore from 'vue-dlg/src/DialogCore';
//
import WorkExample from './component/work-example';

export default {
  name: 'App',
  components: {
    DialogCore,
    //
    WorkExample
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