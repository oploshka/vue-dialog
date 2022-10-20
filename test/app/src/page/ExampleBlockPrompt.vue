<template>
  <div>
    <h2>Prompt</h2>
    <p>Prompt example</p>
    <ul class="icon-list">
      <li><a href="#" @click.stop="showPrompt">Show prompt</a></li>
    </ul>
  </div>
</template>


<script>

export default {
  name: 'ExampleBlockPrompt',
  methods: {
    // Confirmation
    showPrompt() {
      //
      const modal = this.$dialog.prompt({
        message: 'Send your name',
        onSubmit: (event) => {

          if(!event.value) {
            console.warn('Not close modal!!!')
            modal.open();
            return;
          }
          // Важно!!! onSubmit: (event) => {}
          this.$dialog.alert.success('Hello ' + event.value);
        },
      });
      //
    },
  },
};

</script>

<style scoped>

@import 'ExampleBlock.css';

</style>
