<template>
  <div class="px-3">
    <template v-if="variant === 'profile'">
      <div class="d-flex align-items-center gap-3 mb-4">
        <div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center flex-shrink-0" style="width: 48px; height: 48px;">
          VA
        </div>
        <div>
          <h5 class="mb-1">Vue Dialog</h5>
          <div class="text-body-secondary small">Application sidebar</div>
        </div>
      </div>

      <dl class="row mb-0">
        <dt class="col-5">Status</dt>
        <dd class="col-7">Active</dd>
        <dt class="col-5">Version</dt>
        <dd class="col-7">v3 prototype</dd>
        <dt class="col-5">Position</dt>
        <dd class="col-7">Right</dd>
      </dl>
    </template>

    <template v-else-if="variant === 'settings'">
      <h5 class="mb-4">Settings</h5>

      <div class="mb-3">
        <label class="form-label">Title</label>
        <input class="form-control" type="text" value="Example settings">
      </div>

      <div class="mb-3">
        <label class="form-label">Visibility</label>
        <select class="form-select">
          <option>Public</option>
          <option>Private</option>
        </select>
      </div>

      <button class="btn btn-primary" type="button">Save</button>
    </template>

    <template v-else>
      <h5 class="mb-3">Recent activity</h5>

      <div class="list-group list-group-flush">
        <div class="list-group-item px-0">
          <strong>Notification layer</strong>
          <div class="small text-body-secondary">Queue and hover pause</div>
        </div>
        <div class="list-group-item px-0">
          <strong>Dialog actions</strong>
          <div class="small text-body-secondary">Alert, Confirm and Prompt</div>
        </div>
        <div class="list-group-item px-0">
          <strong>Window variants</strong>
          <div class="small text-body-secondary">Modal, Fullscreen and Sidebars</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

type tSidebarRightVariant = 'profile' | 'settings' | 'activity'

export default defineComponent({
  name: 'ExampleSidebarRightContent',

  props: {
    variant: {
      type: String as PropType<tSidebarRightVariant>,
      default: 'profile',
    },
  },
})
</script>
