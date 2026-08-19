<template>
  <div>
    <h2>Confirm</h2>
    <p>Confirm example</p>
    <ul class="icon-list">
      <li><a href="#" @click.stop="showConfirmAdd">Show confirm add</a></li>
      <li><a href="#" @click.stop="showConfirmDelete">Show confirm delete</a></li>
      <li><a href="#" @click.stop="showConfirmCount2">Show 2 confirm</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ExampleBlockConfirm',

  methods: {
    showConfirmAdd() {
      const modal = this.$dialog.Confirm.add('Вы точно хотите добавить запись?', {
        onPositive(event) { console.log('onPositive', event) },
        onNegative(event) { console.log('onNegative', event) },
      })
      console.log(modal)
    },

    showConfirmDelete() {
      this.$dialog.Confirm.delete('Вы точно хотите удалить запись?', {
        onPositive(event) { console.log('onPositive', event) },
        onNegative(event) { console.log('onNegative', event) },
      })
    },

    showConfirmCount2() {
      this.showConfirmAdd()
      this.showConfirmDelete()
    },
  },
}
</script>

<style scoped>
@import 'ExampleBlock.css';
</style>
