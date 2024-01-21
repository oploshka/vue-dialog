<template>
  <VueDlgWindowActionTemplate v-bind="actionTemplateBind">
    <template v-slot:default>
      <div class="dialog-card-content-message">
        <label>{{message}}</label>
        <input type="text" name="prompt-text" class="prompt-text" v-model="value" a/>
      </div>
    </template>
    <template v-slot:footer>
      <a v-if="okLabel"     class="btn btn-success dialog-card-btn success" @click.prevent.stop="submit">{{ okLabel }}</a>
      <a v-if="cancelLabel" class="btn btn-cansel dialog-card-btn cancel"  @click.prevent.stop="cansel">{{ cancelLabel }}</a>
    </template>
  </VueDlgWindowActionTemplate>
</template>

<script>

import VueDlgWindowActionMixin from '../_base/VueDlgWindowActionMixin';

export default {
  name: 'VueDlgWindowActionPromptText',
  mixins: [ VueDlgWindowActionMixin ],
  props: {
    message:        { type: String,   required: true      },
  },
  data() {
    return {
      value: '',
    };
  },
  methods: {
    submit() {
      if(!this.value) {
        // error validate
        return;
      }
      this.$emit('positive', { action: 'OK', value: this.value });
    },
    cansel() {
      this.$emit('negative',  { action: 'CANCEL' });
    }
  }
};

</script>

<style scoped>
/**/

.prompt-text {
  display: block;
  border: 1px solid #ccc;
  width: 100%;
  border-radius: 4px;
  height: 40px;
}
</style>
