<template>
  <div>
    <h2>Confirm</h2>
    <p>Confirm example</p>
    <ul class="icon-list">
      <li><a href="#" @click.stop="showConfirmAdd">Show confirm add</a></li>
      <li><a href="#" @click.stop="showConfirmDelete">Show confirm delete</a></li>
      <li><a href="#" @click.stop="showConfirmCountr3">Show 2 confirm</a></li>
    </ul>
  </div>
</template>


<script>

export default {
  name: 'ExampleBlockConfirm',
  methods: {
    // Confirmation
    showConfirmation() {
      this.$dialog.confirm.add({
        message: 'Вы точно хотите это сделать?',
        onPositive(event) { console.log('onPositive', event); },
        onNegative(event) { console.log('onNegative', event); },
      });
    },
    showConfirmAdd() {
      const modal = this.$dialog.confirm.add({
        message: 'Вы точно хотите это сделать?',
        onPositive(event) { console.log('onPositive', event); },
        onNegative(event) { console.log('onNegative', event); },
      });
    },
    showConfirmDelete() {
      const modal = this.$dialog.confirm.delete({
        message: 'Вы точно хотите это сделать?',
        onPositive(event) { console.log('onPositive', event); },
        onNegative(event) { console.log('onNegative', event); },
      });
    },
    showConfirmCountr3() {
      this.showConfirmAdd();
      this.showConfirmDelete();
    },
  },
};

</script>

<style scoped>

@import 'ExampleBlock.css';

</style>
