<template>
  <div class="dlg" :class="groupClass">

    <transition appear name="fade">
      <div v-if="overlayDisplay" class="dlg-overlay" @click="overlayClick()">
        <!--<pre>{{modalObj}}</pre>-->
      </div>
    </transition>

    <template v-for="(groupList, groupName) in modalObj" :key="groupName">
      <div class="dlg-container" :class="'dlg-container-' + groupName">
        <template v-for="(modal, index) in modalObj[groupName].list" :key="modal.getId()">

          <transition name="component-fade" mode="out-in">
            <!--<template v-if="index < groupSettings[groupName].maxDisplayItem">-->
            <!--</template>-->
              <div class="dlg-item" :class="'dlg-item__' + modal.getTheme()">
                <component
                    :is="modalObj[groupName].settings.wrapper"
                    @close="closeModal(modal)"
                >
                  <component
                      :is="modal.getVueComponent()"
                      v-bind="modal.getVueComponentProps()"
                  />
                </component>
                <!-- не вмешиваемся в компонент @close="remove(modal)" -->
              </div>
            
          </transition>

        </template>
      </div>
    </template>

  </div>
</template>

<script>

export default {
  name: 'VueDlgCore',
  methods: {
    //
    closeModal(modal) {
      // return this.remove(modal);
    },

    //
    overlayClick() {
      // if (this.modalList.length === 0) {
      //   return;
      // }
      //
      // let removeModalInfoObj = null;
      // let removePriority = 0;
      //
      // for(let i = 0; i < this.modalList.length; i++) {
      //   const modal = this.modalList[i];
      //   //
      //   const group = modal.getGroup();
      //   const groupSettings = this.groupSettings[group];
      //
      //   if(!groupSettings.overlay) {
      //     continue;
      //   }
      //   if(!groupSettings.overlayClickClose) {
      //     continue;
      //   }
      //
      //   //
      //   if(removeModalInfoObj === null){
      //     removeModalInfoObj = modal;
      //     removePriority = groupSettings.overlayClosePriority;
      //     continue;
      //   }
      //
      //   if(removePriority > groupSettings.overlayClosePriority){
      //     removeModalInfoObj = modal;
      //     removePriority = groupSettings.overlayClosePriority;
      //     continue;
      //   }
      //
      // }
      // removeModalInfoObj && this.remove(removeModalInfoObj);
    },

    // onClose(modalInfoObj, closeData) {
    //   this.remove(modalInfoObj);
    // },
    keyUp(e) {
      /*
      if ('Escape' === e.key) {
        if (this.items.length > 0) {
          this.onClose(this.items[this.items.length - 1]);
        }
      }
       */
    }
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
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.6s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */
{
  opacity: 0;
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.6s ease;
}

.component-fade-enter-from,
.component-fade-leave-to {
  opacity: 0;
}

</style>
