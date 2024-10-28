
//
import DlgGroupDefault from '@vue-dlg-plugin/default/DlgGroupDefault.vue';

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
    wrapper: DlgGroupDefault
  };
};


const DlgGroupSettingsClass = function DlgGroupSettingsClass() {
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

export default DlgGroupSettingsClass;