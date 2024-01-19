<template>
  <div class="dlg-wrapper" :class="mainClass">
    <slot/>
  </div>
</template>

<script>

// import DialogTemplateMixin from './DialogTemplateMixin';

export default {
  name: 'VueDlgWrapperNotify',
  // mixins: [ DialogTemplateMixin ],
  props: {
    // тип модального окна
    type:   { type: String, default: '' },
    // настройка темы модального окна
    theme:  { type: String, default: '' },
  },
  computed: {
    mainClass() {
      const theme = this.theme || 'default';
      return [ 'dlg-wrapper-' + theme];
    }
  }
};
</script>

<style scoped lang="scss">

.dlg-wrapper {
  overflow: hidden;
  overflow-y: auto;
  width: 100%;
}

</style>
