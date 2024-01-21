<template>
  <TransitionGroup tag='div' name="vn-fade">
    <slot/>
  </TransitionGroup>
</template>

<script>

export default {
  name: 'TestTransition',
  inheritAttrs: false,
  props: {
    name: { type: String, default: '', },
  },
  }
</script>

<style>
.vn-fade-enter-active, .vn-fade-leave-active, .vn-fade-move  {
  transition: all .5s;
}

.vn-fade-enter-from, .vn-fade-leave-to {
  opacity: 0;
}
</style>