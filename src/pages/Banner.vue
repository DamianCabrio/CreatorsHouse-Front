<template>
  <div class="q-pa-md">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-file
        name="poster_file"
        v-model="file"
        filled
        label="Select poster image"
      />

      <q-file
        name="cover_files"
        v-model="files"
        filled
        multiple
        use-chips
        label="Select cover images"
      />

      <div>
        <q-btn label="Subir" type="submit" color="primary"/>
      </div>
    </q-form>

    <q-card v-if="submitEmpty" flat bordered class="q-mt-md bg-grey-2">
      <q-card-section>
        Submitted form contains empty formData.
      </q-card-section>
    </q-card>
    <q-card v-else-if="submitResult.length > 0" flat bordered class="q-mt-md bg-grey-2">
      <q-card-section>Submitted form contains the following formData (key = value):</q-card-section>
      <q-separator />
      <q-card-section class="row q-gutter-sm items-center">
        <div
          v-for="(item, index) in submitResult"
          :key="index"
          class="q-px-sm q-py-xs bg-grey-8 text-white rounded-borders text-center text-no-wrap"
        >{{ item.name }} = {{ item.value }}</div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import * as axios from 'axios'
export default {
  name: 'Banner',
  data () {
    return {
      file: null,
      files: null,

      submitEmpty: false,
      submitResult: []
    }
  },

  methods: {
    onSubmit (evt) {
      const formData = new FormData(evt.target)
      const submitResult = []
      // debugger
      for (const [name, value] of formData.entries()) {
        if (value.name.length > 0) {
          submitResult.push({
            name,
            value: value.name
          })
        }
      }

      this.submitResult = submitResult
      this.submitEmpty = submitResult.length === 0
      // guardo el file
      const banner = formData.get('poster_file')
      axios.defaults.headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + sessionStorage.getItem('apiToken')
      }
      axios.post('http://localhost:8000/api/upload', banner)
        .then(function (response) {
          alert('Archivo guardado.')
        })
        .catch(function (error) {
          console.log(error)
          alert('Archivo no cargado.')
        })
    }
  }
}

</script>
