<template>
  <div class="dlg-group--default">
    <template v-if="modalList.length">
      <div class="dlg-overlay" @click="overlayClick" />

      <template v-for="modal in modalList" :key="modal.getId()">
        <div class="dlg-item" :class="'dlg-item__' + modal.getTheme()" >
          <component :is="modal.getVueComponent()"  v-bind="modal.getVueComponentProps()"/>
        </div>
      </template>
    </template>
  </div>
</template>

<script>

export default {
  name: 'DlgGroupDefault',
  props: {
    modalList: { type: Array, default: () => [], },
  },
  methods: {
    overlayClick() {

    },
  }
};
</script>

<style scoped lang="scss">

.dlg-group--default {
  position: fixed;
  top: 0;
  left: 0;
  //right: 0;
  width: 100%;
  
  bottom: 0;
  z-index: 400;
  overflow: unset;
  opacity: 1;
  display: flex;
  display: -ms-flexbox;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .dlg-overlay-gray {
    background: rgba(0, 0, 0, 0.5);
    cursor: default;
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2000;
  }
}

.dlg-group--default:empty{
  width: 0;
}

</style>