<template>
  <div class="container">
    <table class="striped" v-show="tasks.length > 0">
      <thead>
        <tr>
          <th>Model</th>
          <th>Submitted</th>
          <th>Expires</th>
          <th>Status</th>
          <th>View results</th>
          <th>Clear</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.uuid">
          <td>{{ task.filename }}</td>
          <td>{{ task.submitted | formatDate }}</td>
          <td>{{ task.expiry | formatDate }}</td>
          <td>
            <span v-show="task.status === 'QUEUED'">In queue</span>
            <span v-show="task.status === 'STARTED'">Started</span>
            <span v-show="task.status === 'FAILURE'">Failure</span>
            <span v-show="task.status === 'SUCCESS'">Completed</span>
            <span v-show="task.status === 'EXPIRED'">Expired</span>
            <span v-show="task.status === 'POLL_ERROR'">Unknown</span>
          </td>
          <td>
            <div class="preloader-wrapper small active" v-show="task.status === 'QUEUED'">
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
            <div class="progress" v-show="task.status === 'STARTED'">
              <!-- TODO: determinate progress -->
              <div class="indeterminate"></div>
            </div>
            <div v-show="task.status === 'FAILURE'">
              <p>
                An error occurred during test execution. Please let us know by
                <a href="https://github.com/opencobra/memote/issues">submitting an issue</a> with your full model and
                the error message below:
              </p>
              <p class="red-text" v-show="!task.failureMessage">
                Loading error report...
              </p>
              <p class="red-text" v-show="task.failureMessage">
                <strong>{{ task.failureException }}: {{ task.failureMessage }}</strong>
              </p>
            </div>
            <a v-show="task.status === 'SUCCESS'" class="btn memote-blue" :href="'report/' + task.uuid" target="_blank">
              <i class="material-icons left">done</i>
              View report
            </a>
            <span v-show="task.status === 'POLL_ERROR'" class="red-text">
              Could not retrieve results. Retrying automatically.
            </span>
          </td>
          <td>
            <a class="btn-flat" @click="clearTask(task)">
              <i class="material-icons">delete</i>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Tasks',
  methods: {
    clearTask(task) {
      this.$store.commit('clearTask', task);
    },
  },
  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
  },
  filters: {
    formatDate: date => moment(date).format('YYYY-MM-DD'),
  },
};
</script>
