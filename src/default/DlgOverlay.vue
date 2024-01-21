<template>
  <Transition appear name="fade">
    <div v-if="overlayDisplay" class="dlg-overlay-gray" @click="$emit('overlayClick', {})"></div>
  </Transition>
</template>

<script>

export default {
  name: 'DlgOverlay',
  props: {
    overlayDisplay: { type: Boolean, required: true },
  },
};

</script>

<style>

/* transition name="fade" */
.fade-enter-active, .fade-leave-active  { transition: opacity 0.6s; }
/* показ анимации на создание */
.fade-enter-from  { opacity: 0; }
.fade-enter-to    { opacity: 1; }
/* показ анимации на закрытие */
.fade-leave-from  { opacity: 1; }
.fade-leave-to    { opacity: 0; }

.dlg-overlay-gray {
  background: rgba(0, 0, 0, 0.5);
  cursor: default;
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 390;
}

</style>