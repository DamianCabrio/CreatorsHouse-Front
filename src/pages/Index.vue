<template>
  <q-page class="bg-white">
    <div class="container">
      <div
        class="row bg-primary q-pb-xl"
        style="padding-right:5vw;padding-left:5vw;"
      >
        <div class="col-md-6 col-sm-12">
          <div
            class="q-pl-xl q-pr-xl"
            style="text-align:left"
          >
            <div class="text-white text-bold text-h2 q-mt-xl q-pt-xl q-pb-lg">Recibí donaciones y ofrecé contenido premium a tus fans.</div>
            <div class="text-white text-bold text-h4 q-pr-lg q-pb-lg">Registrate para empezar ahora mismo.</div>
            <q-btn
              color="white"
              text-color="black"
              label="Registrarse"
            />
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          <div class="q-pa-xl">
            <q-video
              :ratio="2/1"
              src="https://www.youtube.com/embed/6RdcVauc-64?rel=0"
            />
          </div>
        </div>
      </div>
      <div>
        <h2 class="text-center">Creadores</h2>
      </div>
      <div
        class="row"
        style="padding-right:5vw;padding-left:5vw;"
      >
        <div
          v-for='user in users'
          class="my-card col-md-3"
          :key="user.id"
        >
          <div class="q-pa-md">
            <q-card>
              <q-img src="http://localhost:8000/img/ElSaurio.jpg">
                <div class="absolute-bottom">
                  <div class="text-h6">@{{user.username}}</div>
                  <div class="text-subtitle2">{{user.name}}</div>
                  <div class="text-subtitle2">{{user.avatar}}</div>
                </div>
              </q-img>

              <q-card-actions class="justify-around">
                <q-btn
                  flat
                  round
                  color="red"
                  icon="favorite"
                />
                <q-btn
                  flat
                  round
                  color="accent"
                  icon="bookmark"
                />
                <q-btn
                  flat
                  round
                  color="primary"
                  icon="share"
                />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
    </div>
    <template>
      <q-carousel
        style="width:100%"
        v-model="slide"
        transition-prev="scale"
        transition-next="scale"
        swipeable
        animated
        control-color="black"
        navigation
        padding
        arrows
        height="500px"
        class="text-black shadow-1 rounded-borders"
      >
        <q-carousel-slide
          name="style"
          color="black"
          class="column no-wrap flex-center"
        >
          <q-icon
            name="style"
            size="56px"
          />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide
          name="tv"
          class="column no-wrap flex-center"
        >
          <q-icon
            name="live_tv"
            size="56px"
          />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide
          name="layers"
          class="column no-wrap flex-center"
        >
          <q-icon
            name="layers"
            size="56px"
          />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide
          name="map"
          class="column no-wrap flex-center"
        >
          <q-icon
            name="terrain"
            size="56px"
          />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
      </q-carousel>
    </template>
  </q-page>
</template>
<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      user: [],
      users: [],
      info: null,
      slide: 'style',
      lorem: 'I dun like carousels, but idk. Se ven raros los controles dots, con píxeles, wth? Los parallax son feos tmb. Todo plano if possible.'
    }
  },
  mounted () {
    this.getCreators()
  },
  methods: {
    getUser: async function () {
      try {
        const data = await fetch('http://localhost:8000/users/2')
        const response = await data.json()
        console.log(response.data.id)
        this.user = response.data
      } catch (error) {
        console.error(error)
      }
    },
    getCreators: async function () {
      try {
        const data = await fetch('http://localhost:8000/userCreators')
        const response = await data.json()
        // console.log(response.data.id)
        this.users = response.data
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
