<template>
  <div class="pe-3">
    <h5 class="mb-3 px-2">Navigation</h5>

    <nav class="nav nav-pills flex-column gap-1">
      <a class="nav-link active" href="#" @click.prevent>Dashboard</a>
      <a class="nav-link" href="#" @click.prevent>Projects</a>
      <a class="nav-link" href="#" @click.prevent>Messages</a>
      <a class="nav-link" href="#" @click.prevent>Team</a>
      <a class="nav-link" href="#" @click.prevent>Settings</a>

      <hr class="my-2">

      <a class="nav-link" href="#" @click.prevent="showNotification()">
        Show notification
      </a>
      <a class="nav-link" href="#" @click.prevent="openModal('small')">
        Open small modal
      </a>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

type tModalSize = 'small' | 'medium' | 'large'

export default defineComponent({
  name: 'ExampleSidebarLeftMenu',

  props: {
    showNotification: {
      type: Function as PropType<() => void>,
      required: true,
    },
    openModal: {
      type: Function as PropType<(size: tModalSize) => void>,
      required: true,
    },
  },
})
</script>
