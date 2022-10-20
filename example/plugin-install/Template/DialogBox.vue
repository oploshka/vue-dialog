<template>
  <div class="dialog-card" :class="{ ['dialog-card-' + theme]: !!theme}">
    <div class="dialog-card-header">
      <div class="dialog-card-title" >{{title}}</div>
    </div>
    <div class="dialog-card-body">
      <div class="content">
        <template v-if="messageType === 'HTML'">
          <div v-html="message"></div>
        </template>
        <template v-else-if="messageType === 'SLOT'">
          <slot/>
        </template>
        <template v-else>
          <div class="dialog-card-content-message">{{message}}</div>
        </template>
      </div>
    </div>
    <div class="dialog-card-footer">
      <a v-if="okLabel"     class="btn btn-success dialog-card-btn success" @click.prevent.stop="$emit('positive', {action: 'OK'})">{{ okLabel }}</a>
      <a v-if="cancelLabel" class="btn btn-cansel dialog-card-btn cancel"  @click.prevent.stop="$emit('negative',  {action: 'CANCEL'})">{{ cancelLabel }}</a>
    </div>
  </div>
</template>

<script>

// import DialogTemplateMixin from './DialogTemplateMixin';

export default {
  // mixins: [ DialogTemplateMixin ],
  props: {
    theme: {
      type: String,
      default: ''
    },
    closeBtn: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      required: true
    },
    messageType: {
      type: String,
      default: 'MESSAGE' // MESSAGE | HTML | SLOT
    },
    message: {
      type: String,
      required: true
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

<style scoped>

.dialog-card {
  display: flex;
  display: -ms-flexbox;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 100%;
  color: #50596c;
}
.dialog-card .dialog-card-header {
  color: #454d5d;
  padding: 16px 16px 16px 32px;
  border-bottom: 1px solid #e9ecef;
}
.dialog-card .dialog-card-header .dialog-card-title {
  color: #454d5d;
  font-size: 18px;
  font-weight: 500;
}


.dialog-card .dialog-card-body {
  padding: 25px;
  overflow-y: auto;
  padding: 32px 16px 32px 32px;
  position: relative;
  color: #50596c;
  font-size: 18px;
  font-weight: 500;
}


.dialog-card .dialog-card-footer {
  padding: 16px 16px 16px 32px;
  text-align: center;
}

/*
.dialog-card .dialog-card-btn {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
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
}
.dialog-card .dialog-card-btn.disabled, .dialog-card .dialog-card-btn[disabled], .dialog-card .dialog-card-btn:disabled {
  cursor: default;
  opacity: 0.5;
  pointer-events: none;
}
.dialog-card {
  max-height: 75vh;
  background: #fff;
  border-radius: 5px;
  overflow: hidden;
}
 */
</style>

<style scoped>
/* Themes */
.dialog-card.dialog-card-success {
  border-color: #c3e6cb;
}
.dialog-card.dialog-card-success .dialog-card-header {
  color: #155724;
  background-color: #d4edda;
}

.dialog-card.dialog-card-primary {
  border-color: #b8daff;
}
.dialog-card.dialog-card-primary .dialog-card-header {
  color: #004085;
  background-color: #cce5ff;
}

.dialog-card.dialog-card-warning {
  border-color: #ffeeba;
}
.dialog-card.dialog-card-warning .dialog-card-header {
  color: #856404;
  background-color: #fff3cd;
  border-color: #ffeeba;
}

.dialog-card.dialog-card-error {
  border-color: #f5c6cb;
}
.dialog-card.dialog-card-error .dialog-card-header {
  color: #721c24;
  background-color: #f8d7da;
}
</style>
