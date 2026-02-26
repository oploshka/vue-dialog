<template>
  <div class="dlg-wrapper" :class="mainClass">
    <slot/>
  </div>
</template>

<script>

// import DialogTemplateMixin from './DialogTemplateMixin';

export default {
  name: 'DlgGroupModalItem',
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
  background: #fff;
  border-radius: 0.3rem;
  border: 1px solid #f8f8fa;

  position: relative;
  min-height: 48px;

  padding: 25px;

  box-shadow: 4px 4px 8px #cccccc;

}

</style>
