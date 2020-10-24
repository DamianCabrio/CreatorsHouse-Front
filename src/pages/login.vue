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
          val => val > 0 && val < 100 || 'Please type a real age'
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
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
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
      email: null,
      password: '',
      isPwd: true,
      accept: false
    }
  },

  methods: {
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
