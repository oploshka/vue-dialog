<template>
  <DialogBox v-bind="$props">
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
  }
};
</script>
