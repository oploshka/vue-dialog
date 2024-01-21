<template>
  <DlgWindowActionTemplate v-bind="actionTemplateBind">
    <div class="dialog-card-content-message">{{message}}</div>
  </DlgWindowActionTemplate>
</template>

<script>

import DlgWindowActionMixin from '../_base/DlgWindowActionMixin';

export default {
  name: 'DlgWindowActionConfirm',
  mixins: [ DlgWindowActionMixin ],
  props: {
    message:        { type: String,   required: true      },
  }
};

</script>

<style scoped>
/**/
</style>
