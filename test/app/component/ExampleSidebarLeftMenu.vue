<template>
  <div class="pe-3">
    <h5 class="mb-3 px-2">Navigation</h5>

    <nav class="nav nav-pills flex-column gap-1">
      <a class="nav-link active" href="#" @click.prevent>Dashboard</a>
      <a class="nav-link" href="#" @click.prevent>Projects</a>
      <a class="nav-link" href="#" @click.prevent>Messages</a>
      <a class="nav-link" href="#" @click.prevent>Team</a>
      <a class="nav-link" href="#" @click.prevent>Settings</a>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'ExampleSidebarLeftMenu',
}
</script>
