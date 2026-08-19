<template>
  <div class="container-fluid py-2">
    <div class="mb-5">
      <span class="badge text-bg-primary mb-3">Fullscreen example</span>
      <h2 class="mb-3">Project overview</h2>
      <p class="lead text-body-secondary mb-0">
        A fullscreen window is useful when the content needs the whole viewport:
        dashboards, editors, reports or complex forms.
      </p>
    </div>

    <div class="row g-4 mb-5">
      <div class="col-12 col-md-4">
        <div class="card h-100">
          <div class="card-body">
            <div class="text-body-secondary small mb-2">Active dialogs</div>
            <div class="display-6">12</div>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-4">
        <div class="card h-100">
          <div class="card-body">
            <div class="text-body-secondary small mb-2">Window variants</div>
            <div class="display-6">8</div>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-4">
        <div class="card h-100">
          <div class="card-body">
            <div class="text-body-secondary small mb-2">Visible notifications</div>
            <div class="display-6">3</div>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-4">
      <div class="col-12 col-lg-8">
        <div class="card h-100">
          <div class="card-header">Recent changes</div>
          <div class="table-responsive">
            <table class="table table-hover mb-0">
              <thead>
                <tr>
                  <th>Area</th>
                  <th>Change</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Notification</td>
                  <td>Queue and hover pause</td>
                  <td><span class="badge text-bg-success">Done</span></td>
                </tr>
                <tr>
                  <td>Dialog</td>
                  <td>Alert, Confirm and Prompt</td>
                  <td><span class="badge text-bg-success">Done</span></td>
                </tr>
                <tr>
                  <td>Windows</td>
                  <td>Modal and sidebar sizing</td>
                  <td><span class="badge text-bg-warning">Example</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-4">
        <div class="card h-100">
          <div class="card-header">Typical fullscreen use cases</div>
          <div class="list-group list-group-flush">
            <div class="list-group-item">Data dashboard</div>
            <div class="list-group-item">Document editor</div>
            <div class="list-group-item">Long multi-step form</div>
            <div class="list-group-item">Detailed report</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExampleFullscreenContent',
}
</script>
