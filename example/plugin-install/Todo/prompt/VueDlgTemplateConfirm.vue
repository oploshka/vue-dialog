<template>
  <div class="dlg-template" :class="{ ['dlg-template-' + theme]: !!theme}">
    <div class="dlg-header">
      <h2 class="dlg-title">{{title}}</h2>
    </div>
    <div class="dlg-body" v-if="message || $slots.default" >
      <slot>
        <div class="dlg-content-message">{{message}}</div>
      </slot>
    </div>
    <div class="dlg-footer">
      <a v-if="okLabel"     class="dlg-btn th-btn th-btn-primary" @click="$emit('positive', {action: 'OK'})">{{ okLabel }}</a>
      <a v-if="cancelLabel" class="dlg-btn th-btn th-btn-bordered"  @click="$emit('negative', {action: 'CANCEL'})">{{ cancelLabel }}</a>
    </div>
  </div>
</template>

<script>

// import DialogTemplateMixin from '../DialogTemplateMixin';

export default {
  name: 'VueDlgTemplateConfirmText',
  // mixins: [ DialogTemplateMixin ],
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
    message: {
      type: String,
      default: ''
    },
    okLabel: {
      type: String,
      default: ''
    },
    cancelLabel: {
      type: String,
      default: ''
    },
  }
};
</script>

<style lang="scss" scoped>
.dlg-template {
  display: flex;
  display: -ms-flexbox;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 100%;
  max-height: 75vh;

  //padding: 24px;
  //border-radius: 8px;

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
.dlg-template .dlg-btn[disabled],
.dlg-template .dlg-btn:disabled {
  cursor: default;
  opacity: 0.5;
  pointer-events: none;
}



// Theme
.dlg-template {}

</style>
