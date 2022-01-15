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
            <div class="dlg-item">
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

import { shallowRef } from 'vue';

export default {
  data() {
    return {
      
      modalObj  : {},
      modalList : [],
      groupSettings : {}, // cache
    };
  },
  methods: {
    // add(VueComponent, VueComponentProps, groupName) {
    add(modalInfoObj) {
      modalInfoObj.id = modalInfoObj.id || key(); // TODO: test;
      if( !this.groupSettings[modalInfoObj.groupName] ) {
        this.groupSettings[modalInfoObj.groupName] = getGroupSetting(modalInfoObj.groupName);
      }
      
      if(!this.modalObj[modalInfoObj.groupName]){
        this.modalObj[modalInfoObj.groupName] = [];
      }
  
      this.modalObj[modalInfoObj.groupName].push(modalInfoObj);
      this.modalList.push(modalInfoObj);
    },
    
    remove(modalInfoObj, resolveDate = {}) {
      let i = this.modalList.indexOf(modalInfoObj);
      if (i >= 0) {
        this.modalList.splice(i, 1);
      }
      
      let i2 = this.modalObj[modalInfoObj.groupName].indexOf(modalInfoObj);
      if (i2 >= 0) {
        if(this.modalObj[modalInfoObj.groupName].length === 1) {
          delete this.modalObj[modalInfoObj.groupName];
          // TODO: add overlay delete logic
        } else {
          this.modalObj[modalInfoObj.groupName].splice(i2, 1);
        }
      }
  
      modalInfoObj.resolve(resolveDate)
    },
    
    //
    overlayClick(){
      if(this.modalList.length === 0) {
        return;
      }
  
      // TODO: исправить для тех, у кого нет overlay
      const modalInfoObj = this.modalList[0];
      this.remove(modalInfoObj)
    },
    
    
    // core
    open(VueComponent, VueComponentProps, groupName) {
      return new Promise((resolve ) => {
        const modalInfoObj = {
          VueComponent      : VueComponent,
          VueComponentProps : VueComponentProps,
          groupName         : groupName,
          // setting           : setting,
          //
          resolve           : resolve,
        }
  
        this.add(modalInfoObj)
      });
    },
    
    onClose(modalInfoObj, closeData) {
      this.remove(modalInfoObj)
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
      for(let key in this.modalObj){
        if(this.groupSettings[key].overlay) {
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
      this.add(element)
    })
  }
};
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.6s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
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
