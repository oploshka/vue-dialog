/*
 *
 * Тонкий клиент для дальнейшей передачи в плагин с диалоговыми окнами
 * После инициализации плагина диалоговых окон, необходимо установить setHandler
 *
 */

const store = {};
let tail = 0;
let head = 0;

let handler = null;

const enqueue = (VueComponent, VueComponentProps, setting = {}) => {
  
  let handlerObject = null;
  
  const element = {
    VueComponent      : VueComponent,
    VueComponentProps : VueComponentProps,
    setting           : setting,
    //
    resolve           : null,
    handlerObject     : null,
  };
  
  const promise = new Promise((resolve ) => {
  
    element.resolve = resolve;
    
    if(!handler) {
      store[tail++] = element;
    } else {
      element.handlerObject = handler(element);
    }
    
  });
  
  promise.close = (closeData = {}) => {
    if(!element.handlerObject) {
      // TODO: add logic
      // store[tail++] = element;
      console.warn('DialogThinClient add close logic');
    } else {
      element.handlerObject.close(closeData);
    }
  };
  
  return promise;
};

// Получить элемент из очереди (с его удалением)
const dequeue = () => {
  if (tail === head)
    return undefined;
  let element = store[head];
  delete store[head++];
  return element;
};


export default enqueue; // add

export const setHandler = (handlerFunction) => {
  if(handler) {
    console.error('Duplicate setHandler');
    return;
  }
  handler = handlerFunction;
  
  let element = dequeue();
  while (element){
    handler(element);
    element = dequeue();
  }
};
