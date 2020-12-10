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
                <div v-if="isLogin" class="q-pa-md q-gutter-sm">
                    <div v-if="follow !== null">
                      <div v-if="!isFollow">
                        <q-btn
                          color="white"
                          label="Seguir"
                          text-color="black"
                          @click="followUser"
                        />
                      </div>
                      <div v-else>
                        <q-btn
                          color="white"
                          label="Dejar de seguir"
                          text-color="black"
                          @click="unfollowUser"
                        />
                      </div>
                      <div v-if="!doesntHaveMercadoPago">
                        <a v-if="!isVip" :disabled="disabledSerVip" v-bind:href="linkPago">
                          <q-btn
                            label="Ser VIP"
                            outline
                            style="secondary"
                            text-color="black"
                          />
                        </a>
                      </div>
                    </div>
                  <div v-if="!doesntHaveMercadoPago">
                      <q-btn
                        color="primary"
                        label="Donar"
                        text-color="white"
                        @click="donatePrompt = true"
                      />
                      <q-dialog v-model="donatePrompt" persistent>
                        <q-card style="min-width: 350px">
                          <q-card-section>
                            <div class="text-h6">¿Cuánto quiere donar?</div>
                          </q-card-section>

                          <q-card-section class="q-pt-none">
                            <q-input v-model="donateAmmount" :rules="[val => val > 0 || 'El numero debe ser mayor a 0']" autofocus dense
                                     @keyup.enter="donatePrompt = false"/>
                          </q-card-section>

                          <q-card-actions align="right" class="text-primary">
                            <q-btn v-close-popup flat label="Cancelar"/>
                            <q-btn v-close-popup flat label="Donar" @click="donate(donateAmmount)"/>
                          </q-card-actions>
                        </q-card>
                      </q-dialog>
                  </div>
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
                v-for="(post, i) in postsCreator"
                :key="i"
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
                    <div v-if="!post.isPrivate">
                      <div class="text-body1 text-dark">
                        {{ post.content }}
                      </div>
                    </div>
                    <div v-else>
                      <div class="text-body1 text-dark">
                        Contenido bloqueado
                      </div>
                    </div>
                  </q-card-section>
                  <q-separator></q-separator>
                  <div v-if="!post.isPrivate">
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
                  </div>
                  <q-card-actions align="right">
                    <q-btn
                      v-if="!post.isPublic && post.isPrivate"
                      color="primary"
                      disable
                      icon-right="lock_outline"
                      label="Suscríbase para desbloquear"
                      outline
                    />
                    <div
                      v-if="post.isPublic || !post.isPrivate">
                      <q-btn
                        color="primary"
                        icon-right="comment"
                        label="Comentarios"
                        outline
                        v-bind:to="`/creator/${$route.params.idCreator}/post/${post.id}`"
                      />
                      <q-btn
                        v-if="!post.alreadyLiked && isLogin"
                        class="q-ml-md"
                        color="primary"
                        flat
                        icon="favorite"
                        round
                        @click="likePost(post.id,i)"
                      >
                        <q-badge
                          color="secondary"
                          floating
                        >{{ post.cantLikes }}
                        </q-badge>
                      </q-btn>
                      <q-btn
                        v-else-if="post.alreadyLiked && isLogin"
                        class="q-ml-md"
                        color="primary"
                        flat
                        icon="favorite"
                        round
                        @click="unlikePost(post.id,i)"
                      >
                        <q-badge
                          color="primary"
                          floating>
                          {{ post.cantLikes }}
                        </q-badge>
                      </q-btn>
                      <q-btn
                        v-else
                        class="q-ml-md"
                        color="primary"
                        disable
                        flat
                        icon="favorite"
                        round
                      >
                        <q-badge
                          color="secondary"
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
      isVip: false,
      doesntHaveMercadoPago: false,
      follow: [],
      isLogin: false,
      linkPago: '',
      disabledSerVip: true,
      donatePrompt: false,
      donateAmmount: ''
    }
  },
  mounted: function () {
    if (sessionStorage.getItem('apiToken')) {
      this.isLogin = true
      // devuelve true si está la sesión iniciada
    } else {
      this.isLogin = false
    }

    this.getPostsCreator()
    this.getAllCreator()
    // Verifico si hay una sesion iniciada
    if (this.isLogin) {
      // tengo un token guardado localmente
      this.getUser()
      this.getIsFollow()
    }
  },
  methods: {
    donate (monto) {
      monto = monto.replace('.', ',')

      axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('apiToken')
      }
      axios.get('http://localhost:8000/api/creators/' + this.$route.params.idCreator + '/donate/' + monto, {
        token: sessionStorage.getItem('apiToken')
      })
        .then((response) => {
          console.log(response)
          window.location.href = response.data.data
          // const mercadoPagoScript = document.createElement('script')
          // mercadoPagoScript.setAttribute('src', 'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js')
          // mercadoPagoScript.setAttribute('data-preference-id', response.data.data)
          // document.body.appendChild(mercadoPagoScript)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getPaymentScript () {
      axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('apiToken')
      }
      axios.get('http://localhost:8000/api/creators/' + this.$route.params.idCreator + '/pay', {
        token: sessionStorage.getItem('apiToken')
      })
        .then((response) => {
          console.log(response)
          this.linkPago = response.data.data
          this.disabledSerVip = false
          // const mercadoPagoScript = document.createElement('script')
          // mercadoPagoScript.setAttribute('src', 'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js')
          // mercadoPagoScript.setAttribute('data-preference-id', response.data.data)
          // document.body.appendChild(mercadoPagoScript)
        })
        .catch(err => {
          this.doesntHaveMercadoPago = true
          console.log(err)
        })
    },
    unlikePost (postId, index) {
      axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('apiToken')
      }
      axios.post('http://localhost:8000/api/posts/unlike/' + postId + '/' + this.user.data.id, {
        token: sessionStorage.getItem('apiToken')
      })
        .then((response) => {
          this.$nextTick(function () {
            this.postsCreator[index].alreadyLiked = false
            this.postsCreator[index].cantLikes = this.postsCreator[index].cantLikes - 1
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
    likePost (postId, index) {
      axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('apiToken')
      }
      axios.post('http://localhost:8000/api/posts/like/' + postId + '/' + this.user.data.id, {
        token: sessionStorage.getItem('apiToken')
      })
        .then((response) => {
          this.$nextTick(function () {
            this.postsCreator[index].alreadyLiked = true
            this.postsCreator[index].cantLikes = this.postsCreator[index].cantLikes + 1
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
          this.$q.notify({
            type: 'positive',
            message: 'Siguio al creador con exito'
          })
        })
        .catch(err => {
          this.$q.notify({
            type: 'negative',
            message: 'Ocurrió un error al intentar seguir al creador, vuelva a intentar'
          })
          console.log(err)
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
          this.$q.notify({
            type: 'positive',
            message: 'Dejo de seguir al creador con exito'
          })
        })
        .catch(err => {
          this.$q.notify({
            type: 'negative',
            message: 'Ocurrió un error al intentar dejar de seguir al creador, vuelva a intentar'
          })
          console.log(err)
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
          this.user = response.data
          this.makeVip()
          this.getPaymentScript()
        })
        .catch(err => {
          this.$q.notify({
            type: 'negative',
            message: 'Ocurrió un error al obtener datos del usuario, vuelva a intentar'
          })
          console.log(err, 'hollaaaaa')
        })
    },
    makeVip () {
      let mercadoPagoStatus = null
      if (window.location.href.split('&')[3] !== undefined) {
        if (window.location.href.split('&')[4] !== undefined) {
          if (window.location.href.split('&')[4].split('=')[1] !== 'donar') {
            mercadoPagoStatus = window.location.href.split('&')[3].split('=')[1]
          } else {
            this.$q.notify({
              type: 'positive',
              message: 'Dono con exito'
            })
          }
        }
      }
      if (mercadoPagoStatus !== null && mercadoPagoStatus === 'approved') {
        axios.defaults.headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + sessionStorage.getItem('apiToken')
        }
        axios.post('http://localhost:8000/api/creator/makeVip/' + this.$route.params.idCreator, {
          token: sessionStorage.getItem('apiToken')
        })
          .then((response) => {
            console.log(response)
            this.isVip = true
            location.reload()
          })
          .catch(err => {
            this.$q.notify({
              type: 'positive',
              message: 'Ahora es VIP'
            })
            this.isVip = true
            console.log(err)
          })
      }
    },
    // En postsCreator estan todos los posts de ese creator (con imagens videos y like si es que los tiene)
    getPostsCreator: async function () {
      var idCreator = this.$route.params.idCreator
      if (this.isLogin) {
        axios.defaults.headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + sessionStorage.getItem('apiToken')
        }
      }
      // alert(idCreator)
      axios.get('http://localhost:8000/postscreator/' + idCreator)
        .then((response) => {
          this.postsCreator = response.data
        })
        .catch((error) => {
          this.$q.notify({
            type: 'negative',
            message: 'Ocurrió un error al obtener los posts del creador, vuelva a intentar'
          })
          console.log(error)
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
          this.follow = response.data
          console.log(this.follow, 'hola')
          this.isFollow = true
        })
        .catch((error) => {
          console.log(error, 'hola')
          if (error.response.status !== 404) {
            this.$q.notify({
              type: 'negative',
              message: 'Ocurrió un error al obtener si sigue al creador, vuelva a intentar'
            })
          }
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
          this.$q.notify({
            type: 'negative',
            message: 'Ocurrió un error al obtener los datos del creador, vuelva a intentar'
          })
          console.log(error)
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
