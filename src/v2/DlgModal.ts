import type {
  tDlgModalConfig,
  iDlgModal,
  iDlgModalManagerCallback,
  tDlgModalCallbackBefore
} from "vue-dlg/v2/Type/tDlg.ts";


const DlgModalUniqKey = (() => {
  let index = 0;
  
  return () => {
    index++;
    return `DlgModal_${Date.now()}-${index}`;
  }
})()


export default class DlgModal implements iDlgModal {
  
  private data = {
    id: '',
    VueComponent      : null as any,
    VueComponentProps : null as any,
    setting           : null as any,
    //
    closeIsCancelled: null,
    removeStatus: false,
    callbackBeforeClose: null as tDlgModalCallbackBefore,
    callbackClose: false,
    // cache
    isOpen:       false,
    isFirstOpen:  true,
    data: {
      wrapper: null,
    } as any,
  }
  private modalManagerCallback = {} as iDlgModalManagerCallback;

  constructor(config: tDlgModalConfig, modalManagerCallback: iDlgModalManagerCallback) {
    this.data.id = DlgModalUniqKey();
    this.data.VueComponent      = config.modalComponent;
    this.data.VueComponentProps = config.modalProps;
    this.data.setting = Object.assign({theme: 'default', group: 'modal'},  config.setting);

    //
    this.modalManagerCallback = modalManagerCallback;
  }



  open() {
    this.modalManagerCallback.open(this);
    return this;
  };
  close() {
    this.modalManagerCallback.close(this);
    return this;
  };


  // getters
  getId() { return this.data.id; };
  getGroup() { return this.data.setting.group; };
  getTheme() { return this.data.setting.theme; };
  //
  getVueComponent() { return this.data.VueComponent; };
  getVueComponentProps() { return this.data.VueComponentProps; };

  // Дополнительные настройки
  getCloseIsCancelled() { return this.data.closeIsCancelled; };
  setCloseIsCancelled(val: any): void {this.data.closeIsCancelled = val; };

  getRemoveStatus(): boolean { return this.data.removeStatus; };
  setRemoveStatus(val: any): void {this.data.removeStatus = val; };


  getCallbackBeforeClose(): tDlgModalCallbackBefore { return this.data.callbackBeforeClose; };
  setCallbackBeforeClose = (val: tDlgModalCallbackBefore):void => {this.data.callbackBeforeClose = val; };

  getCallbackClose() { return this.data.callbackClose; };
  setCallbackClose = (val: boolean) => {this.data.callbackClose = val; };

  // хранение доп настроек
  setData(key: string, value: any) { this.data.data[key] = value; };
  getData(key: string): any { return this.data.data[key]; };


  // system
  toObject()  {
    return Object.assign({}, this.data);
  };
  toJSON() { return this.toObject(); }; // JSON.stringify

}
