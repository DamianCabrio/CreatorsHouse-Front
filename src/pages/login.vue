<template>

  <q-page class="flex flex-center" style="min-height:90vh">
    <div class="q-pa-md fit row wrap justify-start items-start content-start">
      <q-form
        class="q-gutter-md col-md-4 col-12 self-center offset-md-4  "
        @reset="onReset"
        @submit="onSubmit"
      >
        <div class="text-h3 text-weight-thin text-center">Iniciar Sesión</div>
        <q-input
          v-model="email"
          :rules="[
          val => val !== null && val !== '' || 'Ingresa tu Email',
        ]"
          filled
          label="Email *"
          lazy-rules
          type="email"
        />
        <q-input v-model="password" :type="isPwd ? 'password' : 'text'" filled hint="">
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <div class="text-center">
          <q-btn color="primary" label="Ingresar" type="submit" @click="login"/>
          <q-btn class="q-ml-sm" color="primary" flat label="Borrar" type="reset"/>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import * as axios from 'axios'

export default {
  name: 'Login',
  data () {
    return {
      email: 'avery.stehr@example.com',
      password: 'password',
      isPwd: true,
      accept: false
      // apiToken: null
    }
  },
  mounted () {
    // Verifico si hay una sesion iniciada
    if (sessionStorage.getItem('apiToken')) {
      // tengo un token guardado localmente
      // redirecciono a la pagina de mi perfil
      const baseUrl = window.location.origin
      window.location = baseUrl + '/#/Home'
    }
  },
  methods: {
    login () {
      axios.post('http://localhost:8000/login', {
        email: this.email,
        password: this.password
      })
        .then((response) => {
          console.log(response.data)
          // this.apiToken = response.data.tokenData
          sessionStorage.setItem('apiToken', response.data.tokenData.token)
          // Si valido el login redirecciono a su perfil
          location.reload()
          const baseUrl = window.location.origin
          window.location = baseUrl + '/#/Home'
        })
        .catch(err => {
          console.log(err.response)
          // Si dio error el login muestro mensaje
          // alert(err.response)
          // this.$q.notify(err.response)
          this.$q.notify({
            message: 'Usuario o Password Invalidos.',
            color: 'negative'
          })
          this.$q.notify('')
        })
    },

    onSubmit () {

    },

    onReset () {
      this.email = null
      this.password = null
      this.accept = false
    }
  }
}
</script>
