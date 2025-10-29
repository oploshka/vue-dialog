
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
