<template>
  <div class="dlg-template dlg-template-simple-message dtsm" :class="{ ['dlg-template-' + theme]: !!theme}" @click="$emit('close', {action: 'CLOSE'})">
    <div class="dtsm-title">{{title}}</div>
    <div class="dtsm-message">{{message}}</div>
  </div>
</template>

<script>

import DialogTemplateMixin from "./DialogTemplateMixin";

export default {
  mixins: [ DialogTemplateMixin ],
  props: {
    theme: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      require: true
    },
    message: {
      type: String,
      require: true
    },
  },
  mounted() {
    // TODO: update timer logic
    setTimeout(() => {
      this.close({action: 'CLOSE'});
    }, 3000)
  }
};
</script>

<style lang="scss" scoped>
.dtsm {
  display: block;
  box-sizing: border-box;
  text-align: left;
  font-size: 12px;
  padding: 10px;
  //margin: 0 5px 5px;
  color: white;
  background: #44A4FC;
  border-left: 5px solid #187FE7;
  
  .dtsm-title {
    font-weight: 600;
  }
  .dtsm-message {
  }
}

</style>
