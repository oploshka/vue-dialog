<template>
  <div>
    <h2>Alert</h2>
    <p>Alert examples</p>
    <ul class="icon-list">
      <li><a href="#" @click.stop="showAlertSuccess">Show alert success</a></li>
      <li><a href="#" @click.stop="showAlertWarning">Show alert warning</a></li>
      <li><a href="#" @click.stop="showAlertError">Show alert error</a></li>
      <li><a href="#" @click.stop="showAlertCountr3">Show 3 alert</a></li>
    </ul>
  </div>
</template>


<script>

export default {
  name: 'ExampleBlockAlert',
  methods: {
    showAlertSuccess() {
      const modal = this.$dialog.alert.success({ message: 'Запись добавлена' });
      console.log(modal);
    },
    showAlertWarning() {
      this.$dialog.alert.warning({ message: 'Данный сервис не доступен, попробуйте через 5 минут'});
    },
    showAlertError() {
      this.$dialog.alert.error({ message: 'Ошибка сервера' });
    },
    showAlertCountr3() {
      this.showAlertSuccess();
      this.showAlertWarning();
      this.showAlertError();
    },
  },
};

</script>

<style scoped>

@import 'ExampleBlock.css';

</style>