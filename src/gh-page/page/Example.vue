<template>
  <div>

    <h2 class="mb-5">Examples of how this plugin works</h2>
    <!--
    <p class="fs-5 col-md-8">Quickly and easily get started with Bootstrap's compiled, production-ready files with this barebones example featuring some basic HTML and helpful links. Download all our examples to get started.</p>
    <div class="mb-5">
      <a href="#" class="btn btn-primary btn-lg px-4">Download examples</a>
    </div>
    <hr class="col-3 col-md-2 mb-5">
    -->

    <div class="row">
      <div class="col-md-4">
        <ExampleBlockAlert/>
      </div>

      <div class="col-md-4">
        <ExampleBlockConfirm/>
      </div>

      <div class="col-md-4">
        <ExampleBlockPrompt/>
      </div>

      <div class="col-md-4">
        <ExampleBlockNotify/>
      </div>

      <div class="col-md-4">
        <ExampleBlockModal/>
      </div>

    </div>

  </div>
</template>

<script>

import ExampleBlockAlert    from '@vue-dlg-page/page/ExampleBlockAlert.vue';
import ExampleBlockConfirm  from '@vue-dlg-page/page/ExampleBlockConfirm.vue';
import ExampleBlockPrompt   from '@vue-dlg-page/page/ExampleBlockPrompt.vue';
import ExampleBlockNotify   from '@vue-dlg-page/page/ExampleBlockNotify.vue';
import ExampleBlockModal    from '@vue-dlg-page/page/ExampleBlockModal.vue';

export default {
  name: 'work-example',
  components: {
    ExampleBlockPrompt,
    ExampleBlockAlert,
    ExampleBlockConfirm,
    ExampleBlockNotify,
    ExampleBlockModal,
  },
  methods: {
  },
};
</script>

<style scoped>
.icon-list {
  padding-left: 0;
  list-style: none;
}
.icon-list li {
  display: flex;
  align-items: flex-start;
  margin-bottom: .25rem;
}
.icon-list li::before {
  display: block;
  flex-shrink: 0;
  width: 1.5em;
  height: 1.5em;
  margin-right: .5rem;
  content: "";
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23212529' viewBox='0 0 16 16'%3E%3Cpath d='M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z'/%3E%3C/svg%3E") no-repeat center center / 100% auto;
}
</style>
