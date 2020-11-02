<template>
  <q-page class="">
    <template>
      <div>
        <div class="row justify-center">
          <div class="col-12 col-md-10 q-pa-md q-gutter-sm">
            <div class="row justify-center">
              <div class="col-12 col-md-3">
                <q-card class="q-ma-sm shadow-1">
                  <template>
                    <div class="q-pa-md q-gutter-sm center  flex flex-center">
                      <q-avatar size="80px">
                        <img src="https://www.placecage.com/gif/200/200">
                      </q-avatar>
                    </div>
                  </template>
                  <q-card-section align="center">
                    <div class="text-h6 text-weight-light">username</div>
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
                            clickable
                            v-ripple
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
                            clickable
                            v-ripple
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
                            clickable
                            v-ripple
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
              <div class="col-12 col-md-5">
                <template>
                  <div class="q-pa-md">
                    <div
                      class="q-gutter-y-md"
                      style="max-width: 600px"
                    >
                      <q-tabs
                        v-model="tab"
                        dense
                        class="text-grey"
                        active-color="primary"
                        indicator-color="primary"
                        align="justify"
                        narrow-indicator
                      >
                        <q-tab
                          name="todos"
                          label="Todos"
                        />
                        <q-tab
                          name="premium"
                          label="Premium"
                        />
                      </q-tabs>

                      <q-separator />

                      <q-tab-panels
                        v-model="tab"
                        animated
                      >
                        <q-tab-panel name="todos">
                          <q-intersection
                            transition="scale"
                            once
                          >
                            <q-card
                              clickable
                              v-ripple
                              class="my-card q-ma-sm q-mb-lg"
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
                          </q-intersection>
                          <q-intersection
                            transition="scale"
                            once
                          >
                            <q-card
                              clickable
                              v-ripple
                              class="my-card q-ma-sm q-mb-lg"
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
                            transition="scale"
                            once
                          >
                            <q-card
                              clickable
                              v-ripple
                              class="my-card q-ma-sm q-mb-lg"
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
                          </q-intersection>
                          <q-btn
                            align="center"
                            color="primary"
                            label="Ver Más"
                            size="lg"
                          />
                        </q-tab-panel>
                      </q-tab-panels>
                    </div>
                  </div>
                </template>
              </div>
              <div class="col-12 col-md-3">
                <q-card
                  v-show="creator"
                  class="q-ma-sm shadow-1"
                >
                  <q-card-section>
                    <div>En el card va un v-if o v-show="!creator"</div>
                    <div class="text-h6">Convertite en Creador</div>
                    <div class="text-body2">Terminá de completar tu página y empezá a postear.</div>
                  </q-card-section>

                  <q-separator />

                  <q-card-actions vertical>
                    <q-btn
                      style="width: 100%;"
                      color="primary"
                      label="Ser Creador"
                    />
                  </q-card-actions>
                </q-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <h1>Bienvenido</h1>
    <div>
      <q-btn
        class="btn-xs"
        @click="logout"
      >Cerrar Sesion</q-btn>
      <div>Datos del Usuario logueado ------------ {{user}}</div>
      <div>Datos si es un creador ---------------- {{creator}}</div>
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
      creator: [],
      isCreator: false,
      tab: 'todos'
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
    }
  }
}
</script>
