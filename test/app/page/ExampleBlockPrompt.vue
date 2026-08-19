<template>
  <div>
    <h2>Prompt</h2>
    <p>Prompt example</p>
    <ul class="icon-list">
      <li><a href="#" @click.stop="showPromptText">Show prompt text</a></li>
      <li><a href="#" @click.stop="showPromptChoice">Show prompt choice</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ExampleBlockPrompt',

  methods: {
    showPromptText() {
      const modal = this.$dialog.Prompt.text('Как к Вам обратиться?', {
        title: 'Введите имя',
        onSubmit: (event) => {
          console.log('submit', event)
          this.$dialog.Alert.success('Hello ' + event.value)
        },
        onCancel(event) {
          console.log('cancel', event)
        },
      })
      console.log(modal)
    },

    showPromptChoice() {
      this.$dialog.Prompt.choice([
        { id: 1, name: 'Первый вариант' },
        { id: 2, name: 'Второй вариант' },
        { id: 3, name: 'Третий вариант' },
      ], {
        title: 'Выберите вариант',
        onSubmit(event) {
          console.log('choice', event.value)
        },
        onCancel(event) {
          console.log('cancel', event)
        },
      })
    },
  },
}
</script>

<style scoped>
@import 'ExampleBlock.css';
</style>
