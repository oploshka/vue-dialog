
//
import type {tDlgGroupSettingsFull} from "../tsType/DlgType.ts";
//
import DlgGroupDefault from "../default/DlgGroupDefault.vue";

const DlgGroupSettingsDefault = (): tDlgGroupSettingsFull => {
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

export default DlgGroupSettingsDefault;