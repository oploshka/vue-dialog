import DlgModal from "vue-dlg/v2/DlgModal.ts";


/**
 * Это информация которая необходима от пользователя, для отображения модального окна
 */
export type tDlgModalConfig = {
  /** Компонет, который необходимо открыть в модальном окне */
  modalComponent: any,
  /** Пропс для компонет, который необходимо открыть в модальном окне (может быть реактивным)*/
  modalProps: object,
  // /** Настройки для ... */
  setting: object,
}

export type tDlgModalCallbackBefore = null | (() => void | Promise<void>);


/**
 * Это информация из tDlgUserModalConfig которая преобразована в объект класса модального окна,
 * с возможностью управлять этим модальным окном
 */
export interface iDlgModal {
  // constructor(config: tDlgModalConfig, modalManager: iDlgModalManager)
  open(): this
  close(): this
  getId(): string
  getGroup(): any
  getTheme(): any
  getVueComponent(): any
  getVueComponentProps(): any
  getCloseIsCancelled(): any
  setCloseIsCancelled(val: any): void
  getRemoveStatus(): boolean
  setRemoveStatus(val: any): void
  /** событие перед закрытием (закрытие может не отработать если изменить closeIsCanceled) */
  getCallbackBeforeClose(): tDlgModalCallbackBefore
  setCallbackBeforeClose: (val: tDlgModalCallbackBefore) => void
  //
  getCallbackClose(): boolean
  setCallbackClose: (val: boolean) => void
  //
  setData(key: string, value: any): void
  getData(key: string): any
  //
  toObject(): any
  toJSON(): any
}

/**
 * В данном случае это список событий, которые необходимы iDlgModal
 * для того чтоб не было двухсторонней связки с iDlgModalManager
 */
export interface iDlgModalManagerCallback {
  open(p: DlgModal): void,
  close(p: DlgModal): void,
}

export interface iDlgModalManager {
  /** Возвращает текущую группу открытых модальных окон */
  getOpenedGroup(): Record<string, boolean>;

  /** Возвращает реактивное хранилище списка модальных окон */
  getModalListStore(): iDlgModal[];

  /** Создает и добавляет новое модальное окно на основе конфигурации */
  add(config: tDlgModalConfig): iDlgModal;

  /** Добавляет уже существующий объект модального окна в стор */
  addModal(modal: iDlgModal): void;

  /** Удаляет модальное окно из стора с выполнением жизненных циклов (beforeClose/close) */
  removeModal(modal: iDlgModal): Promise<void>;
}

// export type tDlgModalConstructor = new (config: tDlgUserModalConfig) => tDlgModal;

