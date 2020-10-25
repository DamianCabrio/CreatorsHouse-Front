<template>

<q-page class="flex flex-center">
  <div class="q-pa-md fit row wrap justify-start items-start content-start">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md col-md-4 col-12 self-center offset-md-4"
    >
      <div class="text-h3 q-mb-none">Registrarse</div>
      <q-input
        filled
        v-model="username"
        label="Username *"
        hint="Tu nombre en Creator house"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Ingresa un nickname']"
      />

      <q-input
        filled
        type="email"
        v-model="email"
        label="Email *"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Ingresa tu email'
        ]"
      />
      <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" hint="" label="Contraseña *">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <q-input v-model="password2" filled :type="isPwd ? 'password' : 'text'" hint="Repetir Contraseña">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <q-input
        filled
        type="date"
        v-model="birthDate"
        label=""
        hint="Fecha de nacimiento"
        lazy-rules
        :rules="[
          val => val !== null && val !== '' || 'Ingrese su fecha de nacimiento'
        ]"
      />
      <q-toggle v-model="accept" label="Yo acepto los términos y condiciones" />
      <div>
        <q-btn label="Enviar" type="submit" color="primary"/>
        <q-btn label="Borrar" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</q-page>
</template>

<script>
export default {
  name: 'PageIndex',
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

  methods: {
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
          message: 'Bienvenido a Crator House'
        })
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
