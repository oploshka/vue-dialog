

## In your component

### alert

```js
//...
methods: {
  showAlertSuccess() {
    this.$dialog.alert.success('Запись добавлена').then(res => {
      console.log(res) // {}
    })
  },
  showAlertWarning() {
    this.$dialog.alert.warning('Данный сервис не доступен, попробуйте через 5 минут').then(res => {
      console.log(res) // {}
    })
  },
  showAlertError() {
    this.$dialog.alert.error('Ошибка сервера').then(res => {
      console.log(res) // {}
    })
  },
}
//...
```

[comment]: <> (![]&#40;alert.gif&#41;)

### confirm

```js
// TODO: warning - the method is under development
methods: {
  showConfirmDelete() {
    this.$dialog.confirm.delete('Your message!').then(res => {
      console.log(res) // TODO fix return value {}
    })
  }

}
//...
```

[comment]: <> (![]&#40;confirm.gif&#41;)

### prompt

```js
// TODO: warning - the method is under development
methods: {
  showPrompt() {
    this.$dialog.prompt.string('Your message!').then(res => {
      console.log(res) // TODO fix return value {}
    })
  }
}
//...
```

[comment]: <> (![]&#40;prompt.gif&#41;)

## Sample custom dialog open

Create your own vue component (TestDialogComponent.vue)
```html
<template>
  <div>
    <div>Test message: {{message}}</div>
    <div @click="$emit('close', {returnData: 'close'})">close</div>
  </div>
</template>

<script>
export default {
  props: {
    message: String
  },
}
</script>
```


```js

import TestDialogComponent from './TestDialogComponent.vue';

methods: {
  opentTestDialog() {
    this.$dialog.open(TestDialogComponent, { message: "Hello"}, {theme: "success", close: {} }).then(res => {
      console.log(res) 
    })
  }
}
//...
```









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
