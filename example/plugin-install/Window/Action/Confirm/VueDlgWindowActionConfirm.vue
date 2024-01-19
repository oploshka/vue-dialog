<template>
  <VueDlgWindowActionTemplate v-bind="actionTemplateBind">
    <div class="dialog-card-content-message">{{message}}</div>
  </VueDlgWindowActionTemplate>
</template>

<script>

import VueDlgWindowActionMixin from '../_base/VueDlgWindowActionMixin';

export default {
  name: 'VueDlgWindowActionConfirm',
  mixins: [ VueDlgWindowActionMixin ],
  props: {
    message:        { type: String,   required: true      },
  }
};

</script>

<style scoped>
/**/
</style>
