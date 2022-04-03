

## In your component


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








