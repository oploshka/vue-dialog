
//
import VueDlgWrapperDefault from "vue-dlg/src/VueDlgWrapperDefault";

const defaultSetting = () => {
  return {
    // настройки для группы
    maxDisplayItem: 1,
    // overlay
    overlay               : true,
    overlayClickClose     : true,
    overlayClosePriority  : 100,
    // дефолтные настройки для окон в группу
    animation: {},
    // closeByClick  : false,  - стоит управлять из компонента Template
    closeByEscape : false,
    wrapper: VueDlgWrapperDefault
  };
};


const VueDlgGroupSettingsClass = function VueDlgGroupSettingsClass() {
  // TODO: нужна ли реактивность на группы?
  const groupSetting = {};
  
  this.add = (groupName, settings) => {
    groupSetting[groupName] = Object.assign(defaultSetting(), settings);
  };
  
  this.get = (groupName) => {
    // TODO: add warning
    return groupSetting[groupName] || defaultSetting();
  };
  
};

export default VueDlgGroupSettingsClass;