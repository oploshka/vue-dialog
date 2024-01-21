<template>
  <TransitionGroup tag="div" class="dlg-group--modal" appear mode="out-in" name="bounce">
    <template v-for="modal in modalList" :key="modal.getId()">
      <DlgGroupModalItem :theme="modal.getTheme()">
        <component
            :is="modal.getVueComponent()"
            v-bind="modal.getVueComponentProps()"
        />
      </DlgGroupModalItem>
    </template>
  </TransitionGroup>
</template>

<script>

import DlgGroupModalItem from './DlgGroupModalItem';

export default {
  name: 'DlgGroupModal',
  components: {
    DlgGroupModalItem,
  },
  props: {
    modalList: { type: Array, default: () => [], },
  },
};
</script>

<style scoped lang="scss">

// Animation bounce
.bounce-enter-active { animation: bounce-in 0.6s; }
.bounce-leave-active { animation: bounce-in 0.6s reverse; }
@keyframes bounce-in {
  0%    { transform: scale(0);    }
  50%   { transform: scale(1.1); }
  100%  { transform: scale(1);    }
}

// Group style
.dlg-group--modal {
  position: fixed;
  top: 0;
  left: 0;
  //right: 0;
  width: 100%;
  &:empty{
    width: 0;
  }

  bottom: 0;
  z-index: 2100; // для перекрытия бутстраповского header fixed

  // for dlg-item
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 16px;
  //
  justify-content: center;
  padding: 25px;
}
</style>