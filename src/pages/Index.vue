<template>
<q-page class="flex">
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
        <q-carousel-slide name="style" color="black" class="column no-wrap flex-center">
          <q-icon name="style" size="56px" />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="tv" class="column no-wrap flex-center">
          <q-icon name="live_tv" size="56px" />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="layers" class="column no-wrap flex-center">
          <q-icon name="layers" size="56px" />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="map" class="column no-wrap flex-center">
          <q-icon name="terrain" size="56px" />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
      </q-carousel>
      <q-btn @click="saludar">Saludar</q-btn>
    <q-parallax
      src="https://www.placecage.com/1920/1080"
    >
      <h1 class="text-white">I don't know</h1>
    </q-parallax>
        <q-parallax
      src="https://www.placecage.com/c/1920/1080"
    >
      <h1 class="text-white">I don't know 2</h1>
    </q-parallax>
  </template>
</q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      info: null,
      slide: 'style',
      lorem: 'I dun like carousels, but idk. Se ven raros los controles dots, con píxeles, wth? Los parallax son feos tmb. Todo plano if possible.'
    }
  },
  methods: {
    saludar: async function () {
      try {
        const data = await fetch('http://localhost:8000/users/2')
        const response = await data.json()
        console.log(response.data.id)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
