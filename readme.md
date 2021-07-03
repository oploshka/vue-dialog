# vue-dialog

## Показ диалоговых окон для Vue JS
Данное решение основано на [v-slim-dialog](https://github.com/paliari/v-slim-dialog).
Данный плагин был просто взят за основу и практически переписан полностью.
Данное решение связано с простотой данного плагина и я не сильно хотел верстать и писать стили.
Pug был конвертирован в html, stylus в scss (это дело вкуса).
Длинные имена классов переименованы в более короткие.
Добавлена возможность конфигурировать стили и расширен функционал.


## Размер
Данный плагин в сбилженной версии занимает ~15Кб, а сами исходники без сжатия ~10Кб. 
Странный парадокс, но интеграции не сбилженной версии лучше.
Возможно, нужно собирать по другому (буду рад узнать как).

## Installation

```bash
yarn add vue-dlg
# Or using npm
npm install vue-dlg --save
```

# Usage

```js
import Vue from 'vue';

import VueDialog from 'vue-dlg';

Vue.use(VueDialog);
```

## Options Dlg.open

| Name              | Type               | Required | Default value | Info                                  |
| ----------------- | ------------------ | -------- | ------------- | ------------------------------------- |
| componentVue      | componentVue       | Yes      |               | Vue component that opens in a modal   |
| componentVueData  | Object             | Yes      |               | Data for open vue component           |
| settings          | Object             | No       | Cancel        | Modal settings                        |

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
