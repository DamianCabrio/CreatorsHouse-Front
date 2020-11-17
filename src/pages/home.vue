<template>
  <q-page class="">
    <template>
      <div>
        <div class="row justify-center">
          <div class="col-12 col-md-8 q-pa-md q-gutter-sm">
            <div class="row justify-center">
              <div class="col-12 col-md-3">
                <q-card
                  bordered
                  class="q-ma-sm"
                  flat
                >
                  <template>
                    <div class="q-pa-md q-gutter-sm center flex flex-center">
                      <q-avatar size="80px">
                        <img v-bind:src="`http://localhost:8000/img/${user.data.avatar}`">
                      </q-avatar>
                    </div>
                  </template>
                  <q-card-section align="center">
                    <div class="text-h6 text-weight-light">{{ user.data.username }}</div>
                  </q-card-section>
                  <q-separator></q-separator>
                  <q-card-section>
                    <div class="text-overline">SIGUIENDO</div>
                    <template>
                      <div style="max-width: 350px">
                        <q-list
                          bordered
                          separator
                        >
                          <q-item
                            v-ripple
                            clickable
                          >
                            <q-item-section avatar>
                              <q-avatar>
                                <img src="https://cdn.quasar.dev/img/avatar5.jpg">
                              </q-avatar>
                            </q-item-section>

                            <q-item-section>
                              <q-item-label>username</q-item-label>
                            </q-item-section>
                          </q-item>

                          <q-item
                            v-ripple
                            clickable
                          >
                            <q-item-section avatar>
                              <q-avatar>
                                <img src="https://cdn.quasar.dev/img/avatar3.jpg">
                              </q-avatar>
                            </q-item-section>

                            <q-item-section>
                              <q-item-label>username</q-item-label>
                            </q-item-section>
                          </q-item>

                          <q-item
                            v-ripple
                            clickable
                          >
                            <q-item-section avatar>
                              <q-avatar>
                                <img src="https://cdn.quasar.dev/img/avatar4.jpg">
                              </q-avatar>
                            </q-item-section>

                            <q-item-section>
                              <q-item-label>username</q-item-label>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </div>
                    </template>
                  </q-card-section>
                </q-card>
              </div>
              <div class="col-12 col-md-6">
                <template>
                  <div class="q-pa-md">
                    <div class="q-gutter-y-md">
                      <q-tabs
                        v-model="tab"
                        active-color="primary"
                        align="justify"
                        class="text-grey"
                        dense
                        indicator-color="primary"
                        narrow-indicator
                      >
                        <q-tab
                          label="Público"
                          name="publico"
                        />
                        <q-tab
                          label="Premium"
                          name="premium"
                        />
                      </q-tabs>

                      <q-separator/>

                      <q-tab-panels
                        v-model="tab"
                        animated
                      >
                        <q-tab-panel name="publico">
                          <q-intersection
                            once
                            transition="scale"
                          >
                            <q-card
                              v-ripple
                              class="my-card q-ma-sm q-mb-lg"
                              clickable
                            >
                              <q-card-section>
                                <q-item>
                                  <q-item-section avatar>
                                    <q-avatar>
                                      <img src="https://cdn.quasar.dev/img/avatar3.jpg">
                                    </q-avatar>
                                  </q-item-section>
                                  <q-item-section>Lily</q-item-section>
                                </q-item>
                              </q-card-section>
                              <img src="https://cdn.quasar.dev/img/mountains.jpg">
                              <q-card-section class="q-pb-none">
                                10/26/2020
                              </q-card-section>
                              <q-card-section>
                                <div class="text-h6">Our Changing Planet</div>
                              </q-card-section>

                              <q-card-section class="q-pt-none">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                              </q-card-section>
                              <q-card-actions align="right">
                                <q-btn
                                  color="red"
                                  flat
                                  icon="favorite"
                                  round
                                />
                                <q-btn
                                  color="primary"
                                  flat
                                  icon="share"
                                  round
                                />
                              </q-card-actions>
                            </q-card>
                          </q-intersection>
                          <div align="center">
                            <q-btn
                              color="primary"
                              label="Ver Más"
                              size="lg"
                            />
                          </div>
                        </q-tab-panel>
                        <q-tab-panel name="premium">
                          <q-intersection
                            once
                            transition="scale"
                          >
                            <q-card
                              v-ripple
                              class="my-card q-ma-sm q-mb-lg"
                              clickable
                            >
                              <q-card-section>
                                <q-item>
                                  <q-item-section avatar>
                                    <q-avatar>
                                      <img src="https://cdn.quasar.dev/img/avatar5.jpg">
                                    </q-avatar>
                                  </q-item-section>
                                  <q-item-section>By Algunnombre</q-item-section>
                                </q-item>
                              </q-card-section>
                              <img src="https://cdn.quasar.dev/img/mountains.jpg">
                              <q-card-section class="q-pb-none">
                                10/26/2020
                              </q-card-section>
                              <q-card-section>
                                <div class="text-h6">Our Changing Planet</div>
                              </q-card-section>

                              <q-card-section class="q-pt-none">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                              </q-card-section>
                              <q-card-actions align="right">
                                <q-btn
                                  color="red"
                                  flat
                                  icon="favorite"
                                  round
                                />
                                <q-btn
                                  color="primary"
                                  flat
                                  icon="share"
                                  round
                                />
                              </q-card-actions>
                            </q-card>
                          </q-intersection>
                          <div align="center">
                            <q-btn
                              align="center"
                              color="primary"
                              label="Ver Más"
                              size="lg"
                            />
                          </div>
                        </q-tab-panel>
                      </q-tab-panels>
                    </div>
                  </div>
                </template>
              </div>
              <div class="col-12 col-md-3">
                <q-card
                  v-show="!creator"
                  bordered
                  class="q-ma-sm "
                  flat
                >
                  <q-card-section>
                    <div class="text-h6">Convertite en Creador</div>
                    <q-separator></q-separator>
                    <div class="text-body2">Terminá de completar tu página y empezá a postear.</div>
                    <div>En el card va un v-if o v-show="!creator"</div>
                  </q-card-section>

                  <q-separator/>

                  <q-card-actions vertical>
                    <q-btn
                      color="primary"
                      label="Ser Creador"
                      style="width: 100%;"
                      to="/EditUser"
                    />
                  </q-card-actions>
                </q-card>
                <div class="q-pa-sm text-overline text-center">El creador random de hoy.</div>
                <OneRandomCreator/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <div>
      <q-btn
        class="btn-xs"
        @click="logout"
      >Cerrar Sesion
      </q-btn>

    </div>
  </q-page>
</template>

<script>
import * as axios from 'axios'
import OneRandomCreator from 'components/OneRandomCreator.vue'

export default {
  name: 'Home',
  components: { OneRandomCreator },
  data () {
    return {
      user: [],
      creator: [],
      postsCreators: [],
      isCreator: false,
      tab: 'publico'
    }
  },
  mounted () {
    // Verifico si hay una sesion iniciada
    if (sessionStorage.getItem('apiToken')) {
      // tengo un token guardado localmente
      this.getUser()
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
          this.getPostsCreators()
          // Buscar mis datos si soy creador
          if (this.user.data.isCreator === 1) {
            this.isCreator = true
            this.getCreator()
          }
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    // Busco mis datos si soy creator enviando mi id de usuario
    getCreator () {
      axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('apiToken')
      }
      axios.get('http://localhost:8000/api/usercreator/' + this.user.data.id, {
        // token: sessionStorage.getItem('apiToken'),
        // idUser: this.user.data.id
        // idUser: 1
      })
        .then((response) => {
          console.log(response.data)
          this.creator = response.data
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    // Busco todos los post de los creadores a los que sigo
    getPostsCreators () {
      // alert(this.user.data)
      axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('apiToken')
      }
      axios.get('http://localhost:8000/api/following/' + this.user.data.id, {
        token: sessionStorage.getItem('apiToken')
      })
        .then((response) => {
          console.log(response.data)
          // alert('ok')
          this.postsCreators = response.data
        })
        .catch(err => {
          console.log(err.response)
          // alert('error')
        })
    }
  }
}
</script>
