<template>
  <q-page class="bg-white">
    <div class="container">
      <div class="row justify-center bg-primary q-pb-xl">
        <div class="col-md-5 col-12">
          <div
            class="q-pl-md q-pr-md q-pb-md"
            style="text-align:left"
          >
            <div class="text-white text-bold text-h3 index-title q-mt-xl q-pt-xl q-pb-lg">Recibí donaciones y ofrecé contenido premium a tus fans.</div>
            <div class="text-white text-bold text-h4 q-pr-lg q-pb-xl">Registrate para empezar ahora mismo.</div>
            <div class="q-pt-xl">
              <q-btn
                color="white"
                text-color="black"
                label="Registrarse"
                to="/Register"
                size="lg"
              />
            </div>
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
      <div class="row justify-center bg-three-creators q-pt-xl q-pb-xl">
        <div class="col-12 col-md-8">
          <ShowThreeCreatorsHome />
        </div>
      </div>
    </div>
    <template>
      <div class="container">
        <div class="row justify-center q-pt-xl q-pb-xl">
          <div class="col-12 col-md-10">
            <q-card
              flat
              bordered
            >
              <q-card-section
                style="min-height:20vh;background-color:#EDEFF3"
                class="no-padding"
              >
                <div class="row">
                  <div
                    class="col-12 col-md-6 flex"
                    style="align-items: center;"
                  >
                    <div class="q-pa-lg">
                      <div class="text-h4 text-weight-light">También podés apoyar a tus creadores favoritos y alentarlos para que sigan haciendo lo que aman.</div>
                    </div>
                  </div>
                  <div class="col-12 col-md-6">
                    <q-img
                      src="https://images.pexels.com/photos/374068/pexels-photo-374068.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                      :ratio="16/9"
                    />
                  </div>
                </div>
              </q-card-section>
              <q-card-section class="bg-secondary text-white q-pa-lg flex">
                <div class="text-h5 text-weight-light q-pr-md">
                  Registrate para apoyar a tus creadores.
                </div>
                <q-btn
                  color="white"
                  text-color="black"
                  label="Registrarse"
                  to="/Register"
                />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </template>
  </q-page>
</template>
<script>
import ShowThreeCreatorsHome from 'components/ShowThreeCreatorsHome.vue'
export default {
  name: 'PageIndex',
  components: { ShowThreeCreatorsHome },
  data () {
    return {
      users: [],
      info: null,
      slide: 'style',
      lorem: 'I dun like carousels, but idk. Se ven raros los controles dots, con píxeles, wth? Los parallax son feos tmb. Todo plano if possible.'
    }
  }
}
</script>

<style lang="scss">
.index-title {
  span {
    background-image: linear-gradient(
      transparent calc(65% - 5px),
      darken($accent, 15%) 5px
    );
    background-size: 0;
    background-repeat: no-repeat;
    display: inline;
    transition: 0.5s ease;
  }

  &:hover {
    span {
      background-size: 100%;
    }
  }
}
.bg-three-creators {
  background-image: linear-gradient($primary 50%, #ffffff 0%);
}
</style>
