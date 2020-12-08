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
                  v-model="postType"
                  :options="[
                    {label: 'Texto', value: '1'},
                    {label: 'Imágenes', value: '2'},
                    {label: 'Video', value: '3'}
                    ]"
                  class="shadow-0"
                  color="grey-4"
                  spread
                  text-color="black"
                  toggle-color="secondary"
                />
              </q-card-section>
              <div v-if="postType == 2">
                <q-card-section>
                  <div class="text-caption q-pb-sm">Subir Imágenes</div>
                  <q-file
                    v-model="images"
                    multiple
                    outlined
                  >
                    <template v-slot:prepend>
                      <q-icon name="attach_file"/>
                    </template>
                  </q-file>
                </q-card-section>
              </div>
              <div v-if="postType == 3">
                <q-card-section>
                  <div class="text-caption q-pb-sm">Subir Video</div>
                  <q-input
                    v-model="video"
                    hint="Pon un link de un vídeo"
                    label="URL YouTube"
                    outlined
                    type="url"
                    @input="changeWatchForEmbed()"
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
                  v-model="postTitle"
                  label="Título"
                  outlined
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
                  v-model="postVisibility"
                  :options="[
                    {label: 'Público', value: '1'},
                    {label: 'Premium', value: '0'}
                    ]"
                  class="shadow-0"
                  color="grey-4"
                  spread
                  text-color="black"
                  toggle-color="secondary"
                />
              </q-card-section>
              <q-card-section>
                <q-btn
                  color="primary"
                  label="Publicar"
                  size="lg"
                  spread
                  style="width:100%"
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
      isCreator: false,
      creatorId: '',
      isCorrectCreator: false
    }
  },
  mounted () {
    // Verifico si hay una sesion iniciada
    if (sessionStorage.getItem('apiToken')) {
      // tengo un token guardado localmente
      this.getUser()
      this.creatorId = this.$route.params.idCreator
    } else {
      // sino redirecciono al login
      this.$router.push(this.$route.query.redirect || '/Login')
    }
  },
  beforeUpdate () {
    // Verifico que el creator sea el mismo que esta logueado
    // alert(this.creatorId + '=' + this.creator.data.id)
    if (this.isCorrectCreator === false) {
      if (parseInt(this.creatorId) === parseInt(this.creator.data.id)) {
        this.isCorrectCreator = true
        // correcto
        // alert('correcto')
      } else {
        // alert('incorrecto ')
        this.$router.push(this.$route.query.redirect || '/Home')
      }
    }
  },
  methods: {
    logout: async function () {
      sessionStorage.removeItem('apiToken')
      this.user = []
      this.$router.push(this.$route.query.redirect || '/')
    },
    changeWatchForEmbed: function () {
      this.video = this.video.replace('watch?v=', 'embed/')
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
            // alert('es creator')
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
      // NOTE: hay que ponerlo dentro de /api
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
          this.$router.push('/creator/' + this.creator.data.id + '/post/' + response.data.data.id)
        }, (error) => {
          console.log(error)

          if (error.response.status === 422) {
            this.$q.notify({
              type: 'negative',
              message: 'Revise que lleno todos los campos'
            })
          } else {
            this.$q.notify({
              color: 'danger',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Error, intente nuevamente!'
            })
          }
        })
    }
  }
}
</script>
