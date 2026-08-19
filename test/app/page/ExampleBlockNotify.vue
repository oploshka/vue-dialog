<template>
  <div>
    <h2>Notification</h2>
    <p>Notification examples</p>

    <ul class="icon-list">
      <li><a href="#" @click.prevent="showNotificationInfo">Show notification info</a></li>
      <li><a href="#" @click.prevent="showNotificationSuccess">Show notification success</a></li>
      <li><a href="#" @click.prevent="showNotificationWarning">Show notification warning</a></li>
      <li><a href="#" @click.prevent="showNotificationError">Show notification error</a></li>
      <li><a href="#" @click.prevent="showNotificationCount3">Show 3 notifications</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ExampleBlockNotify',

  methods: {
    showNotificationInfo() {
      this.$dialog.Notification.info('Запущено', 'Обработка начата');
    },
    showNotificationSuccess() {
      this.$dialog.Notification.success('Успешно', 'Запись добавлена');
    },

    showNotificationWarning() {
      this.$dialog.Notification.warning('Предупреждение', 'Данный сервис не доступен, попробуйте через 5 минут');
    },

    showNotificationError() {
      this.$dialog.Notification.error('Ошибка сервера', 'Произошла не известная ошибка');
    },

    showNotificationCount3() {
      this.showNotificationSuccess();
      this.showNotificationWarning();
      this.showNotificationError();
    },
  },
}
</script>

<style scoped>
@import 'ExampleBlock.css';
</style>
