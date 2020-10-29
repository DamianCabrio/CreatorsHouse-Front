<template>
<q-page class="flex flex-center">
    <h1>Bienvenido</h1>
    <div>
        <q-btn class="btn-xs" @click="logout">Cerrar Sesion</q-btn>
    </div>
</q-page>
</template>

<script>
// import Axios from 'axios'
export default {
  name: 'MiPerfil',
  data () {
    return {
      user: [],
      creator: []
    }
  },
  mounted () {
    // Verifico si hay una sesion iniciada
    if (sessionStorage.getItem('apiToken')) {
      // tengo un token guardado localmente
      this.getUser()
      // Si soy creator busco mis datos de creator
      // this.getCreator()
    } else {
      // sino redirecciono al login
      this.$router.push(this.$route.query.redirect || '/Login')
    }
  },
  methods: {
    logout: async function () {
      sessionStorage.removeItem('apiToken')
      this.user = []
    }
    // Busco mis datos de usuario enviando mi token
    /* getUser: async function () {
      try {
        const data = await fetch('http://localhost:8000/api/users/me?apiToken=' + sessionStorage.getItem('apiToken'))
        const response = await data.json()
        // console.log(response.data.id)
        this.user = response.data
      } catch (error) {
        console.error(error)
      }
    },
    // Busco mis datos si soy creator enviando mi id de usuario
    getCreator: async function () {
      try {
        const data = await fetch('http://localhost:8000/api/creator/idUser=' + )
        const response = await data.json()
        // console.log(response.data.id)
        this.creator = response.data
      } catch (error) {
        console.error(error)
      }
    } */
  }
}
</script>
