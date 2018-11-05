<template>
  <div class="container">
    <table class="striped" v-if="tasks.length > 0">
      <thead>
        <tr>
          <th>UUID</th>
          <th>Submitted</th>
          <th>Status</th>
          <th>View results</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.uuid">
          <td>{{ task.uuid }}</td>
          <td>{{ task.submitted }}</td>
          <td>
            <span v-if="task.status === 'QUEUED'">In queue</span>
            <span v-if="task.status === 'STARTED'">Started</span>
            <span v-if="task.status === 'FAILURE'">Errored</span>
            <span v-if="task.status === 'SUCCESS'">Completed</span>
            <span v-if="task.status === 'EXPIRED'">Expired</span>
            <span v-if="task.status === 'POLL_ERROR'">Unknown</span>
          </td>
          <td>
            <div class="preloader-wrapper small active" v-if="task.status === 'QUEUED'">
              <div class="spinner-layer spinner-green-only">
                <div class="circle-clipper left">
                  <div class="circle"></div>
                </div><div class="gap-patch">
                  <div class="circle"></div>
                </div><div class="circle-clipper right">
                  <div class="circle"></div>
                </div>
              </div>
            </div>
            <div class="progress" v-if="task.status === 'STARTED'">
              <!-- TODO: determinate progress -->
              <div class="indeterminate"></div>
            </div>
            <p v-if="task.status === 'FAILED'">View error report (TODO)</p>
            <a v-if="task.status === 'SUCCESS'" class="btn" :href="'report/' + task.uuid" target="_blank">
              <i class="material-icons left">done</i>
              View report
            </a>
            <span v-if="task.status === 'POLL_ERROR'" class="red-text">
              Could not retrieve results. Retrying automatically.
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Tasks',
  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
  }
}
</script>
