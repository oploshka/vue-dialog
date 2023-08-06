
# Vue Dialog - показ диалоговых окон для Vue 3
Это обобщенный каркас для показа диалоговых окон, alert'ов, confirm'ов.
Есть ряд подготовленных шаблонов, но что использовать в конечном итоге решаете Вы.

Мы постарались не перегружать компоненты готовыми стилями и упростить кастомизацию,
по этой причине установка, будет чуть сложнее (чем обычно).

Отличия от других:
- Решение использует "тонкий клиент", 
  по этому вы можете работать с модальными окнами,
  до загрузки Vue App 
  (Отображение произойдет после инициализации приложения).
- Возможность задать свои алисы для модальных окон 
  (пример: alertSuccess, alertWarning, alertError)
- Мы не наслаиваем модальные окон друг на друга, 
  а предлагаем отображать друг за другом, 
  в том количестве которое приемлемо вам.
- Не используем template для отображения модального окна. Показ модального окна через код
- Не предлагаем использовать кучу параметров,
  для задания ширины и высоты модального окна
  их адаптивности и тп. Для этого есть стили.
  

## Setup

<details>
<summary><b style="font-size: 1.3em;">Установка (сложнее чем обычно)</b></summary>

### Шаг 1
```bash
yarn add vue-dlg
# Or using npm
npm install vue-dlg --save
```

### Шаг 2
- Создайте папку в удобном месте для файлов настроек плагина. Предположим "./plugin/vue-dlg". 
- Cкопируйте содержимое папки ./example/plugin-install из репозитория в "./plugin/vue-dlg".

В данной папке находятся пример как можно настраивать данный плагин.
Вы можете менять данные настройки под себя.
Прочитать про настройки можно в doc/readme-plugin-install.md


### Шаг 3
Add dependencies to your `main.js`:
<details>
<summary><b style="font-size: 1.3em;">main.js</b></summary>

```js
import { createApp } from 'vue';
// [ADD]
import vueDlgPluginProxy from './plugin/vue-dlg'
// ...

let app = createApp(App)
// [ADD]
app.use(vueDlgPluginProxy);
// ...
app.use(router);
app.mount('#app');

```

</details>


### Шаг 4
Add the global component to your `App.vue`:

<details>
<summary><b style="font-size: 1.3em;">App.vue</b></summary>

```vue
<template>
  <VueDlgCore />
  <!-- -->
  <router-view />
</template>

<script>
import DialogCore from "vue-dlg/src/VueDlgCore";

export default {
  component: {
    VueDlgCore,
    // ...
  }
  // ...
}
</script>
```

</details>



</details>



## Пример использования

### Простые Alert
```js
export default {
  // vue component
  // ...
  methods: {
    showAlertSuccess() {
      this.$dialog.alert.success('Запись добавлена');
      // TODO: дописать как слушать закрытие
    },
    showAlertWarning() {
      this.$dialog.alert.warning('Данный сервис не доступен, попробуйте через 5 минут');
      // TODO: дописать как слушать закрытие
    },
    showAlertError() {
      this.$dialog.alert.error('Ошибка сервера');
      // TODO: дописать как слушать закрытие
    }
  }
}
```

### Произвольный компонент в модальном окне
```js
// props: {
//   fullName: String,
//   year: Number
// },
// emit: ['save']
import ArbitraryComponent from "./ArbitraryComponent";

export default {
  mounted() {

    let modal = null;
    const closeModal = () => { modal && modal.close(); };
    const props = {
      // data
      fullName: 'Tester',
      year: 2014,
      // events (добавляем приставку on к emit: ['save'])
      onSave: (saveObj) => {
        console.log(saveObj);
        closeModal();
      },
    };
    //
    modal = this.$dialog.open(ArbitraryComponent, props, { group: "modal", theme: "community", close: true });
    
    // TODO: поправить // modal.then(() => { modal = null; });
    
  },
};
```

### Использование дополнительной обертки
В редких случаях может понадобиться использовать дополнительную обертку для отображения компонента 
и добавления специфичной логики связанное с модальным окном.
В таком варианте вы можете дополнительно передавать функции и делать поведение более гибким.
Но не стоит этим увлекаться.

Вызов модального окна, не отличается от предыдущего примера,
а обертки могут быть на любой вкус 
(от универсальных, до заточенных под конкретный компонент).
По этой примчине мы не будем приводить пример.

## Options $dialog.open

| Name              | Type               | Required | Default value   | Info                                  |
| ----------------- | ------------------ | -------- | --------------- | ------------------------------------- |
| VueComponent      | VueComponent       | Yes      |                 | Vue component that opens in a modal   |
| VueComponentProps | Object             | Yes      | {}              | Vue component props data              |
| settings          | Object             | No       | {group: "modal"}| Настройки для диалоговых окон         |



