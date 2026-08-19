<template>
  <div>
    <h2 class="mb-5">Examples of how this plugin works</h2>

    <div class="row g-4 mb-5">
      <div class="col-12 col-md-6 col-xl-3">
        <div class="h-100 border rounded-3 p-3">
          <ExampleBlockAlert />
        </div>
      </div>

      <div class="col-12 col-md-6 col-xl-3">
        <div class="h-100 border rounded-3 p-3">
          <ExampleBlockConfirm />
        </div>
      </div>

      <div class="col-12 col-md-6 col-xl-3">
        <div class="h-100 border rounded-3 p-3">
          <ExampleBlockPrompt />
        </div>
      </div>

      <div class="col-12 col-md-6 col-xl-3">
        <div class="h-100 border rounded-3 p-3">
          <ExampleBlockNotify />
        </div>
      </div>

      <div class="col-12 col-md-6 col-xl-3">
        <div class="h-100 border rounded-3 p-3">
          <ExampleBlockModal />
        </div>
      </div>

      <div class="col-12 col-md-6 col-xl-3">
        <div class="h-100 border rounded-3 p-3">
          <ExampleBlockFullscreen />
        </div>
      </div>

      <div class="col-12 col-md-6 col-xl-3">
        <div class="h-100 border rounded-3 p-3">
          <ExampleBlockSidebarLeft />
        </div>
      </div>

      <div class="col-12 col-md-6 col-xl-3">
        <div class="h-100 border rounded-3 p-3">
          <ExampleBlockSidebarRight />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ExampleBlockAlert from '@app/page/ExampleBlockAlert.vue'
import ExampleBlockConfirm from '@app/page/ExampleBlockConfirm.vue'
import ExampleBlockPrompt from '@app/page/ExampleBlockPrompt.vue'
import ExampleBlockNotify from '@app/page/ExampleBlockNotify.vue'
import ExampleBlockModal from '@app/page/ExampleBlockModal.vue'
import ExampleBlockFullscreen from '@app/page/ExampleBlockFullscreen.vue'
import ExampleBlockSidebarLeft from '@app/page/ExampleBlockSidebarLeft.vue'
import ExampleBlockSidebarRight from '@app/page/ExampleBlockSidebarRight.vue'

export default {
  name: 'work-example',

  components: {
    ExampleBlockAlert,
    ExampleBlockConfirm,
    ExampleBlockPrompt,
    ExampleBlockNotify,
    ExampleBlockModal,
    ExampleBlockFullscreen,
    ExampleBlockSidebarLeft,
    ExampleBlockSidebarRight,
  },
}
</script>
