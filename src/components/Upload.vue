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
          @dragexit="dragExit"
          @drop="drop">
          <input
            type="file"
            ref="modelInput"
            class="form-control"
            accept="text/xml,.json,.xml.gz,.xml.bz2,.sbml.gz,.sbml.bz2"
            @change="uploadFile()"
          >
        </div>
      </div>
      <div class="col s2">
        <div class="sampleModel">
          <i class="material-icons left">reply</i>
          <img src="@/assets/e_coli_core.svg">
          <br>
          Drag &amp; drop me! <sup>1</sup>
        </div>
      </div>
    </div>
    <div class="progress" v-if="uploading">
      <div class="determinate" :style="'width: ' + uploadProgress + '%'"></div>
    </div>
    <div class="card blue-grey darken-1" v-if="uploadError">
      <div class="card-content red white-text">
        <span class="card-title">Could not upload your model</span>
        <p>We're sorry, we encountered an issue while trying to upload your model.</p>
        <p v-if="uploadErrorMessage"><em>{{ uploadErrorMessage }}</em></p>
      </div>
    </div>
  </div>
</template>

<script>
import * as axios from 'axios';
import exampleModel from '@/assets/e_coli_core.json';
import settings from '@/settings';

export default {
  name: 'Upload',
  data: () => ({
    dragging: '',
    uploading: false,
    uploadProgress: null,
    uploadError: false,
    uploadErrorMessage: null,
  }),
  methods: {
    dragEnter(event) {
      this.dragging = 'dragging';
    },
    dragOver(event) {
      event.preventDefault();
    },
    dragExit(event) {
      this.dragging = '';
    },
    drop(event) {
      event.preventDefault();
      this.dragging = '';
      const src = event.dataTransfer.getData("text/plain");
      if (src.includes("e_coli_core")) {
        this.submitExampleModel();
      }
    },
    submitExampleModel() {
      const formData = new FormData();
      const blob = new Blob([JSON.stringify(exampleModel)], {type: "application.json"});
      formData.append('model', blob, "e_coli_core.json");
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
      this.uploadErrorMessage = null;

      axios
        .post(`${settings.api}/submit`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            this.uploadProgress = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total));
          },
        }).then((response) => {
          this.$store.dispatch('addTask', {
            uuid: response.data.uuid,
            filename: formData.get('model').name,
          });
        }).catch((error) => {
          this.uploadError = true;
          if (error.response) {
            this.uploadErrorMessage = error.response.data.message;
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
