<template>
  <div>
    <div class="modal-header pe-5">
      <div>
        <div class="small text-body-secondary text-uppercase mb-1">{{ size }} modal</div>
        <h5 class="modal-title">Nested modal example</h5>
      </div>
    </div>

    <div class="modal-body">
      <p class="mb-3">
        This content uses Bootstrap classes and can open another modal above itself.
      </p>

      <div class="alert alert-light border mb-0">
        Close the top window to return to the previous one and inspect stacking and transitions.
      </div>
    </div>

    <div class="modal-footer justify-content-between">
      <div class="d-flex flex-wrap gap-2">
        <button
          v-for="nextSize in nextModalSizes"
          :key="nextSize"
          class="btn btn-primary"
          type="button"
          @click="openModal(nextSize)"
        >
          Open {{ nextSize }} modal
        </button>
      </div>

      <button
        class="btn btn-outline-secondary"
        type="button"
        @click="notify()"
      >
        Show notification
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

type tModalSize = 'small' | 'medium' | 'large'

export default defineComponent({
  name: 'ExampleModalContent',

  props: {
    size: {
      type: String as PropType<tModalSize>,
      required: true,
    },
    openModal: {
      type: Function as PropType<(size: tModalSize) => void>,
      required: true,
    },
    notify: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },

  computed: {
    nextModalSizes(): tModalSize[] {
      if (this.size === 'large') return ['medium', 'small']
      if (this.size === 'medium') return ['small']
      return []
    },
  },
})
</script>
