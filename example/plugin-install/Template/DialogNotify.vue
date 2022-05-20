<template>
  <div class="dlg-template dlg-template-simple-message dtsm" :class="{ ['dlg-template-' + theme]: !!theme}" @click="$emit('close', {action: 'CLOSE'})">
    <div class="dtsm-title">{{title}}</div>
    <div class="dtsm-message">{{message}}</div>
  </div>
</template>

<script>

import DialogTemplateMixin from './DialogTemplateMixin';

export default {
  mixins: [ DialogTemplateMixin ],
  props: {
    theme: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
  },
  mounted() {
    // TODO: update timer logic
    setTimeout(() => {
      this.close({action: 'CLOSE'});
    }, 3000);
  }
};
</script>

<style scoped>
.dtsm {
  display: block;
  box-sizing: border-box;
  text-align: left;
  font-size: 12px;
  padding: 10px;
  color: white;
  background: #44a4fc;
  border-left: 5px solid #187fe7;
}
.dtsm .dtsm-title {
  font-weight: 600;
}
</style>
