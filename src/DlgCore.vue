<template>
  <div class="dlg" :class="groupClass">

    <DlgOverlay class="dlg-overlay" :overlayDisplay="overlayDisplay" @overlayClick="overlayClick" />

    <template v-for="(groupList, groupName) in modalObj" :key="groupName">
      <div class="dlg-container" :class="'dlg-container-' + groupName">
        <template v-for="(modal, index) in modalObj[groupName].list" :key="modal.getId()">

          <div class="dlg-item" :class="'dlg-item__' + modal.getTheme()">
            <component
                :modal="modal"
                :is="modalObj[groupName].settings.wrapper"
                @close="closeModal(modal)"
            >
              <transition name="component-fade" mode="out-in">
                <component
                    :is="modal.getVueComponent()"
                    v-bind="modal.getVueComponentProps()"
                />
              </transition>
            </component>
          </div>

        </template>
      </div>
    </template>

  </div>
</template>

<script>

import DlgOverlay from './default/DlgOverlay';

export default {
  name: 'DlgCore',
  components: {
    DlgOverlay,
  },
  methods: {
    //
    closeModal(modal) {
      this.$dialogStore.removeModal(modal);
    },
    overlayClick() {
      this.$dialogStore.overlayModalRemove();
    },
    // keyUp(e) {
    //   if ('Escape' === e.key) {
    //     if (this.items.length > 0) {
    //       this.onClose(this.items[this.items.length - 1]);
    //     }
    //   }
    // }
  },
  computed: {
    modalObj() {
      return this.$dialogStore.computedModalObj.value;
    },
    
    overlayDisplay() {
      let overlay = false;
      for (let key in this.modalObj) {
        if (this.modalObj[key].settings.overlay) {
          overlay = true;
          break;
        }
      }
      return overlay;
    },
    groupClass() {
      let classStr = '';
      for(const key in this.modalObj) {
        classStr += 'dlg-core-group--' + key + ' ';
      }
      return classStr;
    },
  },
  // created() {
  //   vueClientSetComponent({
  //     open: this.add,
  //     close: this.remove,
  //   });
  // }
};

</script>

<style scoped>

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.6s ease;
}

.component-fade-enter-from,
.component-fade-leave-to {
  opacity: 0;
}

</style>
