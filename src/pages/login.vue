<template>

<q-page class="flex flex-center">
  <div class="q-pa-md fit row wrap justify-start items-start content-start">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md col-md-4 col-12 self-center offset-md-4  "
    >
      <div class="text-h3">Log In</div>
      <q-input
        filled
        type="email"
        v-model="email"
        label="Email *"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Ingresa tu Email',
        ]"
      />
      <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" hint="">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <div>
        <q-btn label="Submit" type="submit" color="primary" @click="login"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
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
      this.$router.push(this.$route.query.redirect || '/Home')
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
          this.$router.push(this.$route.query.redirect || '/Home')
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
