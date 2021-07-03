<template>
  <div id="app">
    <div @click="showAlertSuccess">showAlertSuccess</div>
    <div @click="showAlertWarning">showAlertWarning</div>
    <div @click="showAlertError">showAlertError</div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
  },
  methods: {
    showAlertSuccess() {
      this.$dialog.alert.success('Запись добавлена').then(res => {
        console.log(res); // {}
      });
    },
    showAlertWarning() {
      this.$dialog.alert.warning('Данный сервис не доступен, попробуйте через 5 минут').then(res => {
        console.log(res); // {}
      });
    },
    showAlertError() {
      this.$dialog.alert.error('Ошибка сервера').then(res => {
        console.log(res); // {}
      });
    },
  },
};
</script>
<style lang="scss">
</style>
