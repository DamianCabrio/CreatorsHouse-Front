<template>
<q-page class="flex flex-center">
    <h1>Bienvenido</h1>
    <div>
       <q-btn class="btn-xs" @click="logout">Cerrar Sesion</q-btn>
      <div>{{user.data}}</div>
      <div v-if="">{{creator.data}}</div>
    </div>
</q-page>
</template>

<script>
import * as axios from 'axios'
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
        })
        .catch(err => {
          console.log(err.response)
        })
    }
    // Busco mis datos si soy creator enviando mi id de usuario
    /* getCreator() {
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
