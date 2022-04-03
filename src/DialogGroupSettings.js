
const defaultSetting = () => {
  return {
    // настройки для группы
    maxDisplayItem: 1,
    overlay      : true,
    // дефолтные настройки для окон в группу
    animation: {},
    // closeByClick  : false,  - стоит управлять из компонента Template
    closeByEscape : false,
  };
};

const groupSetting = {};

export const addGroupSetting = (groupName, settings) => {
  groupSetting[groupName] = Object.assign(defaultSetting(), settings);
};
export const getGroupSetting = (groupName) => {
  // TODO: add warning
  return groupSetting[groupName] || defaultSetting();
};
