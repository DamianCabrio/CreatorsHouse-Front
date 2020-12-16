<template>

  <q-page
    class="flex flex-center q-pb-xl q-pt-xl"
    style="min-height:90vh"
  >
    <div class="q-pa-md fit row wrap justify-start items-start content-start">
      <q-form
        class="q-gutter-md col-md-4 col-12 self-center offset-md-4"
        @reset="onReset"
        @submit="onSubmit"
      >
        <div class="text-h3 text-weight-thin text-center">Registrarse</div>
        <q-input
          v-model="username"
          :rules="[ val => val && val.length > 0 || 'Ingresa un nickname']"
          filled
          hint="Tu nombre en Creator house"
          label="Username *"
          lazy-rules
        />

        <q-input
          v-model="email"
          :rules="[
          val => val !== null && val !== '' || 'Ingresa tu email'
        ]"
          filled
          hint="Ejemplo: usuario@mail.com"
          label="Email *"
          lazy-rules
          type="email"
        />
        <q-input
          v-model="password"
          :rules="[
          val => val !== null && val !== '' || 'Contraseña requerida',
          val => val && val.length >= 8 || 'Ingresa una contraseña con al menos 8 carcateres',
          isValidPassword
        ]"
          :type="isPwd ? 'password' : 'text'"
          filled
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
          filled
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
        <q-input
          v-model="birthDate"
          :rules="[
          val => val !== null && val !== '' || 'Ingrese su fecha de nacimiento'
        ]"
          filled
          hint="Fecha de nacimiento"
          label=""
          lazy-rules
          type="date"
        />
        <q-toggle
          v-model="accept"
          label="Yo acepto los términos y condiciones"
        />
        <div>
          <q-btn
            color="primary"
            label="Enviar"
            type="submit"
            @click="register"
          />
          <q-btn
            class="q-ml-sm"
            color="primary"
            flat
            label="Borrar"
            type="reset"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import * as axios from 'axios'

export default {
  name: 'Register',
  data () {
    return {
      username: null,
      email: null,
      age: null,
      password: '',
      password2: '',
      birthDate: '',
      isPwd: true,
      accept: false
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
  methods: {
    register () {
      axios.post('http://localhost:8000/users', {
        username: this.username,
        email: this.email,
        password: this.password,
        birthDate: this.birthDate
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

    onSubmit () {
      if (this.accept !== true) {
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
          message: 'Verifique su email para confirmar el registro!'
        })
        setTimeout(function () {
          this.$router.push('/login')
        }.bind(this), 3000)
        // this.$router.push('/login')
      }
    },

    onReset () {
      this.username = null
      this.email = null
      this.password = null
      this.password2 = null
      this.birthDate = null
      this.accept = false
    }
  }
}
</script>
