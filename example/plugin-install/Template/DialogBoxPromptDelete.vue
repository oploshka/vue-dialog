<template>
  <div>
    <DialogBoxPromptWrapper
      :title="title"
      :message="message"
      :okLabel="okLabel"
      :cancelLabel="cancelLabel"
      @close="test($event)"
    >
      <template #icon></template>
    </DialogBoxPromptWrapper>
  </div>
</template>

<script>


import DialogBoxPromptWrapper from './DialogBoxPromptWrapper';

export default {
  components: {DialogBoxPromptWrapper},
  props: {
    title: {
      type: String,
      required: true
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
  },
  methods: {
    test($event) {
      this.$emit('close', $event);
    }
  }
};
</script>

<style lang="scss" scoped></style>
