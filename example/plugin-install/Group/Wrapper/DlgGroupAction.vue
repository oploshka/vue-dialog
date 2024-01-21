<template>
  <TransitionGroup tag="div" class="dlg-group--action" appear mode="out-in" name="list">
    <template v-for="modal in modalList" :key="modal.getId()">
      <div class="dlg-item" :class="'dlg-item__' + modal.getTheme()" >
        <!--@close="closeModal(modal)"-->
        <component
            :is="modal.getVueComponent()"
            v-bind="modal.getVueComponentProps()"
        />
      </div>
    </template>
  </TransitionGroup>
</template>

<script>

export default {
  name: 'DlgGroupAction',
  // inheritAttrs: false,
  props: {
    modalList: { type: Array, default: () => [], },
  },
};
</script>

<style scoped lang="scss">

// // fade
//.fade-enter-active, .fade-leave-active  { transition: opacity 3s; }
//.fade-enter-from, .fade-leave-to  { opacity: 0; }
//.fade-enter-to, .fade-leave-from  { opacity: 1; }


// // bounce
//.bounce-enter-active { animation: bounce-in 0.6s; }
//.bounce-leave-active { animation: bounce-in 0.6s reverse; }
//@keyframes bounce-in {
//  0%    { transform: scale(0);    }
//  50%   { transform: scale(1.25); }
//  100%  { transform: scale(1);    }
//}

// Animation
.list-enter-active, .list-leave-active { transition: all 0.5s ease; }
.list-enter-from, .list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}


//.dlg-group--action {
//  width: 100%;
//  transition: width 2s;
//  transition-timing-function: cubic-bezier(1, 0.03, 1, -0.06);
//}

  
.dlg-group--action {
  //transition: width 2s;
  //transition-timing-function: cubic-bezier(1, 0.03, 1, -0.06);
  
  position: fixed;
  top: 0;
  left: 0;
  //right: 0;
  width: 100%;
  &:empty{
    width: 0;
  }
  
  bottom: 0;
  z-index: 2200;
  

  overflow: unset;
  opacity: 1;

  display: flex;
  display: -ms-flexbox;
  align-items: center;
  -ms-flex-align: center;
  -ms-flex-pack: center;
  justify-content: center;
  flex-direction: column;

  //& > div:last-child {
  //  margin-bottom: 0px;
  //}

  .dlg-item {
    max-width: 740px;
    width: 100%;
    margin: 20px;
    max-height: calc(100vh - 40px);
    overflow-y: auto;
    //  //box-shadow: var(--modal-shadow);
    //  box-shadow: 4px 4px 8px #cccccc;
    position: relative;
    overflow: unset;
  }

  .dlg-item {
    overflow: hidden;
    overflow-y: auto;
    width: 100%;
    //background-color: var(--color-gray-01);
    background-color: #ffffff;
    //background: #fff;
    //background-clip: padding-box;
    //border: 1px solid rgba(0,0,0,.2);
    border-radius: 0.3rem;

    position: relative;
    min-height: 48px;

    padding: 0px;
    // height: -webkit-fill-available;

    box-shadow: 4px 4px 8px #cccccc;
    border: 1px solid #f8f8fa;

  }
}
</style>