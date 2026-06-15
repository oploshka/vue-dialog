/*
 *
 * Тонкий клиент для дальнейшей передачи в плагин с диалоговыми окнами
 * После инициализации плагина диалоговых окон, необходимо установить setHandler
 *
 */

import VueDlgModalClass from './VueDlgModalClass';

import * as Queue from './VueDlgQueue';
const thinClientCallback = {
  open(modalClass) {
    // TODO: придумать как не добавлять дубляжи и open().close().open()
    Queue.add(modalClass);
  },
  close(modalClass) {
  }
};

// TODO: переименовать $DlgCoreComponent - это не компонент а лишь объект {open, close}
const vueClientCallback = {
  open(modalClass) {
    this.$DlgCoreComponent.open(this);
  },
  close(modalClass) {
    this.$DlgCoreComponent.close(this);
  },
  //
  $DlgCoreComponent: null,
  setDlgCoreComponent(component) {
    this.$DlgCoreComponent = component;
    this.runRemoveThinClient();
  },
  runRemoveThinClient() {
    let element = Queue.dequeue();
    while (element){
      // TODO: validate modal is open
      this.open(element);
      element = Queue.dequeue();
    }
  }
};
// export const vueClientSetComponent = vueClientCallback.setDlgCoreComponent;
export const vueClientSetComponent = (obj) => { vueClientCallback.setDlgCoreComponent(obj); }


const proxyClientCallback = {
  open(modalClass) {
    vueClientCallback.$DlgCoreComponent ? vueClientCallback.open(modalClass) : thinClientCallback.open(modalClass);
  },
  close(modalClass) {
    vueClientCallback.$DlgCoreComponent ? vueClientCallback.close(modalClass) : thinClientCallback.close(modalClass);
  }
};


//
const createModalAndOpen = (VueComponent, VueComponentProps, setting = {}) => {
  const modalObj = new VueDlgModalClass(VueComponent, VueComponentProps, setting, proxyClientCallback);
  return modalObj.open(this);
};

export default createModalAndOpen;
