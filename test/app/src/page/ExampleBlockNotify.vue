<template>
  <div>
    <h2>Notify</h2>
    <p>Notify examples</p>
    <ul class="icon-list">
      <li><a href="#" @click.stop="showNotifySuccess">Show notify success</a></li>
      <li><a href="#" @click.stop="showNotifyWarning">Show notify warning</a></li>
      <li><a href="#" @click.stop="showNotifyError">Show notify error</a></li>
      <li><a href="#" @click.stop="showNotifyCountr3">Show 3 notify</a></li>
    </ul>
  </div>
</template>


<script>

export default {
  name: 'ExampleBlockNotify',
  methods: {
    showNotifySuccess() {
      const modal = this.$dialog.notify.success('Успешно', 'Запись добавлена');
    },
    showNotifyWarning() {
      this.$dialog.notify.warning('Предупреждение', 'Данный сервис не доступен, попробуйте через 5 минут');
    },
    showNotifyError() {
      this.$dialog.notify.error('Ошибка сервера', 'Произошла не известная ошибка');
    },
    showNotifyCountr3() {
      this.showNotifySuccess();
      this.showNotifyWarning();
      this.showNotifyError();
    },
  },
};

</script>

<style scoped>

@import 'ExampleBlock.css';

</style>