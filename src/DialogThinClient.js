/*
 *
 * Тонкий клиент для дальнейшей передачи в плагин с диалоговыми окнами
 * После инициализации плагина диалоговых окон, необходимо установить setHandler
 *
 */


// Ожидание обработчика
let $DlgCoreComponent = null;
export const setDlgCoreComponent = (component) => {
  $DlgCoreComponent = component;
  runRemoveThinClient();
};
const runRemoveThinClient = () => {
  let element = dequeue();
  while (element){
    handlerFunc(element);
    element = dequeue();
  }
};

// очередь
const store = {};
let tail = 0;
let head = 0;

/**
 * Proxy для добавления модального окна
 */
const enqueue = (VueComponent, VueComponentProps, setting = {}) => {
  
  const element = {
    data: {
      VueComponent      : VueComponent,
      VueComponentProps : VueComponentProps,
      setting           : setting,
    },
    
    modalInfoObj: null,
  };


  // else {
  //   element.handlerObject = handlerFunc(element.data);
  // }

  
  const modalActionProxy = {
    open:   () => {
      if($DlgCoreComponent && !element.modalInfoObj) {
        element.modalInfoObj = $DlgCoreComponent.add(element.data);
      }
    },
    close:  () => {
      if(element.modalInfoObj) {
        $DlgCoreComponent && $DlgCoreComponent.remove(element.modalInfoObj);
      }
    },
  };


  if(!$DlgCoreComponent) {
    store[tail++] = element;
  } else {
    modalActionProxy.open();
  }

  return modalActionProxy;
};

// Получить элемент из очереди (с его удалением)
const dequeue = () => {
  if (tail === head)
    return undefined;
  const element = store[head];
  delete store[head++];
  return element;
};


export default enqueue; // add
