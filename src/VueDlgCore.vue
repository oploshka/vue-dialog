<template>
  <div class="dlg" :class="groupClass">

    <transition appear name="fade">
      <div v-if="overlayDisplay" class="dlg-overlay" @click="overlayClick()"></div>
    </transition>

    <template v-for="(groupList, groupName) in modalObj" :key="groupName">
      <div class="dlg-container" :class="'dlg-container-' + groupName">
        <template v-for="(modal, index) in modalObj[groupName]" :key="modal.getId()">

          <transition name="component-fade" mode="out-in">
            <template v-if="index < groupSettings[groupName].maxDisplayItem">
              <div class="dlg-item" :class="'dlg-item__' + modal.getTheme()">

                <component
                    :is="modal.getVueComponent()"
                    v-bind="modal.getVueComponentProps()"
                    @close="remove(modal)"
                />

              </div>
            </template>
          </transition>

        </template>
      </div>
    </template>

  </div>
</template>

<script>

import {vueClientSetComponent}       from './VueDlgThinClient';
import {getGroupSetting}  from './DialogGroupSettings';

// TODO: delete???
// import {shallowRef} from 'vue';
// element.VueComponent = shallowRef(element.VueComponent);

export default {
  name: 'DialogCore',
  data() {
    return {

      modalObj: {},
      modalList: [],
      groupSettings: {}, // cache
    };
  },
  methods: {

    // TODO: delete
    open(modal) {
      return this.add(modal);
    },
    /**
     *
     * @param {VueDlgModalClass} modal
     * @returns {VueDlgModalClass}
     */
    add(modal) {
      const group = modal.getGroup();
      if (!this.groupSettings[group]) {
        this.groupSettings[group] = getGroupSetting(group);
      }

      if (!this.modalObj[group]) {
        this.modalObj[group] = [];
      }

      this.modalObj[group].push(modal);
      this.modalList.push(modal);

      return modal;
    },

    remove(modal) {
      let i = this.modalList.indexOf(modal);
      if (i >= 0) {
        this.modalList.splice(i, 1);
      }

      const group = modal.getGroup();
      
      if (typeof this.modalObj[group] !== 'undefined') {
        let i2 = this.modalObj[group].indexOf(modal);
        if (i2 >= 0) {
          if (this.modalObj[group].length === 1) {
            delete this.modalObj[group];
            // TODO: add overlay delete logic
          } else {
            this.modalObj[group].splice(i2, 1);
          }
        }
      }
    },

    //
    overlayClick() {
      if (this.modalList.length === 0) {
        return;
      }

      let removeModalInfoObj = null;
      let removePriority = 0;

      for(let i = 0; i < this.modalList.length; i++) {
        const modalInfoObj = this.modalList[i];
        //
        const group = modalInfoObj.setting.group;
        const groupSettings = this.groupSettings[group];

        if(!groupSettings.overlay) {
          continue;
        }
        if(!groupSettings.overlayClickClose) {
          continue;
        }

        //
        if(removeModalInfoObj === null){
          removeModalInfoObj = modalInfoObj;
          removePriority = groupSettings.overlayClosePriority;
          continue;
        }

        if(removePriority > groupSettings.overlayClosePriority){
          removeModalInfoObj = modalInfoObj;
          removePriority = groupSettings.overlayClosePriority;
          continue;
        }

      }
      removeModalInfoObj && this.remove(removeModalInfoObj);
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
    overlayDisplay() {
      let overlay = false;
      for (let key in this.modalObj) {
        if (this.groupSettings[key].overlay) {
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
  created() {
    vueClientSetComponent({
      open: this.add,
      close: this.remove,
    });
  }
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
