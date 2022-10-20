<template>
  <DialogBox
      v-bind="$props"
      messageType="SLOT"
      @positive="actionPositive"
  >
    <!-- Это сделано для примера и рекомендуется заменить на стилизованный компонент -->
    <input v-model="value">
  </DialogBox>
</template>

<script>

import DialogBox from './DialogBox';

export default {
  name: 'DialogCardPrompt',
  mixins: [ DialogBox ],
  components: {
    DialogBox
  },
  data() {
    return {
      value: ''
    };
  },
  methods: {
    actionPositive(event) {
      console.log('[DialogCardPrompt] actionPositive', event);
      // debugger;
      this.$emit('submit', {value: this.value});
    }
  }
};
</script>
