<template>
  <div class="dlg-template dlg-template-simple-message dtsm" :class="{ ['dtsm-' + theme]: !!theme}" @click="$emit('close', {action: 'CLOSE'})">
    <NotificationItem :notify="pushObj" @click="pushAction(pushObj), $emit('close', {action: 'CLOSE'})"/>
  </div>
</template>

<script>

import DialogTemplateMixin from '@plugin/vue-dlg/src/Template/DialogTemplateMixin';
import NotificationItem from '@component/Notification/NotificationItem';
import { pushAction } from '@store/notification.store';

export default {
  name: 'DialogPush',
  components: {
    NotificationItem
  },
  mixins: [ DialogTemplateMixin ],
  props: {
    theme: {
      type: String,
      default: ''
    },
    pushObj: {
      type: Object,
      required: true
    }
  },
  mounted() {
    // TODO: update timer logic
    setTimeout(() => {
      this.close({action: 'CLOSE'});
    }, 3000);
  },
  setup() {
    return {
      pushAction
    };
  }
};
</script>

<style lang="scss" scoped>
.dtsm {
  display: block;
  box-sizing: border-box;
  text-align: left;
  font-size: 12px;
  border-radius: 8px;
  box-shadow: var(--modal-shadow);
  //margin: 0 5px 5px;
  color: var(--color-gray-09);
  background: var(--color-gray-01);
  border: 1px solid var(--color-gray-03);
}

//.dtsm.dtsm-success {
//  color: var(--color-gray-09);
//  background: #9CCB18;
//  border: 1px solid #2CA800;
//}
//
//.dtsm.dtsm-error {
//  color: var(--color-gray-09);
//  background: var(--color-red-01);
//  border: 1px solid var(--color-red-03);
//}

</style>
