
import type { Component } from 'vue';

/**
 * Настройки групп используемые внутри
 */
export type tDlgGroupSettingsFull = {
  // настройки для группы
  maxDisplayItem: number,
  // overlay
  overlay:              boolean,
  overlayClickClose:    boolean,
  overlayClosePriority: number,
  // дефолтные настройки для окон в группу
  animation: any,
  // closeByClick  : false,  - стоит управлять из компонента Template
  closeByEscape : boolean,
  wrapper: Component
}
export type tDlgGroupSettingsFullMap = {
  [key: string]: tDlgGroupSettingsFull,
}

/**
 * Это настройки, которые может передать пользователь для определенной группы
 * недостающие настройки заполняться дефолтными значениями
 */
export type tDlgGroupSettings = Partial<tDlgGroupSettingsFull>
export type tDlgGroupSettingsMap = {
  [key: string]: tDlgGroupSettings,
}



export type tDlgModalClass = {
  open: () => void,
  close: () =>  void,

  // getters
  getId: () =>  string,
  getGroup: () =>  string,
  getTheme: () =>  string,
  //
  getVueComponent: () => Component,
  getVueComponentProps: () => object,

  // // Дополнительные настройки
  getCloseIsCancelled: () => boolean,
  setCloseIsCancelled: (val: boolean) => void,

  getRemoveStatus: () => string,
  setRemoveStatus: (val: string) => void,

  getCallbackBeforeClose: () => any,
  setCallbackBeforeClose: (val: any) => void,

  getCallbackClose: () => any,
  setCallbackClose: (val: any) => void

  // хранение доп настроек
  setData: (key: any, value: any) => void,
  getData: (key: any) => any,


  // system
  toObject: () => any,
  toJSON: () => any, // JSON.stringify

}


// /**
//  * Настройки групп
//  */
// export type tDlgGroupSettings2 = {
//
//   // overlay
//   overlay: Component | null,
//   overlayProps: any,
//   overlaySettings: tDlgGroupSettingsOverlay,
//
//   // wrapper
//   group: Component,
//   groupProps: any,
//   groupSettings: any,
//
//   // wrapper
//   wrapper: Component,
//   wrapperProps: any,
//   wrapperSettings: tDlgGroupSettingsWrapper | any,
//
//
//   // closeByClick  : false,  - стоит управлять из компонента Template
//   closeByEscape : boolean,
// }
//
//
// export type tDlgGroupSettingsOverlay = {
//   // overlay:              boolean,
//   overlayClickClose:    boolean,
//   overlayClosePriority: number,
// };
//
// export type tDlgGroupSettingsWrapper = {
//   // настройки для группы
//   maxDisplayItem: number,
//   // дефолтные настройки для окон в группу
//   animation: object, // {},
// };
//
//
//
//
// // /**
// //  * Описываем основную информацию о сущности
// //  */
// // export type tEntitySettingsEntityInfo = {
// //   name: string,
// //   code: string,
// // }
// //
// //
// // export type tEntitySettingsSelect = {
// //   // [key: string]: any,
// //   request: ( search: string ) => Promise<any>
// // }
