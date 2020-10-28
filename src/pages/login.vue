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
          val => val !== null && val !== '' || 'Please type your age',
        ]"
      />
      <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" hint="Password with toggle">
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
  name: 'PageIndex',
  data () {
    return {
      email: 'avery.stehr@example.com',
      password: 'password',
      isPwd: true,
      accept: false,
      apiToken: null
    }
  },

  methods: {
    login () {
      axios.post('http://localhost:8888/login', {
        email: this.email,
        password: this.password
      })
        .then((response) => {
          console.log(response.data)
          this.apiToken = response.data.tokenData
        })
        .catch(err => {
          console.log(err.response.data)
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
