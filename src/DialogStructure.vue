<template>
  <div class="dlg" :class="{active: show, [`dlg-${settings.theme}`]: settings.theme}">
    <div class="dlg-overlay" @click="onClose(settings.close)"></div>
    <div class="dlg-container">
      <component :is="componentVue" v-bind="componentVueData" @close="onClose"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // системные переменные
    show: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      required: true
    },
    // пользовательские
    componentVue: {
      type: Object,
      required: true
    },
    componentVueData: {
      type: Object,
      required: true
    },
    //
    settings: {
      type: Object,
      required: true
    },
  },
  methods: {
    onClose(response) {
      this.$emit('close', this.item, response);
    },
  }
};
</script>

<style>
/* *
:root {
  --dlg-overlay: rgba(23, 104, 177, 0.75);
  --dlg-success-color: #5cd182;
  --dlg-warning-color: #f5ac1c;
  --dlg-error-color: #dc472e;
}
/* */
</style>

<style lang="scss" scoped>

.dlg {
  align-items: center;
  display: none;
  -ms-flex-align: center;
  -ms-flex-pack: center;
  justify-content: center;
  opacity: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  .dlg-container {
    max-width: 700px;
    width: 100%;
    padding: 0 25px;
  }

}
.dlg:target,
.dlg.active {
  display: flex;
  display: -ms-flexbox;
  opacity: 1;
  z-index: 400;
}
.dlg:target .dlg-overlay,
.dlg.active .dlg-overlay {
  background: var(--dlg-overlay, rgba(0,0,0,0.5));
  bottom: 0;
  cursor: default;
  display: block;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}
.dlg:target .dlg-container,
.dlg.active .dlg-container {
  animation: slide-down 0.2s ease 1;
  z-index: 1;
}
.dlg-container {
  display: flex;
  display: -ms-flexbox;
  -ms-flex-direction: column;
  flex-direction: column;
  max-height: 75vh;
  max-width: 640px;
  width: 100%;
  box-shadow: 0 4px 30px 2px rgb(0 0 0 / 1%);
}

// TODO: fix theme
.dlg {
  .dlg-container::v-deep > div {
    max-height: 75vh;
    background: #fff;
    //box-shadow: 0 4px 10px rgba(69,77,93,0.3);
    border-radius: 5px;
    overflow: hidden;
    //border-left: 5px solid var(--dlg-success-color, #f5ac1c) !important;
  }

  // success
  &.dlg-success{
    .dlg-container::v-deep > div {
      //border-left: 5px solid var(--dlg-success-color, #5cd182) !important;
    }
    ::v-deep .dlg-header {
      //background: #dc472e;
      background: #5cd182;
    }
  }

  // warning
  &.dlg-warning{
    .dlg-container::v-deep > div {
      //border-left: 5px solid var(--dlg-warning-color, #f5ac1c) !important;
    }
    ::v-deep .dlg-header {
      background: #f5ac1c;
    }
  }

  // error
  &.dlg-error{
    .dlg-container::v-deep > div {
      //border-left: 5px solid var(--dlg-error-color, #dc472e) !important;
    }
    ::v-deep .dlg-header {
      //background: #dc472e;
      background: #ffb3b3;
    }
  }
}
</style>
