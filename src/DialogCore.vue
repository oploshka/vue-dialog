<template>
  <div class="dlg">

    <transition appear name="fade">
      <div v-if="overlayDisplay" class="dlg-overlay" @click="overlayClick()"></div>
    </transition>

    <template v-for="(groupList, groupName) in modalObj" :key="groupName">
      <div class="dlg-container" :class="'dlg-container-' + groupName">
        <template v-for="(modalInfoObj, index) in modalObj[groupName]" :key="modalInfoObj.id">

          <transition name="component-fade" mode="out-in">
            <template v-if="index < groupSettings[groupName].maxDisplayItem">
              <div class="dlg-item" :class="modalInfoObj.setting.theme ? 'dlg-item__' + modalInfoObj.setting.theme : ''">
                <div v-if="modalInfoObj.setting.close" class="dlg-item-close" @click="onClose(modalInfoObj, {})">
                  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.6569 7.75735C18.0474 7.36682 18.0474 6.73366 17.6569 6.34313C17.2663 5.95261 16.6332 5.95261 16.2426 6.34313L12.7071 9.87867C12.3166 10.2692 11.6834 10.2692 11.2929 9.87867L7.75736 6.34313C7.36684 5.95261 6.73367 5.95261 6.34315 6.34313C5.95262 6.73366 5.95262 7.36682 6.34315 7.75735L9.87868 11.2929C10.2692 11.6834 10.2692 12.3166 9.87868 12.7071L6.34315 16.2426C5.95262 16.6332 5.95262 17.2663 6.34315 17.6568C6.73367 18.0474 7.36683 18.0474 7.75736 17.6568L11.2929 14.1213C11.6834 13.7308 12.3166 13.7308 12.7071 14.1213L16.2426 17.6568C16.6332 18.0474 17.2663 18.0474 17.6569 17.6568C18.0474 17.2663 18.0474 16.6332 17.6569 16.2426L14.1213 12.7071C13.7308 12.3166 13.7308 11.6834 14.1213 11.2929L17.6569 7.75735Z"/>
                  </svg>
                </div>
                
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

import {setHandler}       from "./DialogThinClient";
import {getGroupSetting}  from "./DialogGroupSettings";

const key = () => `${Date.now()}-${Math.random()}`;

import {shallowRef} from 'vue';

export default {
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

      let i2 = this.modalObj[group].indexOf(modalInfoObj);
      if (i2 >= 0) {
        if (this.modalObj[group].length === 1) {
          delete this.modalObj[group];
          // TODO: add overlay delete logic
        } else {
          this.modalObj[group].splice(i2, 1);
        }
      }

      modalInfoObj.resolve(resolveDate);
    },

    //
    overlayClick() {
      if (this.modalList.length === 0) {
        return;
      }

      // TODO: исправить для тех, у кого нет overlay
      const modalInfoObj = this.modalList[0];
      this.remove(modalInfoObj);
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
    }
  },
  created() {
    // window.addEventListener('keyup', this.keyUp);
    setHandler((element) => {
      // fix vue component
      element.VueComponent = shallowRef(element.VueComponent);
      const modalInfoObj = this.add(element);
      
      const close = (closeData = {}) => {
        this.remove(modalInfoObj, closeData)
      }
      return {
        close: close,
      }
    });
  }
};

</script>

<style lang="scss" scoped>
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


/*
.--dlg {
  align-items: center;
  -ms-flex-align: center;
  -ms-flex-pack: center;
  justify-content: center;
  opacity: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  
  .dlg-container {
    max-width: 700px;
    width: 100%;
    padding: 0 25px;
  }
  
}
.--dlg:target,
.--dlg.active {
  display: flex;
  display: -ms-flexbox;
  opacity: 1;
  z-index: 400;
}

.--dlg:target .dlg-container,
.--dlg.active .dlg-container {
  animation: slide-down 0.2s ease 1;
  z-index: 1;
}
.--dlg-container {
  display: flex;
  display: -ms-flexbox;
  -ms-flex-direction: column;
  flex-direction: column;
  max-height: 75vh;
  max-width: 640px;
  width: 100%;
  box-shadow: 0 4px 30px 2px rgb(0 0 0 / 1%);
}
 */

</style>
