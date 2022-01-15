
# Vue Dialog - показ диалоговых окон для Vue JS

## Setup

```bash
yarn add vue-dlg
# Or using npm
npm install vue-dlg --save
```

Create file `install-vue-dlg.js`:
<details>
<summary><b style="font-size: 1.3em;">install-vue-dlg.js</b></summary>

```js
// Тонкий клиент
import DialogThinClient from '@vue-dlg/DialogThinClient';
// Темплейты модальных окон
import DialogBox        from "@vue-dlg/Template/DialogBox";
import DialogNotify     from "@vue-dlg/Template/DialogNotify";
// Установка плагина
import vueDlgPlugin from "@vue-dlg/plugin";
// настройки для плагина
import {addGroupSetting} from "@vue-dlg/DialogGroupSettings";

// задаем настройки для разных групп
addGroupSetting('modal', {
  maxDisplayItem: 1,
  overlay      : true,
});

addGroupSetting('notify', {
  maxDisplayItem: 3,
  overlay      : false,
});

// задаем стили для групп
import './style.scss'

// настраиваем список модальных окон
const dialogAction = {
  open: DialogThinClient, // function (VueComponent, VueComponentProps, groupName, setting)

  alert: (message) => {
    return DialogThinClient(
      DialogBox,
      { title: "Успешно", message: message, okLabel: 'Ok', theme: "success", },
      'modal'
    );
  },

  confirm(message, options = {}){
    return DialogThinClient(
      DialogBox,
      {
        title: "Подтвердите действие",
        message: message,
        okLabel: (options && options.okLabel) ? options.okLabel : 'Ok',
        cancelLabel: (options && options.cancelLabel) ? options.cancelLabel : 'Отмена',
      },
      'modal'
    );
  },

  notify: (title, message) => {
    return DialogThinClient(
      DialogNotify,
      { title: title, message: message },
      'notify'
    );
  }
};

// фасад для установки плагина (чтоб не перегружать основной main.js) 
export default {
  install: (app) => {
    vueDlgPlugin.install(app, {action: dialogAction})
  }
};
```
</details>

Add dependencies to your `main.js`:
<details>
<summary><b style="font-size: 1.3em;">main.js</b></summary>

```js
import { createApp } from 'vue';
// [ADD]
import vueDlgPlugin from './install-vue-dlg.js'
// ...

let app = createApp(App)
// [ADD]
app.use(vueDlgPlugin);
// ...
app.use(router);
app.mount('#app');

```

</details>


Add the global component to your `App.vue`:

<details>
<summary><b style="font-size: 1.3em;">App.vue</b></summary>

```vue
<template>
  <DialogCore />
  <!-- -->
  <router-view />
</template>

<script>
import DialogCore from "@vue-dlg/DialogCore";

export default {
  component: {
    DialogCore,
    // ...
  }
  // ...
}
</script>
```

</details>



## Options DialogThinClient.add

| Name              | Type               | Required | Default value | Info                                  |
| ----------------- | ------------------ | -------- | ------------- | ------------------------------------- |
| VueComponent      | VueComponent       | Yes      |               | Vue component that opens in a modal   |
| VueComponentProps | Object             | Yes      |               | Vue component props data              |
| group             | String             | No       |               | Имя группы в которой будет отображаться уведомление |
| settings          | Object             | No       | {}            | Зарезервированные настройки           |

