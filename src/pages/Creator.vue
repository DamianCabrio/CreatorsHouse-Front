<template>
  <q-page class="">
    <template>
      <div class="">
        <div class="row items-start">
          <template class="card">
            <q-img
              v-show="allCreator.data.banner"
              :src="`http://localhost:8000/${allCreator.data.banner}`"
              class="banner"
            >
            </q-img>
            <q-img
              v-show="!allCreator.data.banner"
              :src="`http://localhost:8000/img/banner-default.jpg`"
              class="banner"
            ></q-img>
          </template>
        </div>
      </div>
    </template>
    <div class="container">
      <div
        class="row justify-center q-pt-md q-pb-md text-dark"
        style="background-color:#f7f7f7"
      >
        <div class="col-12 col-md-8 q-pa-sm">
          <div class="row flex justify-center">
            <div class="col-12 col-md-6">
              <template>
                <div
                  class="q-pa-md q-gutter-sm text-center"
                  style="margin-top:-125px"
                >
                  <q-avatar size="150px">
                    <img
                      style="border:solid 5px white"
                      v-bind:src="`http://localhost:8000/${allCreator.data.user[0].avatar}`"
                    >
                  </q-avatar>
                  <div class="text-h4 text-weight-bold">{{ allCreator.data.user[0].username }}</div>
                  <div class="text-h4 text-overline">{{ allCreator.data.user[0].name }}</div>
                  <div class="text-subtitle1 text-weight-light">Seguidores:</div>
                  <div class="text-h6 text-weight-bold">{{ allCreator.data.cantFollowers }}</div>
                  <div class="row justify-center">
                    <div v-if="allCreator.data.instagram !== null && allCreator.data.instagram !== ''">
                      <a
                        :href=allCreator.data.instagram
                        class="text-body1 text-weight-light q-pa-md text-secondary link-sm"
                        style="text-decoration:none"
                        target="_blank"
                      >Instagram</a>
                    </div>
                    <div v-if="allCreator.data.youtube !== null && allCreator.data.youtube !== ''">
                      <a
                        :href=allCreator.data.youtube
                        class="text-body1 text-weight-light q-pa-md text-secondary link-sm"
                        style="text-decoration:none"
                        target="_blank"
                      >YouTube</a>
                    </div>
                  </div>
                </div>
              </template>
            </div>
            <div class="col-12 text-center">
              <template>
                <div class="q-pa-md q-gutter-sm" v-if="isLogin">
                  <div v-if="!isFollow">
                    <q-btn
                      color="white"
                      text-color="black"
                      label="Seguir"
                      @click="followUser"
                    />
                  </div>
                  <div v-else>
                    <q-btn
                      color="white"
                      text-color="black"
                      label="Dejar de seguir"
                      @click="unfollowUser"
                    />
                  </div>
                  <q-btn
                    color="primary"
                    label="Donar"
                    text-color="white"
                  />
                  <q-btn
                    label="Ser VIP"
                    outline
                    style="secondary"
                    text-color="black"
                  />
                  <div class="mercadoPago"></div>
                </div>
              </template>
            </div>
            <div class="col-12 col-md-8 text-center">
              <div class="text-body1 text-bold q-pa-md">Sobre Mí
                <div class="text-weight-light">{{ allCreator.data.description }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <q-separator></q-separator>
      <div class="row justify-center q-pt-lg q-pb-lg">
        <div class="text-h5 text-weight-light">Posts</div>
      </div>
      <div class="row justify-center">
        <div class="col-12 col-md-10 q-pt-lg q-pb-lg">
          <div class="row justify-center">
            <div class="col-12 col-md-6">
              <div v-if="!postsCreator.length">
                <q-card class="q-mb-md q-mb-xl q-ma-sm">
                  <q-item>
                    <q-item-section avatar>
                      <q-avatar>
                        <img v-bind:src="`http://localhost:8000/${allCreator.data.user[0].avatar}`">
                      </q-avatar>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>{{ allCreator.data.user[0].username }}</q-item-label>
                      <q-item-label caption>Oh Oh, no hay posts todavía.</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator></q-separator>
                  <q-card-section class="no-padding">
                    <q-img
                      :src="`http://localhost:8000/img/zero-posts.gif`"
                      class="no-margin"
                      ratio="1"
                    ></q-img>
                  </q-card-section>
                </q-card>
              </div>
              <div
                v-for="post in postsCreator"
                :key="post.id"
              >
                <q-card class="q-mb-md q-mb-xl q-ma-sm">
                  <q-item>
                    <q-item-section avatar>
                      <q-avatar>
                        <img v-bind:src="`http://localhost:8000/${allCreator.data.user[0].avatar}`">
                      </q-avatar>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>{{ allCreator.data.user[0].username }}</q-item-label>
                      <q-item-label caption>{{ post.date }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-separator></q-separator>
                  <q-card-section>
                    <div
                      v-if="post.tipo == 1"
                      class="text-overline text-primary"
                    >Texto
                    </div>
                    <div
                      v-if="post.tipo == 2"
                      class="text-overline text-primary"
                    >Imágenes
                    </div>
                    <div
                      v-if="post.tipo == 3"
                      class="text-overline text-primary"
                    >Video
                    </div>
                    <div class="text-h5 q-mt-sm q-mb-xs">{{ post.title }}</div>
                    <div class="text-body1 text-dark">
                      {{ post.content }}
                    </div>
                  </q-card-section>
                  <q-separator></q-separator>
                  <q-card-section class="no-padding">
                    <div
                      v-for="image in post.images"
                      :key="image.id"
                    >
                      <q-img
                        :ratio="4/3"
                        v-bind:src="`${image.image}`"
                      />
                    </div>
                  </q-card-section>
                  <q-separator></q-separator>
                  <q-item
                    v-for="video in post.videos"
                    :key="video.id"
                    class="no-margin no-padding"
                  >
                    <iframe
                      class="no-margin no-padding"
                      frameborder="0"
                      height="360px"
                      v-bind:src="video.video"
                      width="100%"
                    ></iframe>
                  </q-item>
                  <q-card-actions align="right">
                    <q-btn
                      v-if="post.isPublic"
                      color="primary"
                      icon-right="lock_outline"
                      label="Desbloquear"
                      outline
                    />
                    <div
                      v-if="!post.isPublic">
                      <q-btn
                        v-if="!post.alreadyLiked"
                        class="q-ml-md"
                        color="primary"
                        flat
                        icon="favorite"
                        round
                        @click="likePost(post.id)"
                      >
                        <q-badge
                          color="secondary"
                          floating
                        >{{ post.cantLikes }}
                        </q-badge>
                      </q-btn>
                      <q-btn
                        v-else
                        class="q-ml-md"
                        color="primary"
                        flat
                        icon="favorite"
                        round
                        @click="unlikePost(post.id)"
                      >
                        <q-badge
                          color="primary"
                          floating>
                          {{ post.cantLikes }}
                        </q-badge>
                      </q-btn>
                    </div>
                  </q-card-actions>
                </q-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import * as axios from 'axios'

export default {
  name: 'Creator',
  data () {
    return {
      postsCreator: [],
      allCreator: [],
      user: [],
      isCreator: false,
      isFollow: false,
      follow: [],
      isLogin: false
    }
  },
  mounted: function () {
    const mercadoPagoScript = document.createElement('script')
    mercadoPagoScript.setAttribute('src', 'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js')
    mercadoPagoScript.setAttribute('data-preference-id', '677439646-156d5e58-8883-44e9-98ab-7b002f16d2c6')
    // const mercadoPago = document.getElementsByClassName('mercadoPago')
    // console.log(mercadoPago[0])
    document.body.appendChild(mercadoPagoScript)
    // document.getElementById('mercadoPago').appendChild(mercadoPagoScript)

    if (sessionStorage.getItem('apiToken')) {
      this.isLogin = true
      // devuelve true si está la sesión iniciada
    } else {
      this.isLogin = false
    }

    console.log(this.isLogin)

    this.getPostsCreator()
    this.getAllCreator()
    // Verifico si hay una sesion iniciada
    if (sessionStorage.getItem('apiToken')) {
      // tengo un token guardado localmente
      this.getUser()
      this.getIsFollow()
    }
    // NOTE: YA CARGA EL SCRIPT, FALTA AGREGAR EL ID DE PREFERENCE
    const mercadopago = document.createElement('script')
    mercadopago.setAttribute('src', 'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js')
    document.head.appendChild(mercadopago)
  },
  methods: {
    unlikePost (postId) {
      axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('apiToken')
      }
      axios.post('http://localhost:8000/api/posts/unlike/' + postId + '/' + this.user.data.id, {
        token: sessionStorage.getItem('apiToken')
      })
        .then((response) => {
          this.$nextTick(function () {
            this.postsCreator[postId].alreadyFollow = false
            console.log(this.postsCreator[postId])
          })
          console.log(response.data)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    likePost (postId) {
      axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('apiToken')
      }
      axios.post('http://localhost:8000/api/posts/like/' + postId + '/' + this.user.data.id, {
        token: sessionStorage.getItem('apiToken')
      })
        .then((response) => {
          this.$nextTick(function () {
            this.postsCreator[postId].alreadyFollow = true
            console.log(this.postsCreator[postId])
          })
          console.log(response.data)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    followUser () {
      var idCreator = this.$route.params.idCreator
      axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('apiToken')
      }
      axios.post('http://localhost:8000/api/follow/' + this.user.data.id + '/' + idCreator, {
        token: sessionStorage.getItem('apiToken')
      })
        .then((response) => {
          this.$nextTick(function () {
            this.isFollow = true
          })
          console.log(response.data)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    unfollowUser () {
      var idCreator = this.$route.params.idCreator
      axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('apiToken')
      }
      axios.post('http://localhost:8000/api/unfollow/' + this.user.data.id + '/' + idCreator, {
        token: sessionStorage.getItem('apiToken')
      })
        .then((response) => {
          this.$nextTick(function () {
            this.isFollow = false
          })
          console.log(response.data)
        })
        .catch(err => {
          this.$q.notify({
            message: 'Lo sentimos, vuelva a intentarlo más tarde.',
            color: 'warning'
          })
          this.$q.notify('')
          console.log(err.response)
        })
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
          console.log(response)
          this.user = response.data
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    // En postsCreator estan todos los posts de ese creator (con imagens videos y like si es que los tiene)
    getPostsCreator: async function () {
      var idCreator = this.$route.params.idCreator
      console.log('hola', this.isLogin)
      if (this.isLogin) {
        console.log('hil')
        axios.defaults.headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + sessionStorage.getItem('apiToken')
        }
      }
      // alert(idCreator)
      axios.get('http://localhost:8000/postscreator/' + idCreator)
        .then((response) => {
          this.postsCreator = response.data
          console.log(this.postsCreator)
          // alert(response.data[0].banner)
        })
        .catch((error) => {
          console.log(error)
          // alert(error)
          this.$q.notify({
            message: 'Lo sentimos, vuelva a intentarlo más tarde.',
            color: 'warning'
          })
          this.$q.notify('')
        })
    },
    getIsFollow: async function () {
      var idCreator = this.$route.params.idCreator
      // var idUser = this.user.data.id
      // http://localhost:8000/isFollow?idUser=1&idCreator=3
      axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('apiToken')
      }
      axios.get('http://localhost:8000/api/isFollow/' + idCreator)
        .then((response) => {
          console.log(response)
          this.follow = response.data
          this.isFollow = true
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getAllCreator: async function () {
      var idCreator = this.$route.params.idCreator
      this.idCreator = idCreator
      // alert(idCreator)
      axios.get('http://localhost:8000/creator/' + idCreator)
        .then((response) => {
          this.allCreator = response.data
          // alert(response.data[0].banner)
        })
        .catch((error) => {
          console.log(error)
          // alert(error)
          this.$q.notify({
            message: 'Lo sentimos, vuelva a intentarlo más tarde.',
            color: 'warning'
          })
          this.$q.notify('')
        })
    }
  }
}
</script>
<style lang="stylus">
.banner {
  height: 35vh;
}

.link-sm:hover {
  color: red !important;
}
</style>
