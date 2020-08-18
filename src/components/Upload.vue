<template>
  <div class="container center-align center-box">
    <label class="label-upload">
      Upload Your Model
    </label>
    <div class="row">
      <div class="col s2">
      </div>
      <div class="col s8">
        <div
          v-bind:class="'form-group files ' + dragging"
          @dragenter="dragEnter"
          @dragover="dragOver"
          @dragleave="dragLeave"
          @drop="drop">
          <input
            type="file"
            ref="modelInput"
            class="form-control"
            accept="text/xml,.json,.xml.gz,.xml.bz2,.sbml.gz,.sbml.bz2"
            @change="uploadFile"
          >
        </div>
      </div>
      <div class="col s2">
        <div class="sampleModel">
          <i class="material-icons left">reply</i>
          <img src="@/assets/e_coli_core.svg" draggable="true" @dragstart="dragStart">
          <br>
          Drag &amp; drop me! <sup>1</sup>
        </div>
      </div>
    </div>
    <div class="progress" v-show="uploading">
      <div class="determinate" :style="'width: ' + uploadProgress + '%'"></div>
    </div>
    <div class="card blue-grey darken-1">
      <div class="card-content orange white-text">
        <span class="card-title">Service announcement</span>
        <p>
          We are currently experiencing problems with the MEMOTE web service
          struggling with larger models. We are working on a solution but it
          might take a while to debug. Please consider using MEMOTE locally
          (see <a href="https://memote.readthedocs.io/">Documentation</a>)
          in the meantime. If you happen to be a savvy web developer, consider
          getting involved in MEMOTE's development (contact us at niso@dtu.dk) 👍.
        </p>
      </div>
    </div>
    <div class="card blue-grey darken-1" v-show="uploadError">
      <div class="card-content red white-text">
        <span class="card-title">Could not upload your model</span>
        <p>
          We're sorry, we encountered a network issue while trying to upload your model. Please check your internet
          connection, and try again in a short while.
        </p>
      </div>
    </div>

    <div v-if="parseError">
      <h4>{{ parseError.title }}</h4>
      <div class="row">
        <p class="col s8 offset-s2">
          We're sorry, we encountered an issue while trying to parse your model. Look below for a detailed error report.
          If this is an SBML model, try submitting it to <a href="http://sbml.org/Facilities/Validator/">the SBML
          Validator</a> to discover potential issues. If you believe your model is syntactically valid, please reach out
          to us on <a href="https://gitter.im/opencobra/memote">gitter</a>, or open an issue on
          <a href="https://github.com/opencobra/memote/issues">github</a>.
        </p>
      </div>

      <div class="card blue-grey darken-1" v-for="warning in parseError.warnings" :key="warning">
        <div class="card-content orange white-text">
          <p>{{ warning }}</p>
        </div>
      </div>

      <div class="card blue-grey darken-1" v-for="error in parseError.errors" :key="error">
        <div class="card-content red white-text">
          <p>{{ error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as axios from 'axios';
import * as moment from 'moment';
import exampleModel from '@/assets/e_coli_core.json';
import settings from '@/settings';

export default {
  data: () => ({
    dragging: '',
    uploading: false,
    uploadProgress: null,
    uploadError: false,
    parseError: null,
  }),
  methods: {
    dragStart(event) {
      event.dataTransfer.setData('text/plain', 'sample-model');
    },
    dragEnter() {
      this.dragging = 'dragging';
    },
    dragOver(event) {
      this.dragging = 'dragging';
      event.preventDefault();
    },
    dragLeave() {
      this.dragging = '';
    },
    drop(event) {
      this.dragging = '';
      const src = event.dataTransfer.getData('text/plain');
      if (src === 'sample-model') {
        this.submitExampleModel();
        event.preventDefault();
      }
    },
    submitExampleModel() {
      const formData = new FormData();
      const blob = new Blob([JSON.stringify(exampleModel)], { type: 'application.json' });
      formData.append('model', blob, 'e_coli_core.json');
      this.submitModel(formData);
    },
    uploadFile() {
      if (!this.$refs.modelInput.files) {
        return;
      }
      const formData = new FormData();
      formData.append('model', this.$refs.modelInput.files[0]);
      this.submitModel(formData);
    },
    submitModel(formData) {
      this.uploading = true;
      this.uploadProgress = 0;
      this.uploadError = false;
      this.parseError = null;

      axios
        .post(`${settings.api}/submit`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            this.uploadProgress = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total), 10);
          },
        }).then((response) => {
          this.$store.commit('addTask', {
            uuid: response.data.uuid,
            filename: formData.get('model').name,
            submitted: moment().toJSON(),
            expiry: moment().add(settings.resultExpires, 'days').toJSON(),
            status: 'QUEUED',
            failureException: null,
            failureMessage: null,
          });
        }).catch((error) => {
          if (error.response) {
            this.parseError = {};
            if (error.response.data.code === 'sbml_validation_failure') {
              // SBML validation errors return warnings and errors explicitly
              this.parseError.title = 'SBML Validation failed';
              this.parseError.warnings = error.response.data.warnings;
              this.parseError.errors = error.response.data.errors;
            } else {
              // Other errors contain a single 'message' text field
              this.parseError.title = 'Could not parse your model';
              this.parseError.warnings = [];
              this.parseError.errors = [error.response.data.message];
            }
          } else {
            this.uploadError = true;
          }
        }).then(() => {
          this.$refs.modelInput.value = '';
          this.uploading = false;
        });
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 24px;
  font-weight: bold;
}

.card-content.white-text a {
  color: #fff;
  text-decoration: underline;
}

.sampleModel {
  max-width: 100px;
}

.sampleModel .material-icons {
  font-size: 70px;
  color: #A3D0E0;
}

.sampleModel img {
  width: 70px;
}

.label-upload {
  font-size: 24px;
  font-weight: bold;
  color: rgba(0,0,0,0.87);
}

.files.dragging {
  opacity: 0.4;
}

.files input {
  outline: 2px dashed #2a7bb8;
  outline-offset: -10px;
  -webkit-transition: outline-offset .15s ease-in-out, background-color .15s linear;
  transition: outline-offset .15s ease-in-out, background-color .15s linear;
  padding: 120px 0px 85px 20%;
  text-align: center !important;
  box-sizing:border-box;
  -moz-box-sizing:border-box; /* Firefox */
  -webkit-box-sizing:border-box; /* Safari */
  cursor:pointer;
  display: block;
  width: 100%;
}
.files input:focus{
  outline: 2px dashed #2a7bb8;
  outline-offset: -10px;
  -webkit-transition: outline-offset .15s ease-in-out, background-color .15s linear;
  transition: outline-offset .15s ease-in-out, background-color .15s linear; border:1px solid #2a7bb8;
}
.files{
  position:relative;
  outline: 0;
}
.files:after {
  pointer-events: none;
  position: absolute;
  top: 30px;
  left: 0;
  width: 70px;
  right: 0;
  height: 70px;
  content: "";
  background-image: url(../assets/images/upload.png);
  display: block;
  margin: 0 auto;
  background-size: 100%;
  background-repeat: no-repeat;
}
.color input{ background-color:#f1f1f1;}

.files:before {
  position: absolute;
  bottom: 10px;
  left: 0;
  pointer-events: none;
  width: 100%;
  right: 0;
  height: 57px;
  content: " or drag it here. ";
  display: block;
  margin: 0 auto;
  color: #2a7bb8;
  font-weight: 600;
  text-transform: capitalize;
  text-align: center;
}

@media only screen and (max-width : 2560px) {
  .files input {
    padding: 120px 0 85px 10%;
  }
}

@media only screen and (max-width : 1440px) {
  .files input {
    padding: 120px 0 85px 20%;
  }
}
@media only screen and (max-width : 1024px) {
  .files input {
    padding: 120px 0 85px 25%;
  }
}

@media only screen and (max-width : 979px) {
  .files input {
    padding: 120px 0 85px 30%;
  }
}

@media only screen and (max-width : 767px) {

}

@media only screen and (max-width : 480px) {
  .files input {
    padding: 120px 0 85px 20%;
  }
}

@media only screen and (max-width : 320px) {
  .files input {
    padding: 120px 0 85px 4%;
  }
}

</style>
