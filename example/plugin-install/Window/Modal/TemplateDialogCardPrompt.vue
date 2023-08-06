<template>
  <TemplateDialogBox
      v-bind="$props"
      messageType="SLOT"
      @positive="actionPositive"
  >
    <!-- Это сделано для примера и рекомендуется заменить на стилизованный компонент -->
    <input v-model="value">
  </TemplateDialogBox>
</template>

<script>

import TemplateDialogBox from './TemplateDialogBox';

export default {
  name: 'TemplateDialogCardPrompt',
  mixins: [ TemplateDialogBox ],
  components: {
    TemplateDialogBox,
  },
  data() {
    return {
      value: ''
    };
  },
  methods: {
    actionPositive(event) {
      console.log('[DialogCardPrompt] actionPositive', event);
      this.$emit('submit', {value: this.value});
    }
  }
};
</script>
