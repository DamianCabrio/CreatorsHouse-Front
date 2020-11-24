<template>
  <div class="row justify-center">
    <div class="col-12 col-md-8 q-pa-md q-gutter-sm">
      <div class="row justify-center">
        <div class="col-12 q-pa-xl text-center">
          <div class="text-h3 text-weight-thin text-center">Convertirme en Creador</div>
        </div>
        <div class="col-12 col-md-8 q-pa-md">
          <q-form>
            <q-card
              bordered
              class="q-mb-md"
              flat
            >
              <q-card-section>
                <div class="text-caption q-pb-sm">Banner</div>
                <q-file
                  v-model="banner"
                  label="imagen banner en jpg/png/gif"
                  outlined
                />
              </q-card-section>
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
          <q-separator class="q-mt-md q-mb-lg" />
          <q-card class="q-mt-md" bordered flat>
            <q-card-section>
              <div class="text-caption q-pb-sm">Vincular Mercado Pago
              </div>
              <q-btn
                label="Vincular"
                style="width:100%;color:#00238C"
                size="lg"
                type="a"
                href="https://auth.mercadopago.com.ar/authorization?client_id=7896672689628001&response_type=code&platform_id=mp&redirect_uri=http://localhost:8080"
              > <img
                  src="mp/mp-logo.svg"
                  spinner-color="white"
                  style="width:100px"
                  class="q-ma-md"
                /></q-btn>
            </q-card-section>
          </q-card>
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
      username: '',
      avatar: '',
      banner: '',
      description: '',
      instagram: '',
      youtube: '',
      vipCost: '',
      category: '',
      user: [],
      creator: [],
      isCreator: false,
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
    }
  }
}
</script>
