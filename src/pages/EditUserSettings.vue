<template>
  <div class="row justify-center">
    <div class="col-12 col-md-8 q-pa-md q-gutter-sm">
      <div class="row justify-center">
        <div class="col-12 q-pa-xl text-center">
          <div class="text-h4 text-weight-bold">Mi Cuenta</div>
        </div>
        <div class="col-12 col-md-8 q-pa-md">
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
                <div class="text-caption q-pb-sm">Email</div>
                <q-input
                  outlined
                  v-model="email"
                  :key=user.id
                  :placeholder=user.data.email
                />
              </q-card-section>
              <q-card-section>
                <div class="text-caption q-pb-sm">Vincular Mercado Pago</div>
                <q-btn
                  label="Vincular Mercado Pago"
                  style="width:100%;background-color:#FFF159"
                  size="lg"
                  text-color="dark"
                  type="a"
                  href="https://auth.mercadopago.com.ar/authorization?client_id=7896672689628001&response_type=code&platform_id=mp&redirect_uri=http://localhost"
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
      username: '',
      email: '',
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
    }
  }
}
</script>
