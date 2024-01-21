<template>
  <div :class="mainClass">
    <a v-if="closeBtn" class="dlg-wrapper-btn-close" @click.stop="$emit('close', {action: 'CLOSE'})"></a>
    <slot/>
  </div>
</template>

<script>

// import DialogTemplateMixin from './DialogTemplateMixin';

export default {
  name: 'DlgWrapperDefault',
  // mixins: [ DialogTemplateMixin ],
  props: {
    // тип модального окна
    type:   { type: String, default: '' },
    // настройка темы модального окна
    theme:  { type: String, default: '' },

    // настройки wrapper
    closeBtn: { type: Boolean, default: true },
  },
  computed: {
    mainClass() {
      const theme = this.theme || 'default';
      return [
        'dlg-wrapper',
        'dlg-wrapper-' + theme,
        'wrap-' + theme,
      ];
    }
  }
};
</script>

<style scoped>

.dlg-wrapper {
  overflow: auto;
  width: 100%;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0,0,0,.2);
  border-radius: 0.3rem;

  position: relative;
  min-height: 48px;
}

.dlg-wrapper-btn-close {
  position: absolute;
  right: 16px;
  top: 16px;
  z-index: 1;
  cursor: pointer;
  height: 20px;
  width: 20px;
  line-height: 20px;
  padding: 0;
  float: right;
  color: #50596c;
  text-decoration: none;
}
.dlg-wrapper-btn-close::before {
  content: "\2715";
}
</style>
