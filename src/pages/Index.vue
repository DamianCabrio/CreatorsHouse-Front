<template>
<q-page class="bg-deep-purple-1">
  <div class="row bg-primary">
    <div class="col">
      <div>
        Apoya a tus creadores en Creator House.
      </div>
      <div>Registrate para ofrecer contenido mensual premium o recibir donaciones.</div>
      <q-btn color="white" text-color="black" label="Standard" />
    </div>
    <div class="col">
    <div
      v-for="link in essentialLinks"
      :key="link.title"
    >
      <ul>{{link.title}}</ul>
        <li>{{link.caption}}</li>
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
    <q-parallax
      src="https://www.placecage.com/1920/1080"
    >
      <h1 class="text-white">I don't know 1</h1>
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
const linksData = [
  {
    title: 'Norb',
    caption: 'quasar.dev'
  },
  {
    title: 'Damián',
    caption: 'quasar.whaaat'
  },
  {
    title: 'Lau',
    caption: 'github.com/quasarframework'
  }
]
export default {
  name: 'PageIndex',
  data () {
    return {
      essentialLinks: linksData,
      slide: 'style',
      lorem: 'I dun like carousels, but idk. Se ven raros los controles dots, con píxeles, wth? Los parallax son feos tmb. Todo plano if possible.'
    }
  }
}
</script>
