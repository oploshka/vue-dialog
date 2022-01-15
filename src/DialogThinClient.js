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

const enqueue = (VueComponent, VueComponentProps, groupName, setting = {}) => {
  return new Promise((resolve ) => {
  
    const element = {
      VueComponent      : VueComponent,
      VueComponentProps : VueComponentProps,
      groupName         : groupName,
      setting           : setting,
      //
      resolve           : resolve,
    };
    if(!handler) {
      store[tail++] = element;
    } else {
      handler(element);
    }
    
  });
  
};

// Получить элемент из очереди (с его удалением)
const dequeue = () => {
  if (tail === head)
    return undefined
  let element = store[head];
  delete store[head++];
  return element;
}


export default enqueue; // add

export const setHandler = (handlerFunction) => {
  if(handler) {
    console.error('Duplicate setHandler')
    return;
  }
  handler = handlerFunction;
  
  let element = dequeue();
  while (element){
    handler(element);
    element = dequeue();
  }
};
