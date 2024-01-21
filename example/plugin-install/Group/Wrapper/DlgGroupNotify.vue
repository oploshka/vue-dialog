<template>
  <TransitionGroup tag="div" class="dlg-group--action" appear mode="out-in" name="bounce">
    <template v-for="modal in modalList" :key="modal.getId()">
      <DlgGroupNotifyItem :theme="modal.getTheme()">
        <component
            :is="modal.getVueComponent()"
            v-bind="modal.getVueComponentProps()"
        />
      </DlgGroupNotifyItem>
    </template>
  </TransitionGroup>
</template>

<script>

import DlgGroupNotifyItem from './DlgGroupNotifyItem';

export default {
  name: 'DlgTestTransition',
  components: {
    DlgGroupNotifyItem,
  },
  props: {
    modalList: { type: Array, default: [], },
  },
};
</script>

<style scoped lang="scss">

/* bounce */
.bounce-enter-active { animation: bounce-in 0.6s; }
.bounce-leave-active { animation: bounce-in 0.6s reverse; }
@keyframes bounce-in {
  0%    { transform: scale(0);    }
  50%   { transform: scale(1.1); }
  100%  { transform: scale(1);    }
}

// Animation
.list-enter-active, .list-leave-active { transition: all 0.5s ease; }
.list-enter-from, .list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

// Group style
.dlg-group--action {
  position: fixed;
  right: 10px;
  bottom: 10px;
  width: 320px;
  z-index: 420;
  filter: drop-shadow(0px -18px 45px rgba(0, 0, 0, 0.03)) drop-shadow(0px 4px 8px rgba(28, 41, 61, 0.1));

  // fix empty group
  &:empty{
    width: 0;
  }

  // for dlg-item
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 16px;
  
}
</style>