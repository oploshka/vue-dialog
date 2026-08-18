<template>
  <div class="dlg-item dlg-item-notify" :class="mainClass">
     <slot/>
  </div>
</template>

<script>

export default {
  name: 'DlgGroupNotifyItem',
  props: {
    // тип модального окна
    type: {type: String, default: ''},
    // настройка темы модального окна
    theme: {type: String, default: ''},
  },
  data() {
    return {show: false};
  },
  computed: {
    mainClass() {
      const theme = this.theme || 'default';
      return ['dlg-item-notify--' + theme];
    }
  },
};
</script>

<style scoped lang="scss">

.dlg-item-notify {
  overflow: hidden;
  overflow-y: auto;
  width: 100%;
  background-color: #ffffff;
  border-radius: 0.3rem;
  position: relative;
  min-height: 48px;
  padding: 0px;
  box-shadow: 4px 4px 8px #cccccc;
}

</style>
