<template>
  <div class="dlg-template" :class="{ ['dlg-template-' + theme]: !!theme }">
    <div class="mdl-header th-px">
      <!--<img svg-inline class="icon-info" src="@img/icon/info.svg" alt="" />-->
      <div>[info]</div>
      <div class="mdl-title">{{ title }}</div>
    </div>
    <div class="mdl-message th-px" v-if="message">{{ message }}</div>
    <div class="btn-group th-px">
      <!-- prettier-ignore -->
      <button class="btn btn--outline" @click.prevent.stop="$emit('close', { action: 'OK' })">{{ okLabel }}</button>
      <!-- prettier-ignore -->
      <button class="btn btn--primary" @click.prevent.stop="$emit('close', { action: 'CANCEL' })">{{ cancelLabel }}</button>
    </div>
  </div>
</template>

<script>
import DialogTemplateMixin from './DialogTemplateMixin';

export default {
  mixins: [DialogTemplateMixin],
  props: {
    theme: {
      type: String,
      default: "",
    },
    closeBtn: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      required: true,
    },
    messageType: {
      type: String,
      default: "MESSAGE", // MESSAGE | HTML | SLOT
    },
    message: {
      type: String,
      required: true,
    },
    okLabel: {
      type: String,
      default: "",
    },
    cancelLabel: {
      type: String,
      default: "",
    },
  },
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
  color: #50596c;

  //&.dlg-fullheight {
  //  max-height: 100vh;
  //}
  .dlg-header {
    color: #454d5d;
    padding: 16px 16px 16px 32px;
    .dlg-title {
      color: #454d5d;
      font-size: 18px;
      font-weight: 500;
    }
    .dlg-btn-close {
      cursor: pointer;
      height: 20px;
      line-height: 20px;
      padding: 0;
      width: 20px;
      float: right;
      color: #50596c;
      text-decoration: none;
      &::before {
        content: "\2715";
      }
    }
  }
  .dlg-body {
    overflow-y: auto;
    padding: 32px 16px 32px 32px;
    position: relative;

    color: #50596c;
    font-size: 18px;
    font-weight: 500;
    //.dlg-input {
    //  display: block;
    //  width: 100%;
    //}
    //.prompt-error-message {
    //  color: #d9534f;
    //  font-size: 14px;
    //}
  }
  .dlg-footer {
    padding: 16px 16px 16px 32px;
    text-align: center;
  }
  .dlg-btn {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    //background: transparent;
    border: none;
    //color: #5cb85c;
    cursor: pointer;
    display: inline-block;
    outline: none;
    text-align: center;
    text-decoration: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;
    min-width: 100px;
    height: 36px;
    box-sizing: border-box;
    padding: 7px 20px !important;
    font-weight: 600 !important;
    font-size: 14px !important;
    line-height: 1.6;
    border-radius: 18px;

    color: #fff;
    background-color: #f5ac1c;
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
.dlg-template {
  max-height: 75vh;
  background: #fff;
  //box-shadow: 0 4px 10px rgba(69,77,93,0.3);
  border-radius: 5px;
  overflow: hidden;
  //border-left: 5px solid var(--dlg-success-color, #f5ac1c) !important;

  // success
  &.dlg-template-success {
    .dlg-header {
      //background: #dc472e;
      background: #5cd182;
    }
  }

  // warning
  &.dlg-template-warning {
    .dlg-header {
      background: #f5ac1c;
    }
  }

  // error
  &.dlg-template-error {
    .dlg-header {
      //background: #dc472e;
      background: #ffb3b3;
    }
  }
}

.icon-info {
  fill: var(--color-red-03);
  margin-right: 12px;
}

.mdl-header {
  margin-bottom: 24px;
  display: flex;
  align-items: center;
}

.mdl-title {
  font-weight: 600;
  font-size: 1rem;
  color: var(--color-gray-08);
}

.mdl-message {
  margin-bottom: 24px;
}
</style>
