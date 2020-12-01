<template>
  <div class="row justify-center">
    <div class="col-12 col-md-8 q-pa-md q-gutter-sm">
      <div class="row justify-center">
        <div class="col-12 q-pa-xl text-center">
          <div class="text-h3 text-weight-thin text-center">Mi Perfil</div>
        </div>
        <div class="col-12 col-md-6 q-pa-md">
          <q-card
            flat
            bordered
            style="width: 100%;max-height:300px"
            class="q-mb-md"
          >
            <q-item>
              <q-item-section avatar>
                <q-avatar size="100px">
                  <img :src="`http://localhost:8000/${user.data.avatar}`">
                  <img :src="`https://forum.vuejs.org/user_avatar/forum.vuejs.org/msqar/45/20991_2.png`">
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{user.data.username}}</q-item-label>
                <q-item-label caption>{{user.data.name}}</q-item-label>
              </q-item-section>
            </q-item>
          </q-card>
          <!--Imagen del avatar-->
          <div class="col-12 col-md-6 q-pa-md">
            <q-uploader
            label="Cambiar tu Avatar"
            color="dark"
            style="width:100%"
            url=""
            extensions=".gif,.jpg,.jpeg,.png"
            @added="file_selected"
            />
            <div class="q-pb-md">
              <q-btn color="primary"
                label="Subir Avatar"
                size="lg"
                style="width:100%"
                text-color="white"
                @click="uploadFile()">
              </q-btn>
            </div>
          </div>
          <!----------------------->
          <q-form>
            <q-card
              bordered
              class="q-mb-md"
              flat
            >
              <q-card-section>
                <div class="text-caption q-pb-sm">Username</div>
                <q-input
                  outlined
                  v-model="username"
                  :key=user.id
                  :placeholder=user.data.username
                />
              </q-card-section>
              <q-card-section>
                <q-input
                  v-model="password"
                  :rules="[
          val => val !== null && val !== '' || 'Contraseña requerida',
          val => val && val.length >= 8 || 'Ingresa una contraseña con al menos 8 carcateres',
          isValidPassword
        ]"
                  :type="isPwd ? 'password' : 'text'"
                  outlined
                  hint=""
                  label="Contraseña *"
                  lazy-rules
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
                <q-input
                  v-model="password2"
                  :error="!confirmPassword"
                  :type="isPwd ? 'password' : 'text'"
                  error-message="Contraseña no coincide."
                  outlined
                  label="Confirmar Contraseña *"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
              </q-card-section>
            </q-card>
          </q-form>
          <div class="q-pb-md">
            <q-btn
              color="primary"
              label="Guardar Cambios"
              size="lg"
              style="width:100%"
              text-color="white"
              @click="updateUser"
            />
          </div>
        </div>
        <div class="col-12 col-md-6 q-pa-md">
          <!--Imagen del banner-->
          <div class="col-12 col-md-6 q-pa-md">
            <q-uploader
            label="Cambiar tu Banner"
            color="dark"
            style="width:100%"
            url=""
            extensions=".gif,.jpg,.jpeg,.png"
            @added="file_selected"
            />
            <div class="q-pb-md">
              <q-btn color="primary"
                label="Subir Banner"
                size="lg"
                style="width:100%"
                text-color="white"
                @click="uploadFile()">
              </q-btn>
            </div>
          </div>
          <!----------------------->
          <!-- <q-card class="q-mb-md">
            <q-img
              src="https://cdn.quasar.dev/img/parallax2.jpg"
              basic
              :ratio="16/9"
            >
              <div class="absolute-bottom text-subtitle2 text-center">
                {{creator}}
              </div>
            </q-img>
            <input
              type="file"
              name="banner"
              ref="banner"
              id="banner"
            >
            <button
              type="button"
              @click='uploadBanner()'
            >Upload file</button>
          </q-card> -->
          <q-form>
            <q-card
              bordered
              class="q-mb-md"
              flat
            >
              <q-card-section>
                <div class="text-caption q-pb-sm">Descripción de mi perfil</div>
                <template>
                  <div>
                    <q-editor
                      v-model="description"
                      min-height="10rem"
                    />
                  </div>
                </template>
              </q-card-section>
              <q-card-section>
                <div class="text-caption q-pb-sm">Categoría</div>
                <q-select
                  v-model="category"
                  outlined
                  label="Elegir Categoría"
                  float-label="Is Quasar Awesome?"
                  radio
                  :options="selectOptions"
                />
              </q-card-section>
              <q-card-section>
                <div class="text-caption q-pb-sm">Link a Instagram</div>
                <q-input
                  v-model="instagram"
                  hint="URL"
                  label="Instagram"
                  outlined
                  type="url"
                />
              </q-card-section>
              <q-card-section>
                <div class="text-caption q-pb-sm">Link a Youtube</div>
                <q-input
                  v-model="youtube"
                  hint="URL"
                  label="Youtube"
                  outlined
                  type="url"
                />
              </q-card-section>
              <q-card-section>
                <div class="text-caption q-pb-sm">Valor membresia mensual Premium</div>
                <q-input
                  v-model="vipCost"
                  label="Costo Mensual $AR"
                  outlined
                  type="number"
                />
              </q-card-section>
            </q-card>
          </q-form>
          <div class="q-pb-md">
            <q-btn
              color="primary"
              label="Guardar Cambios"
              size="lg"
              style="width:100%"
              text-color="white"
            />
          </div>
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
      // Para upload banner
      selected_file: '',
      check_if_document_upload: false,
      // ----------------
      username: '',
      avatar: '',
      password: '',
      password2: '',
      banner: '',
      description: '',
      instagram: '',
      youtube: '',
      vipCost: '',
      category: '',
      user: [],
      creator: [],
      isCreator: false,
      isPwd: true,
      selectOptions: [
        {
          label: 'YouTube',
          value: '1'
        },
        {
          label: 'Tutoriales',
          value: '2'
        },
        {
          label: 'Dibujos',
          value: '3'
        },
        {
          label: 'Música',
          value: '4'
        },
        {
          label: 'Otros',
          value: '5'
        }
      ]
    }
  },
  computed: {
    confirmPassword () {
      return this.password === this.password2
    },
    isValidPassword (val) {
      // no funca
      // >80 https://digitalfortress.tech/tricks/top-15-commonly-used-regex/
      const passwordPattern = /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/
      return passwordPattern.test(val) || 'La constraseña debe tener al menos una letra mayúscula, un número y un caracter especial.'
    }
  },
  mounted () {
    // Verifico si hay una sesion iniciada
    if (sessionStorage.getItem('apiToken')) {
      // tengo un token guardado localmente
      this.getUser()
      this.getCategory()
    } else {
      // sino redirecciono al login
      this.$router.push(this.$route.query.redirect || '/Login')
    }
  },
  methods: {
    onRejected (rejectedEntries) {
      this.$q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} Los archivos no son un formato valido`
      })
    },
    register () {
      axios.post('http://localhost:8000/creator', {
        avatar: this.avatar,
        banner: this.banner,
        description: this.description,
        instagram: this.instagram,
        youtube: this.youtube,
        costVip: this.vipCost,
        becreator: this.becreator // cómo era el breator acá?
      })
        .then((response) => {
          console.log(response)
          this.$q.notify({
            color: 'danger',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Error, intente nuevamente!'
          })
        })
    },
    updateUser () {
      axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('apiToken')
      }
      axios.put('http://localhost:8000/api/users', {
        username: this.username,
        password: this.password
      })
        .then((response) => {
          console.log(response)
          this.$q.notify({
            color: 'info',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Se guardaron los cambios!'
          })
        })
    },
    // -------------Guardar Banner-----------------
    file_selected (file) {
      this.selected_file = file[0]
      this.check_if_document_upload = true
    },

    uploadFile () {
      const fd = new FormData()
      fd.append('archivo', this.selected_file)

      axios.post('http://localhost:8000/api/uploadBanner', fd, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + sessionStorage.getItem('apiToken')
        }
      })
        .then(function (response) {
          console.log(response)
          this.$q.notify({
            message: 'Se actualizo el Banner.',
            color: 'possitive'
          })
        })
        .catch(function (err) {
          console.log(err)
          this.$q.notify({
            message: 'Error, No se guardo el Banner.',
            color: 'negative'
          })
        })
        // ------------FIN guardar Banner-------------
    },
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
    // NOTE: hacerle el post
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
    }
  }
}
</script>
