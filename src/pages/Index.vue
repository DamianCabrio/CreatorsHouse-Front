<template>
  <q-page class="bg-white">
    <div class="container">
      <div class="row justify-center bg-primary q-pb-xl">
        <div class="col-md-5 col-12">
          <div
            class="q-pl-md q-pr-md q-pb-md"
            style="text-align:left"
          >
            <div class="text-white text-bold text-h3 index-title q-mt-xl q-pt-xl q-pb-lg">
              Recibí donaciones y ofrecé contenido premium a tus fans.
            </div>
            <div class="text-white text-bold text-h4 q-pr-lg q-pb-xl">
              Registrate para empezar ahora mismo.
            </div>
            <div class="q-pt-lg">
              <q-btn
                color="white"
                label="Registrarse"
                size="lg"
                text-color="black"
                to="/Register"
              />
            </div>
          </div>
        </div>
        <div class="col-md-5 col-12">
          <div class="q-pa-md q-pt-xl">
            <iframe
              :ratio="2 / 1"
              frameborder="0"
              height="360px"
              src="https://www.youtube.com/embed/6RdcVauc-64?rel=0"
              width="100%"
            />
          </div>
        </div>
      </div>
      <div class="row justify-center bg-three-creators q-pt-xl q-pb-xl">
        <div class="col-12 col-md-8">
          <ShowThreeCreatorsHome/>
          <div class="text-center text-h4 text-weight-light q-pa-xl">Conocé nuestros creadores</div>
          <q-separator/>
        </div>
      </div>
    </div>
    <template>
      <div class="container">
        <div class="row justify-center q-pt-xl q-pb-xl">
          <div class="col-12 col-md-8">
            <q-card
              bordered
              class="q-ma-md"
              flat
            >
              <q-card-section
                class="no-padding"
                style="min-height:20vh;background-color:#EDEFF3"
              >
                <div class="row">
                  <div
                    class="col-12 col-md-6 flex"
                    style="align-items: center;"
                  >
                    <div class="q-pa-lg">
                      <div class="text-h4 text-weight-light">
                        También podés apoyar a tus creadores favoritos y
                        alentarlos para que sigan haciendo lo que aman.
                      </div>
                    </div>
                  </div>
                  <div class="col-12 col-md-6">
                    <q-img
                      :ratio="16 / 9"
                      src="https://images.pexels.com/photos/374068/pexels-photo-374068.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
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
                  label="Registrarse"
                  text-color="black"
                  to="/Register"
                />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </template>
    <template>
      <div class="container">
        <div class="row justify-center q-pt-xl q-pb-xl">
          <div class="col-12 col-md-8">
            <q-separator></q-separator>
            <div class="text-center text-h4 text-weight-light q-pa-xl">¿Cómo empezar?</div>
            <div
              bordered
              class="q-ma-md"
              flat
            >
              <q-stepper
                ref="stepper"
                v-model="step"
                animated
                color="secondary"
                flat
              >
                <q-step
                  :done="step > 1"
                  :name="1"
                  class="text-h6 text-weight-light"
                  color="secondary"
                  icon="person_add"
                  title="Registrate en Creator House"
                >
                  En menos de 1 minuto podés crear una cuenta siguiendo desde el botón "Registrarse". Después de este
                  paso, ya estás listo para seguir y ver el contenido de otros.
                </q-step>

                <q-step
                  :done="step > 2"
                  :name="2"
                  caption="Opcional"
                  class="text-h6 text-weight-light"
                  color="secondary"
                  icon="person_add"
                  title="Ser creador"
                >
                  Luego de crearte una cuenta, en tu home, hacés click en "Ser creador" y terminás de completar los
                  datos para ser creador y subir contenido.
                </q-step>
                <q-step
                  :done="step > 3"
                  :name="3"
                  class="text-h6 text-weight-light"
                  color="secondary"
                  icon="cloud_upload"
                  title="Subí contenido"
                >
                  El último paso es empezar a crear posts públicos y premium para que las personas vean lo que hacés y
                  también puedan acceder a tu contenido exclusivo.
                </q-step>

                <template v-slot:navigation>
                  <q-stepper-navigation>
                    <q-btn
                      :label="step === 3 ? 'Listo' : 'Continuar'"
                      color="primary"
                      @click="$refs.stepper.next()"
                    />
                    <q-btn
                      v-if="step > 1"
                      class="q-ml-sm"
                      color="primary"
                      flat
                      label="Atrás"
                      @click="$refs.stepper.previous()"
                    />
                  </q-stepper-navigation>
                </template>
              </q-stepper>
            </div>
          </div>
        </div>
      </div>
    </template>
  </q-page>
</template>
<script>
import ShowThreeCreatorsHome from 'components/ShowThreeCreatorsHome.vue'
import * as axios from 'axios'

export default {
  name: 'PageIndex',
  components: { ShowThreeCreatorsHome },
  data () {
    return {
      users: [],
      info: null,
      step: 1
    }
  },
  mounted () {
    const params = new URLSearchParams(location.search)
    var code = params.get('code')
    if (code != null) {
      axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('apiToken')
      }
      axios.get('http://localhost:8000/api/mercado-pago/callback/' + code, {
        token: sessionStorage.getItem('apiToken')
      })
        .then((response) => {
          console.log(response.data)
          const baseUrl = window.location.origin
          window.location = baseUrl + '/#/EditUser'
        })
        .catch(err => {
          console.log(err.response)
          const baseUrl = window.location.origin
          window.location = baseUrl + '/#/EditUser'
        })
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
  background-image: linear-gradient($primary 37%, #ffffff 0%);
}
</style>
