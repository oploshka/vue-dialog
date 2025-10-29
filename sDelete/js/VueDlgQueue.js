
// Очередь оптимизированная для тонкого клиента
// TODO: возможно стоит переделать под класс

const store = {};
let tail = 0;
let head = 0;


// Вставить элемент в очередь
export const add = (element) => {
  store[tail++] = element;
};

// Получить элемент из очереди (с его удалением)
export const dequeue = () => {
  if (tail === head)
    return undefined;
  const element = store[head];
  delete store[head++];
  return element;
};
