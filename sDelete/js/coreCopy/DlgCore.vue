<template>
  <div class="dlg" :class="groupClass">

    <DlgOverlay class="dlg-overlay" :overlayDisplay="overlayDisplay" @overlayClick="overlayClick" />

    <div class="dlg-container">
      <template v-for="(groupList, groupName) in modalObj" :key="groupName">
        <component
            :is="modalObj[groupName].settings.wrapper"
            :class="'dlg-group dlg-group__' + groupName" 
            :modalList="modalObj[groupName].list"
        />
      </template>
    </div>

  </div>
</template>

<script>

import DlgOverlay from '../default/DlgOverlay.vue';

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
        if (!this.modalObj[key].list?.length) {
          continue;
        }
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
        classStr += 'dlg--open-group--' + key + ' ';
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
