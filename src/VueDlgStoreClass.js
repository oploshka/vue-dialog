
import { reactive, computed } from 'vue';
import VueDlgModalClass from './VueDlgModalClass';


const VueDlgStoreClass = function VueDlgStoreClass({groupSettings}) {
  const GroupSettings = groupSettings;
  const modalListStore = reactive([]);


  this.add = (VueComponent, VueComponentProps, setting) => {
    // TODO: fix
    const modalCallbackFix = {
      open:  (modalObj) => { this.addModal(modalObj);    },
      close: (modalObj) => { this.removeModal(modalObj); },
    };
    const modalObj = new VueDlgModalClass(VueComponent, VueComponentProps, setting, modalCallbackFix);
    this.addModal(modalObj);
    return modalObj;
  };
  
  
  this.addModal = (modal) => {

    // запрет повторного добавления
    if(modalListStore.find(item => item.getId() === modal.getId())) {
      return;
    }

    modalListStore.push(modal);
  };

  this.removeModal = (modal) => {
    let i = modalListStore.indexOf(modal);
    if (i >= 0) {
      modalListStore.splice(i, 1);
    }
  };



  this.overlayModalRemove = () => {
    if (modalListStore.length === 0) {
      return;
    }

    let removeModalInfoObj = null;
    let removePriority = 0;

    for(let i = 0; i < modalListStore.length; i++) {
      const modal = modalListStore[i];
      //
      const group = modal.getGroup();
      const groupSettings = GroupSettings.get(group);

      if(!groupSettings.overlay) {
        continue;
      }
      if(!groupSettings.overlayClickClose) {
        continue;
      }

      //
      if(removeModalInfoObj === null){
        removeModalInfoObj = modal;
        removePriority = groupSettings.overlayClosePriority;
        continue;
      }

      if(removePriority > groupSettings.overlayClosePriority){
        removeModalInfoObj = modal;
        removePriority = groupSettings.overlayClosePriority;
        continue;
      }

    }
    removeModalInfoObj && this.removeModal(removeModalInfoObj);
  },
  


  /**
   *
   * Возвращаем:
   * {
   *   notify: {
   *     settings: {},
   *     list: [modal1, modal2, modal3]
   *   }
   * }
   */
  this.computedModalObj = computed(() => {
    const modalObj = {};

    // строим полное дерево
    for (let i = 0; i < modalListStore.length; i++) {
      const modal = modalListStore[i];

      const group = modal.getGroup();
      if (!modalObj[group]) {
        modalObj[group] = {
          settings: GroupSettings.get(group), // TODO: fix
          list: [],
        };
      }
      modalObj[group].list.push(modal);
    }

    // строим полное дерево
    for (const group in modalObj) {
      // modalObj[group].list.sort(); // TODO: add sorting by index

      const maxDisplayItem = modalObj[group].settings.maxDisplayItem;
      if(modalObj[group].list.length > maxDisplayItem) {
        modalObj[group].list = modalObj[group].list.slice(0, maxDisplayItem);
      }

    }
    return modalObj;
  });
};

export default VueDlgStoreClass;
