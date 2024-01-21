
//
import DLG_GROUP from '../../Group/GroupEnum';

// action prompt
export default (dlgStoreObj) => ({
  open: (VueComponent, VueComponentProps) => {
    const modalObj = dlgStoreObj.add(VueComponent, VueComponentProps, {
      group: DLG_GROUP.MODAL,
      theme: '',
      close: false,
    });
    return modalObj;
  },
  openMaxView: (VueComponent, VueComponentProps) => {
    const modalObj = dlgStoreObj.add(VueComponent, VueComponentProps, {
      group: DLG_GROUP.MODAL,
      theme: 'fullscreen',
      close: false,
    });
    return modalObj;
  },
  openSmallView: (VueComponent, VueComponentProps) => {
    const modalObj = dlgStoreObj.add(VueComponent, VueComponentProps, {
      group: DLG_GROUP.MODAL,
      theme: 'small',
      close: false,
    });
    return modalObj;
  },
});
