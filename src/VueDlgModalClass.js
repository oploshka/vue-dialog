

const key = () => `${Date.now()}-${Math.random()}`;

/**
 *
 * @constructor
 * @param VueComponent
 * @param VueComponentProps
 * @param setting
 */
const VueDlgModalClass = function (VueComponent, VueComponentProps = {}, setting = {}, callback = {}) {

  const data = {
    id: key(),

    VueComponent      : VueComponent,
    VueComponentProps : VueComponentProps,
    setting           : Object.assign({theme: 'default', group: 'modal'},  setting),

    //
    closeIsCancelled: null,
    removeStatus: false,
    callbackBeforeClose: false,
    callbackClose: false,
    
    // cache
    isOpen:       false,
    isFirstOpen:  true,
    
    data: {
      wrapper: null,
    }
  };


  this.open   = () => {
    callback.open(this);
    return this;
  };
  this.close  = () => {
    callback.close(this);
    return this;
  };

  // getters
  this.getId    = () => { return data.id; };
  this.getGroup = () => { return data.setting.group; };
  this.getTheme = () => { return data.setting.theme; };
  //
  this.getVueComponent      = () => { return data.VueComponent; };
  this.getVueComponentProps = () => { return data.VueComponentProps; };
  
  // Дополнительные настройки
  this.getCloseIsCancelled = () => { return data.closeIsCancelled; };
  this.setCloseIsCancelled = (val) => { data.closeIsCancelled = val; };

  this.getRemoveStatus = () => { return data.removeStatus; };
  this.setRemoveStatus = (val) => { data.removeStatus = val; };
  
  this.getCallbackBeforeClose = () => { return data.callbackBeforeClose; };
  this.setCallbackBeforeClose = (val) => { data.callbackBeforeClose = val; };
  
  this.getCallbackClose = () => { return data.callbackClose; };
  this.setCallbackClose = (val) => { data.callbackClose = val; };

  // хранение доп настроек
  this.setData = (key, value) => { data.data[key] = value; };
  this.getData = (key) => { return data.data[key]; };
  
  
  // system
  this.toObject = () =>  {
    return Object.assign({}, data);
  };
  this.toJSON  = () => { return this.toObject(); }; // JSON.stringify
};


export default VueDlgModalClass;
