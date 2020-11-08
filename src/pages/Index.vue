<template>
  <q-page class="bg-white">
    <div class="container">
      <div class="row justify-center bg-primary q-pb-xl">
        <div class="col-md-5 col-12">
          <div
            class="q-pl-md q-pr-md q-pb-md"
            style="text-align:left"
          >
            <div class="text-white text-bold text-h3 q-mt-xl q-pt-xl q-pb-lg">Recibí donaciones y ofrecé contenido premium a tus fans.</div>
            <div class="text-white text-bold text-h4 q-pr-lg q-pb-lg">Registrate para empezar ahora mismo.</div>
            <q-btn
              color="white"
              text-color="black"
              label="Registrarse"
              to="/Register"
            />
          </div>
        </div>
        <div class="col-md-5 col-12">
          <div class="q-pa-md q-pt-xl">
            <q-video
              :ratio="2/1"
              src="https://www.youtube.com/embed/6RdcVauc-64?rel=0"
            />
          </div>
        </div>
      </div>
      <div class="row justify-center">
        <div class="col-12 col-md-8">
          <div class="text-h4 q-pa-lg text-bold text-center">Conocé nuevos creadores</div>
          <div class="row">
            <div
              v-for='user in users'
              class="col-12 col-md-4"
              :key="user.id"
            >
              <div class="q-pa-lg">
                <q-card>
                  <q-img  :ratio="1.5/1" v-bind:src="`http://localhost:8000/img/${user.avatar}`">
                    <div class="absolute-bottom">
                      <div class="text-h6">@{{user.username}}</div>
                      <div class="text-subtitle2">{{user.name}}</div>
                    </div>
                  </q-img>

                  <q-card-actions class="">
                    <q-btn
                      flat
                      round
                      color="red"
                      icon="favorite"
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
    getCreators: async function () {
      try {
        const data = await fetch('http://localhost:8000/userCreatorsHome')
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
