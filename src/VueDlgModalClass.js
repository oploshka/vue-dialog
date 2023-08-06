

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

    // cache
    isOpen:       false,
    isFirstOpen:  true,
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

  // system
  this.toObject = () =>  {
    return Object.assign({}, data);
  };
  this.toJSON  = () => { return this.toObject(); }; // JSON.stringify
};


export default VueDlgModalClass;
