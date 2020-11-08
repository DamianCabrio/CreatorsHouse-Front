<template>
  <q-page class="">
    <template>
      <div class="">
        <div class="row items-start">
          <template class="card">
            <q-img
              src="https://images.pexels.com/photos/6992/forest-trees-northwestisbest-exploress.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              class="banner"
            >
              <div class="absolute-bottom text-subtitle1 text-center">
                <q-avatar
                  class="avatar"
                  size="100px"
                >
                  <img src="https://cdn.quasar.dev/img/avatar.png">
                </q-avatar>
              </div>
            </q-img>
          </template>
        </div>
      </div>
    </template>
    <div class="container">
      <div class="row justify-center">
        <div class="col-12 col-md-8 q-pt-xl">
          <div class="text-h3 text-primary">username <span class="text-overline">un link</span></div>
        </div>
        <div class="col-12 col-md-8 q-pt-xl">
          información creador
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Creator'
}
</script>
<style lang="stylus">
.banner {
  height: 50vh;
}
</style>
