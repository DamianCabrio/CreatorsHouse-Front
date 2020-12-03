<template>
  <div class="row justify-center">
    <div class="col-12 col-md-8 q-pa-md q-gutter-sm">
      <div class="row justify-center">
        <div class="col-12 q-pa-xl text-center">
          <div class="text-h3 text-weight-thin text-center">Convertirme en Creador</div>
        </div>
        <div class="col-12 col-md-8 q-pa-md">
          <q-form
            enctype="multipart/form-data"
            @submit="onSubmit">
            <q-card
              bordered
              class="q-mb-md"
              flat
            >
            <!--   <q-card-section>
                <div class="text-caption q-pb-sm">Banner {{banner}}</div>
                <q-file
                  v-model="banner"
                  label="imagen banner en jpeg/png/gif/jpg"
                  outlined
                />
              </q-card-section> -->
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
                  :options="selectOptions"
                  float-label="Is Quasar Awesome?"
                  outlined
                  radio
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
              @click="registerCreator"
            />
          </div>
          <q-separator class="q-mt-md q-mb-lg"/>
          <q-card bordered class="q-mt-md" flat>
            <q-card-section>
              <div class="text-caption q-pb-sm">Vincular Mercado Pago
              </div>
              <q-btn
                href="https://auth.mercadopago.com.ar/authorization?client_id=7896672689628001&response_type=code&platform_id=mp&redirect_uri=http://localhost:8080"
                label="Vincular"
                size="lg"
                style="width:100%;color:#00238C"
                type="a"
              ><img
                class="q-ma-md"
                spinner-color="white"
                src="mp/mp-logo.svg"
                style="width:100px"
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
      // datos para ser creator
      banner: null,
      description: '',
      instagram: '',
      youtube: '',
      vipCost: '',
      category: '',
      user: [],
      isCreator: false,
      selectOptions: [
        {
          label: 'YouTube',
          value: '1'
        },
        {
          label: 'Música',
          value: '2'
        },
        {
          label: 'Arte',
          value: '3'
        },
        {
          label: 'KPop',
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
    // Busco mis datos de usuario enviando mi token
    getUser () {
      axios.defaults.headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + sessionStorage.getItem('apiToken')
      }
      axios.get('http://localhost:8000/api/users/me', {
        token: sessionStorage.getItem('apiToken')
      })
        .then((response) => {
          console.log(response.data)
          this.user = response.data
        })
        .catch(err => {
          console.log(this.banner)
          console.log(err.response)
        })
    },
    // Guardar los datos del creator
    registerCreator () {
      axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('apiToken')
      }
      axios.post('http://localhost:8000/api/creators', {
        token: sessionStorage.getItem('apiToken'),
        // banner: this.banner,
        description: this.description,
        instagram: this.instagram,
        youtube: this.youtube,
        costVip: this.vipCost,
        categories: this.category.value
        // idUser: this.user.id
      })
        .then((response) => {
          console.log(response)
          this.isCreator = true
          this.$q.notify({
            color: 'info',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Ya eres un Creador!'
          })
          setTimeout(function () {
            this.$router.push('/home')
          }.bind(this), 3000)
        })
        .catch(err => {
          console.log(err)
          this.$q.notify({
            color: 'danger',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'No se pudo guardar el creador, Lo sentimos!'
          })
        })
    },

    onSubmit () {
      /*  if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'Debes aceptar los términos y condiciones'
        })
      } else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Debe cargar todos los datos requeridos!'
        })
      } */
    }
  }
}
</script>
