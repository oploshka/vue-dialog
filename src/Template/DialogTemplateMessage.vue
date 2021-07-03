<template>
  <div class="dlg-template">
    <div class="dlg-header">
      <a v-if="closeBtn" class="dlg-btn-close" @click="$emit('close', {})" aria-label="Fechar" ></a>
      <div class="dlg-title" >{{title}}</div>
    </div>
    <div class="dlg-body">
      <div class="content">
        <template v-if="messageType === 'HTML'">
          <div v-html="message"></div>
        </template>
        <template v-else-if="messageType === 'SLOT'">
          <slot/>
        </template>
        <template v-else>
          <div class="dlg-content-message">{{message}}</div>
        </template>
      </div>
    </div>
    <div class="dlg-footer">
      <a v-if="okLabel"     class="dlg-btn success" @click="$emit('close', {})">{{ okLabel }}</a>
      <a v-if="cancelLabel" class="dlg-btn cancel"  @click="$emit('close', {})">{{ cancelLabel }}</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    closeBtn: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      require: true
    },
    messageType: {
      type: String,
      default: 'MESSAGE' // MESSAGE | HTML | SLOT
    },
    message: {
      type: String,
      require: true
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
    padding: 7px 20px!important;
    font-weight: 600!important;
    font-size: 14px!important;
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


</style>
