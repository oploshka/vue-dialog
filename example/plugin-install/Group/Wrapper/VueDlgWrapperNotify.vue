<template>
  <!--<div class="dlg-wrapper" :class="mainClass">-->
  <!--  <Transition tag="div" class="dlg-wrapper" :class="mainClass" appear disappear name="bounce" mode="out-in">-->
      <div><slot/></div>
    <!--</Transition>-->
  <!--</div>-->
</template>

<script>

// import DialogTemplateMixin from './DialogTemplateMixin';

export default {
  name: 'VueDlgWrapperAction',
  // mixins: [ DialogTemplateMixin ],
  inheritAttrs: false,
  props: {
    // тип модального окна
    type: {type: String, default: ''},
    // настройка темы модального окна
    theme: {type: String, default: ''},
  },
  data() {
    return {show: false};
  },
  computed: {
    mainClass() {
      const theme = this.theme || 'default';
      return ['dlg-wrapper-' + theme];
    }
  },
  
  methods: {
    
  }
};
</script>

<style scoped lang="scss">

.dlg-wrapper {
  overflow: hidden;
  overflow-y: auto;
  width: 100%;
  background-color: #ffffff;
  border-radius: 0.3rem;
  position: relative;
  min-height: 48px;
  padding: 0px;
  box-shadow: 4px 4px 8px #cccccc;
}

//.bounce-enter-active {
//  animation: bounce-in 0.5s;
//}
//.bounce-leave-active {
//  animation: bounce-in 0.5s reverse;
//}
//@keyframes bounce-in {
//  0% {
//    transform: scale(0);
//  }
//  50% {
//    transform: scale(1.25);
//  }
//  100% {
//    transform: scale(1);
//  }
//}

</style>
