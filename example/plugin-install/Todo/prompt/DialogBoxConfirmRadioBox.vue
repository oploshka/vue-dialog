<template>
  <div class="dlg-template" :class="{ ['dlg-template-' + theme]: !!theme }">
    <div class="dlg-header">
      <h2 class="dlg-title">{{ title }}</h2>
    </div>
    <div class="dlg-body">
      <!--<template v-for="({ name, id }, i) in list" :key="i">-->
      <!--  <FveRadioButton :label="name" :value="id" v-model="inputValue" />-->
      <!--</template>-->
    </div>

    <div class="dlg-footer">
      <a v-if="okLabel" class="dlg-btn th-btn th-btn-primary"
        @click="$emit('positive', { action: 'OK', inputValue: inputValue })"
         :disabled="!inputValue"
        >{{ okLabel }}</a>
      <a v-if="cancelLabel" class="dlg-btn th-btn th-btn-bordered" @click="$emit('close', { action: 'CANCEL' })">{{
        cancelLabel }}</a>
    </div>
  </div>
</template>

<script>

// import DialogTemplateMixin from './DialogTemplateMixin';

// import FveRadioButton from '@field/RadioButton/FveRadioButton';


export default {
  name: 'DialogBoxConfirmRadioBox',
  // mixins: [DialogTemplateMixin],
  props: {
    theme: {
      type: String,
      default: ''
    },
    // closeBtn: {
    //   type: Boolean,
    //   default: true
    // },
    title: {
      type: String,
      required: true
    },
    // messageType: {
    //   type: String,
    //   default: 'MESSAGE'
    // },
    // message: {
    //   type: String,
    //   default: ''
    // },
    okLabel: {
      type: String,
      default: ''
    },
    cancelLabel: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  components: {
    // FveRadioButton
  },
  data() {
    return {
      inputValue: null
    };
  }
};
</script>

<style lang="scss" scoped>
.dlg-template {
  //background: #fff;
  display: flex;
  display: -ms-flexbox;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 100%;

  padding: 24px;
  border-radius: 8px;
  gap: 16px;
  //color: #50596c;

  //&.dlg-fullheight {
  //  max-height: 100vh;
  //}
  .dlg-header {

    .dlg-title {
      font-family: 'Rubik', serif;
      color: var(--color-black);
      font-size: 22px;
      font-weight: 500;
      line-height: 28.6px;
    }

    //.dlg-btn-close {
    //  cursor: pointer;
    //  height: 20px;
    //  line-height: 20px;
    //  padding: 0;
    //  width: 20px;
    //  float: right;
    //  color: #50596c;
    //  text-decoration: none;
    //  &::before {
    //    content: "\2715";
    //  }
    //}
  }

  .dlg-body {
    overflow-y: auto;
    //padding: 32px 16px 32px 32px;
    position: relative;
    //.dlg-input {
    //  display: block;
    //  width: 100%;
    //}
    //.prompt-error-message {
    //  color: #d9534f;
    //  font-size: 14px;
    //}

    .dlg-content-message {
      font-family: 'Inter', serif;
      color: var(--color-black);
      font-size: 14px;
      font-weight: 400;
      line-height: 19.6px;
    }
  }

  .dlg-footer {
    display: flex;
    flex-direction: row;
    gap: 16px;
    //padding: 16px 16px 16px 32px;
    //text-align: center;
  }

  .dlg-btn {
    //-webkit-appearance: none;
    //-moz-appearance: none;
    //appearance: none;
    ////background: transparent;
    ////color: #5cb85c;
    //cursor: pointer;
    //display: flex;
    //text-align: center;
    //text-decoration: none;
    //-webkit-user-select: none;
    //-moz-user-select: none;
    //-ms-user-select: none;
    //user-select: none;
    //vertical-align: middle;
    //white-space: nowrap;
    //min-width: 50px;
    //height: 40px;
    //box-sizing: border-box;
    //
    //padding: 8px 20px;
    //font-family: 'Inter', serif;
    //font-weight: 600;
    //font-size: 14px;
    //line-height: 24px;
    //border-radius: 8px;

    //justify-content: center;
    //align-items: center;
    flex: 0 1 100%;

    //color: #fff;
    //background-color: #f5ac1c;
    //&.dlg-btn-danger {
    //  color: #d9534f;
    //}
  }
}

.dlg-template .dlg-btn.disabled,
.dlg-template .dlg-btn[disabled="true"],
.dlg-template .dlg-btn:disabled {
  cursor: default;
  opacity: 0.5;
  pointer-events: none;
}



// Theme
.dlg-template {
  max-height: 75vh;
  background: var(--color-white);
  //box-shadow: 0 4px 10px rgba(69,77,93,0.3);
  //border-radius: 5px;
  overflow: hidden;
  //border-left: 5px solid var(--dlg-success-color, #f5ac1c) !important;

  // success
  //&.dlg-template-success{
  //  .dlg-header {
  //    //background: #dc472e;
  //    background: #5cd182;
  //  }
  //
  //  .dlg-btn.success {
  //
  //  }
  //}

  // warning
  //&.dlg-template-warning{
  //  .dlg-header {
  //    background: #f5ac1c;
  //  }
  //}

  // error
  //&.dlg-template-error{
  //  .dlg-header {
  //    //background: #dc472e;
  //    background: #ffb3b3;
  //  }
  //}
}
</style>
