
//
export default (action, dlgStoreObj) => {

  action.sidebarRight = (VueComponent, VueComponentProps) => {
    const modal = dlgStoreObj.add(VueComponent, VueComponentProps, { group: 'sidebar-right' });
    return modal;
  };
  
};
