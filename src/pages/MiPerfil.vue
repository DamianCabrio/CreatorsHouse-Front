<template>
<q-page class="flex flex-center">
    <h1>Bienvenido</h1>
</q-page>
</template>

<script>
export default {
  name: 'MiPerfil',
  mounted () {
    // Verifico si hay una sesion iniciada
    if (sessionStorage.getItem('apiToken')) {
      // tengo un token guardado localmente
    } else {
      // sino redirecciono al login
      this.$router.push(this.$route.query.redirect || '/Login')
    }
  }
}
</script>
