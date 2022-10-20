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

export default {
  name: 'ExampleBlockModal',
  methods: {
    showModal() {
      const props = {};
      const modal = this.$dialog.open(ExampleBlockModalAbout, props, {group: 'modal'});
    },
  },
};

</script>

<style scoped>

@import 'ExampleBlock.css';

</style>
