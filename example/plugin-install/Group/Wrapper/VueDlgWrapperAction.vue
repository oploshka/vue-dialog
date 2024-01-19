<template>
  <div class="dlg-wrapper" :class="mainClass">
    <slot/>
  </div>
</template>

<script>

// import DialogTemplateMixin from './DialogTemplateMixin';

export default {
  name: 'VueDlgWrapperAction',
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
  //background-color: var(--color-gray-01);
  background-color: #ffffff;
  //background: #fff;
  //background-clip: padding-box;
  //border: 1px solid rgba(0,0,0,.2);
  border-radius: 0.3rem;

  position: relative;
  min-height: 48px;

  padding: 0px;
  // height: -webkit-fill-available;

  box-shadow: 4px 4px 8px #cccccc;
  border: 1px solid #f8f8fa;

}

</style>
