<template>
  <div>
    <h2>Modal</h2>
    <p>Modal example</p>
    <ul class="icon-list">
      <li><a href="#" @click.stop="showModal">Show modal</a></li>
    </ul>
  </div>
</template>


<script>

import ExampleBlockModalAbout from '@/page/ExampleBlockModalAbout';

import {reactive} from "vue";

export default {
  name: 'ExampleBlockModal',
  methods: {
    showModal() {
      // если нужна реактивность пропсов
      const props = reactive({ version: '213' });
      // const props = { version: '213' }; // Так реактивности props не будет, но аккуратнее с объектами
      const modal = this.$dialog.open(ExampleBlockModalAbout, props, {group: 'modal'});
      console.log(modal, props);
    },
  },
};

</script>

<style scoped>

@import 'ExampleBlock.css';

</style>
