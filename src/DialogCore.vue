<template>
  <div class="dlg" :class="groupClass">

    <transition appear name="fade">
      <div v-if="overlayDisplay" class="dlg-overlay" @click="overlayClick()"></div>
    </transition>

    <template v-for="(groupList, groupName) in modalObj" :key="groupName">
      <div class="dlg-container" :class="'dlg-container-' + groupName">
        <template v-for="(modalInfoObj, index) in modalObj[groupName]" :key="modalInfoObj.id">

          <transition name="component-fade" mode="out-in">
            <template v-if="index < groupSettings[groupName].maxDisplayItem">
              <div class="dlg-item" :class="modalInfoObj.setting.theme ? 'dlg-item__' + modalInfoObj.setting.theme : ''">

                <component
                    :is="modalInfoObj.VueComponent"
                    v-bind="modalInfoObj.VueComponentProps"
                    @close="onClose(modalInfoObj, $event)"
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

import {setHandler}       from './DialogThinClient';
import {getGroupSetting}  from './DialogGroupSettings';

const key = () => `${Date.now()}-${Math.random()}`;

// TODO: delete
import {shallowRef} from 'vue';

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
    // add(VueComponent, VueComponentProps, groupName) {
    add(modalInfoObj) {
      // TODO: add body class update callback (fix scroll)

      modalInfoObj.id = modalInfoObj.id || key(); // TODO: test;
      modalInfoObj.setting = Object.assign({theme: 'default', group: 'modal'},  modalInfoObj.setting)

      const group = modalInfoObj.setting.group;
      if (!this.groupSettings[group]) {
        this.groupSettings[group] = getGroupSetting(group);
      }

      if (!this.modalObj[group]) {
        this.modalObj[group] = [];
      }

      this.modalObj[group].push(modalInfoObj);
      this.modalList.push(modalInfoObj);

      return modalInfoObj;
    },

    remove(modalInfoObj, resolveDate = {}) {
      let i = this.modalList.indexOf(modalInfoObj);
      if (i >= 0) {
        this.modalList.splice(i, 1);
      }

      const group = modalInfoObj.setting.group;
      
      if (typeof this.modalObj[group] !== 'undefined') {
        let i2 = this.modalObj[group].indexOf(modalInfoObj);
        if (i2 >= 0) {
          if (this.modalObj[group].length === 1) {
            delete this.modalObj[group];
            // TODO: add overlay delete logic
          } else {
            this.modalObj[group].splice(i2, 1);
          }
        }
      }

      modalInfoObj.resolve(resolveDate);
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


    // core
    open(VueComponent, VueComponentProps, setting = {}) {
      return new Promise((resolve) => {
        const modalInfoObj = {
          VueComponent: VueComponent,
          VueComponentProps: VueComponentProps,
          setting: setting,
          //
          resolve: resolve,
        };

        this.add(modalInfoObj);
      });
    },

    onClose(modalInfoObj, closeData) {
      this.remove(modalInfoObj);
    },
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
      return classStr
    },
  },
  created() {
    // window.addEventListener('keyup', this.keyUp);
    setHandler((element) => {
      // fix vue component
      element.VueComponent = shallowRef(element.VueComponent);
      const modalInfoObj = this.add(element);

      const close = (closeData = {}) => {
        this.remove(modalInfoObj, closeData)
      };
      return {
        close: close,
      };
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
