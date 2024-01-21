<template>
  <Transition appear name="fade2">
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

/*
transition
    name="fade" Имя классов будет начинаться с fade-
    in-out: Сначала появляется новый элемент и только после этого исчезает старый.
    out-in: Сначала исчезает старый элемент и только после этого появляется новый. 
 */
.fade2-enter-active, .fade2-leave-active  { transition: opacity 0.6s; }
/* показ анимации на создание */
.fade2-enter-from  { opacity: 0; }
.fade2-enter-to    { opacity: 1; }
/* показ анимации на закрытие */
.fade2-leave-from  { opacity: 1; }
.fade2-leave-to    { opacity: 0; }

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