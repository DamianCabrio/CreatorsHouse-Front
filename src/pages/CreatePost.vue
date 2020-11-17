<template>
  <div class="row justify-center">
    <div class="col-12 col-md-8 q-pa-md q-gutter-sm">
      <div class="row justify-center">
        <div class="col-12 q-pa-xl text-center">
          <div class="text-h4 text-weight-light">Crear Post</div>
        </div>
        <div class="col-12 col-md-8 q-pa-md">
          <q-form>
            <q-card
              bordered
              class="q-mb-md"
              flat
            >
              <q-card-section>
                <div class="text-caption q-pb-sm">Tipo de post</div>
                <q-btn-toggle
                  class="shadow-0"
                  v-model="postType"
                  spread
                  color="grey-4"
                  text-color="black"
                  toggle-color="secondary"
                  :options="[
                    {label: 'Texto', value: '1'},
                    {label: 'Imágenes', value: '2'},
                    {label: 'Video', value: '3'}
                    ]"
                />
              </q-card-section>
              <div v-if="postType == 2">
                <q-card-section>
                  <div class="text-caption q-pb-sm">Subir Imágenes</div>
                  <q-file
                    outlined
                    multiple
                    v-model="images"
                  >
                    <template v-slot:prepend>
                      <q-icon name="attach_file" />
                    </template>
                  </q-file>
                </q-card-section>
              </div>
              <div v-if="postType == 3">
                <q-card-section>
                  <div class="text-caption q-pb-sm">Subir Video</div>
                  <q-input
                    outlined
                    type="url"
                    hint="Pon un link de un vídeo"
                    v-model="video"
                    label="URL YouTube"
                  />
                </q-card-section>
              </div>
            </q-card>
            <q-card
              bordered
              class="q-mb-md"
              flat
            >
              <q-card-section>
                <div class="text-caption q-pb-sm">Título</div>
                <q-input
                  outlined
                  v-model="postTitle"
                  label="Título"
                />
              </q-card-section>
              <q-card-section>
                <div class="text-caption q-pb-sm">Contenido</div>
                <q-editor
                  v-model="content"
                  min-height="15rem"
                />
              </q-card-section>
              <q-card-section>
                <div class="text-body1 q-pb-sm">¿Quién puede ver este Post?</div>
                <q-btn-toggle
                  class="shadow-0"
                  v-model="postVisibility"
                  spread
                  color="grey-4"
                  text-color="black"
                  toggle-color="secondary"
                  :options="[
                    {label: 'Público', value: '0'},
                    {label: 'Premium', value: '1'}
                    ]"
                />
              </q-card-section>
              <q-card-section>
                <q-btn
                  style="width:100%"
                  color="primary"
                  label="Publicar"
                  size="lg"
                  spread
                  @click="submitPost"
                />
              </q-card-section>
            </q-card>
          </q-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as axios from 'axios'

export default {
  data () {
    return {
      postType: '',
      postTitle: '',
      content: '',
      images: '',
      video: '',
      postVisibility: '',
      user: [],
      creator: [],
      isCreator: false
    }
  },
  mounted () {
    // Verifico si hay una sesion iniciada
    if (sessionStorage.getItem('apiToken')) {
      // tengo un token guardado localmente
      this.getUser()
    } else {
      // sino redirecciono al login
      this.$router.push(this.$route.query.redirect || '/Login')
    }
  },
  methods: {
    logout: async function () {
      sessionStorage.removeItem('apiToken')
      this.user = []
      this.$router.push(this.$route.query.redirect || '/')
    },
    // Busco mis datos de usuario enviando mi token
    getUser () {
      axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('apiToken')
      }
      axios.get('http://localhost:8000/api/users/me', {
        token: sessionStorage.getItem('apiToken')
      })
        .then((response) => {
          console.log(response.data)
          this.user = response.data
          // Buscar mis datos si soy creador
          if (this.user.data.isCreator === 1) {
            this.isCreator = true
            this.getCreator()
          }
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    // Busco mis datos si soy creator enviando mi id de usuario
    getCreator () {
      axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('apiToken')
      }
      axios.get('http://localhost:8000/api/usercreator/' + this.user.data.id, {
        // token: sessionStorage.getItem('apiToken'),
        // idUser: this.user.data.id
        // idUser: 1
      })
        .then((response) => {
          console.log(response.data)
          this.creator = response.data
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    submitPost () {
      var idCreator = this.$route.params.idCreator
      axios.post('http://localhost:8000/creators/posts/' + idCreator, {

        content: this.content,
        tipo: this.postType,
        title: this.postTitle,
        isPublic: this.postVisibility,
        video: this.video,
        imagenes: this.images
      })
        .then((response) => {
          console.log(response)
          this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'El post fue guardado con éxito!'
          })
        }, (error) => {
          console.log(error)
          this.$q.notify({
            color: 'danger',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Error, intente nuevamente!'
          })
        })
    }
  }
}
</script>
