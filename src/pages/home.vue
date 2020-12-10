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
                      <div v-if="user.data.avatar">
                        <q-avatar size="80px">
                          <img v-bind:src="`http://localhost:8000/${user.data.avatar}`">
                        </q-avatar>
                      </div>
                      <div v-else>
                        <q-avatar size="80px">
                          <img src="https://www.placecage.com/c/100/100"/>
                        </q-avatar>
                      </div>
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
                        <q-scroll-area
                          :bar-style="barStyle"
                          :thumb-style="thumbStyle"
                          style="height: 300px; max-width: 350px;"
                        >
                          <q-list
                            v-for="followedCreator in postsCreators"
                            :key="followedCreator.id"
                            bordered
                            separator
                          >
                            <q-item
                              v-ripple
                              clickable
                              @click="goHomeCreator(followedCreator.creator.id)"
                            >
                              <q-item-section avatar>
                                <q-avatar>
                                  <img v-bind:src="`http://localhost:8000/${followedCreator.user[0].avatar}`">
                                </q-avatar>
                              </q-item-section>

                              <q-item-section>
                                <q-item-label>{{ followedCreator.user[0].username }}</q-item-label>
                              </q-item-section>
                            </q-item>
                          </q-list>
                        </q-scroll-area>
                      </div>
                    </template>
                  </q-card-section>
                </q-card>
              </div>
              <div class="col-12 col-md-6">
                <template>
                  <div class="q-pa-sm">
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
                          <div
                            v-for="(allPublicPost,i) in publicPosts"
                            v-bind:key="`${allPublicPost.idUser}/${allPublicPost.idCreator}`"
                          >
                            <q-card
                              v-for="(onePublicPost) in allPublicPost.posts"
                              :key="onePublicPost.id"
                              class="q-mb-lg"
                            >
                              <q-item
                                v-ripple
                                clickable
                                @click="goHomeCreator(onePublicPost.idCreator)"
                              >
                                <q-item-section avatar>
                                  <q-avatar>
                                    <img v-bind:src="`http://localhost:8000/${onePublicPost.user[0].avatar}`">
                                  </q-avatar>
                                </q-item-section>
                                <q-item-section>
                                  <q-item-label>{{ onePublicPost.user[0].username }}</q-item-label>
                                  <q-item-label caption>{{ onePublicPost.date }}</q-item-label>
                                </q-item-section>
                              </q-item>
                              <q-separator/>
                              <q-card-section>
                                <div
                                  v-if="onePublicPost.tipo == 1"
                                  class="text-overline text-primary"
                                >Texto
                                </div>
                                <div
                                  v-if="onePublicPost.tipo == 2"
                                  class="text-overline text-primary"
                                >Imágenes
                                </div>
                                <div
                                  v-if="onePublicPost.tipo == 3"
                                  class="text-overline text-primary"
                                >Video
                                </div>
                                <div class="text-h5 q-mt-sm q-mb-xs">{{ onePublicPost.title }}</div>
                                <div class="text-body1 text-dark">{{ onePublicPost.content }}</div>
                              </q-card-section>
                              <div
                                v-for="image in onePublicPost.images"
                                :key="image.id"
                              >
                                <q-img
                                  :ratio="4/3"
                                  v-bind:src="`${image.image}`"
                                />
                              </div>
                              <div v-if="onePublicPost.videos.length > 0">
                                <iframe
                                  class="no-margin no-padding"
                                  frameborder="0"
                                  height="360px"
                                  v-bind:src="onePublicPost.videos[0].video"
                                  width="100%"
                                ></iframe>
                              </div>
                              <q-separator></q-separator>
                              <q-card-actions align="right">
                                <q-btn
                                  color="primary"
                                  icon-right="comment"
                                  label="Comentarios"
                                  outline
                                  v-bind:to="`/creator/${allPublicPost.idCreator}/post/${onePublicPost.id}`"
                                />
                                <q-btn
                                  v-if="!onePublicPost.alreadyLiked"
                                  class="q-ml-md"
                                  color="primary"
                                  flat
                                  icon="favorite"
                                  round
                                  @click="likePost(onePublicPost.id,i,'p')"
                                >
                                  <q-badge
                                    color="secondary"
                                    floating
                                  >{{ onePublicPost.cantLikes }}
                                  </q-badge>
                                </q-btn>
                                <q-btn
                                  v-else-if="onePublicPost.alreadyLiked"
                                  class="q-ml-md"
                                  color="primary"
                                  flat
                                  icon="favorite"
                                  round
                                  @click="unlikePost(onePublicPost.id,i,'p')"
                                >
                                  <q-badge
                                    color="primary"
                                    floating>
                                    {{ onePublicPost.cantLikes }}
                                  </q-badge>
                                </q-btn>
                              </q-card-actions>
                            </q-card>
                          </div>
                        </q-tab-panel>
                        <q-tab-panel name="premium">
                          <div
                            v-for="(allPrivatePost,i) in privatePosts"
                            v-bind:key="`${allPrivatePost.idUser}/${allPrivatePost.idCreator}`"
                          >
                            <q-card
                              v-for="onePrivatePost in allPrivatePost.posts"
                              :key="onePrivatePost.id"
                              class="q-mb-lg"
                            >
                              <q-item
                                v-ripple
                                clickable
                                @click="goHomeCreator(onePrivatePost.idCreator)"
                              >
                                <q-item-section avatar>
                                  <q-avatar>
                                    <img v-bind:src="`http://localhost:8000/${onePrivatePost.user[0].avatar}`">
                                  </q-avatar>
                                </q-item-section>
                                <q-item-section>
                                  <q-item-label>{{ onePrivatePost.user[0].username }}</q-item-label>
                                  <q-item-label caption>{{ onePrivatePost.date }}</q-item-label>
                                </q-item-section>
                              </q-item>
                              <q-separator/>
                              <q-card-section>
                                <div
                                  v-if="onePrivatePost.tipo == 1"
                                  class="text-overline text-primary"
                                >Texto
                                </div>
                                <div
                                  v-if="onePrivatePost.tipo == 2"
                                  class="text-overline text-primary"
                                >Imágenes
                                </div>
                                <div
                                  v-if="onePrivatePost.tipo == 3"
                                  class="text-overline text-primary"
                                >Video
                                </div>
                                <div class="text-h5 q-mt-sm q-mb-xs">{{ onePrivatePost.title }}</div>
                                <div class="text-body1 text-dark">{{ onePrivatePost.content }}</div>
                              </q-card-section>
                              <div
                                v-for="image in onePrivatePost.images"
                                :key="image.id"
                              >
                                <q-img
                                  :ratio="4/3"
                                  v-bind:src="`${image.image}`"
                                />
                              </div>
                              <div v-if="onePrivatePost.videos.length > 0">
                                <iframe
                                  class="no-margin no-padding"
                                  frameborder="0"
                                  height="360px"
                                  v-bind:src="onePrivatePost.videos[0].video"
                                  width="100%"
                                ></iframe>
                              </div>
                              <q-separator></q-separator>
                              <q-card-actions align="right">
                                <q-btn
                                  color="primary"
                                  icon-right="comment"
                                  label="Comentarios"
                                  outline
                                  v-bind:to="`/creator/${allPrivatePost.idCreator}/post/${onePrivatePost.id}`"
                                />
                                <q-btn
                                  v-if="!onePrivatePost.alreadyLiked"
                                  class="q-ml-md"
                                  color="primary"
                                  flat
                                  icon="favorite"
                                  round
                                  @click="likePost(onePrivatePost.id,i,'pv')"
                                >
                                  <q-badge
                                    color="secondary"
                                    floating
                                  >{{ onePrivatePost.cantLikes }}
                                  </q-badge>
                                </q-btn>
                                <q-btn
                                  v-else-if="onePrivatePost.alreadyLiked"
                                  class="q-ml-md"
                                  color="primary"
                                  flat
                                  icon="favorite"
                                  round
                                  @click="unlikePost(onePrivatePost.id,i,'pv')"
                                >
                                  <q-badge
                                    color="primary"
                                    floating>
                                    {{ onePrivatePost.cantLikes }}
                                  </q-badge>
                                </q-btn>
                              </q-card-actions>
                            </q-card>
                          </div>
                        </q-tab-panel>
                      </q-tab-panels>
                    </div>
                  </div>
                </template>
              </div>
              <div class="col-12 col-md-3">
                <q-card
                  v-if="!isCreator"
                  bordered
                  class="q-ma-sm "
                  flat
                >
                  <q-card-section>
                    <div class="text-h6">Convertite en Creador</div>
                    <q-separator></q-separator>
                    <div class="text-body2">Terminá de completar tu página y empezá a postear.</div>
                  </q-card-section>

                  <q-separator/>

                  <q-card-actions vertical>
                    <q-btn
                      color="primary"
                      label="Ser Creador"
                      style="width: 100%;"
                      to="/RegisterCreator"
                    />
                  </q-card-actions>
                </q-card>
                <q-card
                  v-if="isCreator"
                  bordered
                  class="q-ma-sm "
                  flat
                >
                  <q-card-section>
                    <div class="text-h6">Vas a publicar hoy?</div>
                  </q-card-section>

                  <q-separator/>

                  <q-card-actions vertical>
                    <q-btn
                      color="primary"
                      content-class="bg-grey-1"
                      label="CREAR POST"
                      spread
                      unelevated
                      v-bind:to="`/CreatePost/${creator.data.id}`"
                    >
                    </q-btn>
                  </q-card-actions>
                </q-card>
                <q-card
                  bordered
                  class="q-ma-sm"
                  flat
                >
                  <q-card-section>
                    <div class="text-h6">Tu frase del día:</div>
                  </q-card-section>

                  <q-separator/>
                  <q-card-section class="bg-indigo-1">
                    <div class="text-body2">{{ phrase }}</div>
                  </q-card-section>

                </q-card>
                <div class="q-pa-sm text-overline text-center">El creador random de hoy.</div>
                <OneRandomCreator/>
                <!-- <div>
                  <pre>{{publicPosts}}</pre>
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
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
      publicPosts: [],
      privatePosts: [],
      isCreator: false,
      tab: 'publico',
      phrase: ''
    }
  },
  created () {
    this.getPhrase()
  },
  mounted () {
    // Verifico si hay una sesion iniciada
    if (sessionStorage.getItem('apiToken')) {
      // tengo un token guardado localmente
      this.getUser()
      this.removeVips()
    } else {
      // sino redirecciono al login
      this.$router.push(this.$route.query.redirect || '/Login')
    }
  },
  methods: {
    removeVips () {
      axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('apiToken')
      }
      axios.post('http://localhost:8000/api/creator/removeVip/', {
        token: sessionStorage.getItem('apiToken')
      })
        .then((response) => {
        })
        .catch(err => {
          console.log(err)
        })
    },
    unlikePost (postId, index, pOrPr) {
      axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('apiToken')
      }
      axios.post('http://localhost:8000/api/posts/unlike/' + postId + '/' + this.user.data.id, {
        token: sessionStorage.getItem('apiToken')
      })
        .then((response) => {
          this.$nextTick(function () {
            if (pOrPr === 'p') {
              this.publicPosts[index].alreadyLiked = false
              this.publicPosts[index].cantLikes = this.publicPosts[index].cantLikes - 1
            } else {
              this.privatePosts[index].alreadyLiked = false
              this.privatePosts[index].cantLikes = this.privatePosts[index].cantLikes - 1
            }
            location.reload()
          })
          this.$q.notify({
            type: 'positive',
            message: 'Quito su like con éxito'
          })
        })
        .catch(err => {
          this.$q.notify({
            type: 'negative',
            message: 'Ocurrió un error al quitar el like, vuelva a intentar'
          })
          console.log(err)
        })
    },
    likePost (postId, index, pOrPr) {
      axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('apiToken')
      }
      axios.post('http://localhost:8000/api/posts/like/' + postId + '/' + this.user.data.id, {
        token: sessionStorage.getItem('apiToken')
      })
        .then((response) => {
          this.$nextTick(function () {
            if (pOrPr === 'p') {
              this.publicPosts[index].alreadyLiked = true
              this.publicPosts[index].cantLikes = this.publicPosts[index].cantLikes + 1
            } else {
              this.privatePosts[index].alreadyLiked = true
              this.privatePosts[index].cantLikes = this.privatePosts[index].cantLikes + 1
            }
            location.reload()
          })
          this.$q.notify({
            type: 'positive',
            message: 'Dio like con éxito'
          })
        })
        .catch(err => {
          this.$q.notify({
            type: 'negative',
            message: 'Ocurrió un error al dar like, vuelva a intentar'
          })
          console.log(err)
        })
    },
    getPhrase () {
      axios.get('http://localhost:8000/getFrase', {})
        .then((response) => {
          console.log(response.data)
          this.phrase = response.data
        })
        .catch(err => {
          console.log(err.response)
          // Si dio error muestro mensaje
        })
    },
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
          this.getPublicPosts()
          this.getPrivatePosts()
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
    },
    getPublicPosts () {
      // alert(this.user.data)
      axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('apiToken')
      }
      axios.get('http://localhost:8000/postsPublic/' + this.user.data.id, {
        token: sessionStorage.getItem('apiToken')
      })
        .then((response) => {
          console.log(response.data)
          // alert('ok')
          this.publicPosts = response.data
        })
        .catch(err => {
          console.log(err.response)
          // alert('error')
        })
    },
    getPrivatePosts () {
      // alert(this.user.data)
      axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('apiToken')
      }
      axios.get('http://localhost:8000/postsPremium/' + this.user.data.id, {
        token: sessionStorage.getItem('apiToken')
      })
        .then((response) => {
          console.log(response.data)
          // alert('ok')
          this.privatePosts = response.data
        })
        .catch(err => {
          console.log(err.response)
          // alert('error')
        })
    },
    goHomeCreator ($idCreator) {
      this.$router.push(this.$route.query.redirect || '/Creator/' + $idCreator)
    }
  }
}
</script>
