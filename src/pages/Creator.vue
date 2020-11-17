<template>
  <q-page class="">
    <template>
      <div class="">
        <div class="row items-start">
          <template class="card">
            <q-img
              :src=allCreator.data.banner
              class="banner"
            >
            </q-img>
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
                      v-bind:src="`http://localhost:8000/img/${allCreator.data.user[0].avatar}`"
                    >
                  </q-avatar>
                  <div class="text-h4 text-weight-bold">{{allCreator.data.user[0].username}}</div>
                  <q-btn
                    v-if="user.data.id == allCreator.data.idUser"
                    to="/edituser"
                    label="Editar Mi Perfil"
                    icon-right="edit"
                    outline
                    color="primary"
                  />
                  <div class="text-subtitle1 text-weight-light">Seguidores: </div>
                  <div class="text-h6 text-weight-bold">{{allCreator.data.cantFollowers}}</div>
                  <div class="row justify-center">
                    <div v-if="allCreator.data.instagram !== null && allCreator.data.instagram !== ''">
                      <a
                        style="text-decoration:none"
                        class="text-body1 text-weight-light q-pa-md text-secondary link-sm"
                        :href=allCreator.data.instagram
                        target="_blank"
                      >Instagram</a>
                    </div>
                    <div v-if="allCreator.data.youtube !== null && allCreator.data.youtube !== ''">
                      <a
                        style="text-decoration:none"
                        class="text-body1 text-weight-light q-pa-md text-secondary link-sm"
                        :href=allCreator.data.youtube
                        target="_blank"
                      >YouTube</a>
                    </div>
                  </div>
                </div>
              </template>
            </div>
            <div class="col-12 text-center">
              <template>
                <div class="q-pa-md q-gutter-sm">
                  <q-btn
                    color="white"
                    text-color="black"
                    label="Seguir"
                  />
                  <q-btn
                    color="primary"
                    text-color="white"
                    label="Donar"
                  />
                  <q-btn
                    style="secondary"
                    text-color="black"
                    label="Ser VIP"
                    outline
                  />
                </div>
              </template>
            </div>
            <div class="col-12 text-center">
              <div class="text-body1 text-bold q-pa-md">Sobre Mí<div class="text-weight-light">{{allCreator.data.description}}</div>
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
        <div class="col-12 col-md-8 q-pt-lg q-pb-lg">
          <div class="row justify-center">
            <div class="col-12 col-md-6">
              <div
                v-for="post in postsCreator"
                :key="post.id"
              >
                <div v-if="post.id === 1">
                  <q-card class="q-mb-md q-ma-sm">
                    <q-item>
                      <q-item-section avatar>
                        <q-avatar>
                          <img v-bind:src="`http://localhost:8000/img/${allCreator.data.user[0].avatar}`">
                        </q-avatar>
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>{{allCreator.data.user[0].username}}</q-item-label>
                        <q-item-label caption>{{post.date}}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-separator></q-separator>
                    <q-card-section>
                      <div class="text-overline text-primary">Texto</div>
                      <div class="text-h5 q-mt-sm q-mb-xs">{{post.title}}</div>
                      <div class="text-body1 text-dark">
                        {{post.content}} </div>
                    </q-card-section>
                    <q-separator></q-separator>
                    <q-card-actions align="right">
                      <q-btn
                        v-if="!post.isPublic"
                        outline
                        color="primary"
                        icon-right="lock_outline"
                        label="Desbloquear"
                      />
                      <q-btn
                        flat
                        color="primary"
                        round
                        icon="favorite"
                        class="q-ml-md"
                      >
                        <q-badge
                          color="secondary"
                          floating
                        >{{post.cantLikes}}</q-badge>
                      </q-btn>
                    </q-card-actions>
                  </q-card>
                </div>
                <div v-elseif="post.id === 2">
                  <q-card class="q-mb-md q-ma-sm">
                    <q-item>
                      <q-item-section avatar>
                        <q-avatar>
                          <img v-bind:src="`http://localhost:8000/img/${allCreator.data.user[0].avatar}`">
                        </q-avatar>
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>{{allCreator.data.user[0].username}}</q-item-label>
                        <q-item-label caption>{{post.date}}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-separator></q-separator>
                    <q-card-section>
                      <div class="text-overline text-primary">Imágenes</div>
                      <div class="text-h5 q-mt-sm q-mb-xs">{{post.title}}</div>
                      <div class="text-body1 text-dark">
                        {{post.content}} </div>
                    </q-card-section>
                    <q-separator></q-separator>
                    <q-card-actions align="right">
                      <q-btn
                        v-if="!post.isPublic"
                        outline
                        color="primary"
                        icon-right="lock_outline"
                        label="Desbloquear"
                      />
                      <q-btn
                        flat
                        color="primary"
                        round
                        icon="favorite"
                        class="q-ml-md"
                      >
                        <q-badge
                          color="secondary"
                          floating
                        >{{post.cantLikes}}</q-badge>
                      </q-btn>
                    </q-card-actions>
                    <q-card-actions>
                      <q-btn
                        flat
                        color="dark"
                        label="Ver Imágenes"
                        @click="expanded = !expanded"
                      />

                      <q-space />

                      <q-btn
                        color="grey"
                        round
                        flat
                        dense
                        :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                        @click="expanded = !expanded"
                      />
                    </q-card-actions>

                    <q-slide-transition>
                      <div v-show="expanded">
                        <q-separator />
                        <q-card-section class="text-subitle2 no-padding">
                          <div
                            v-for="image in post.images"
                            :key="image.id"
                          >
                            <q-img
                              class="no-margin"
                              v-bind:src="`${image.image}`"
                              ratio="1"
                            ></q-img>
                          </div>
                        </q-card-section>
                      </div>
                    </q-slide-transition>
                  </q-card>
                </div>
                <div v-elseif="post.id === 3">
                  <q-card class="q-mb-md q-ma-sm">
                    <q-item>
                      <q-item-section avatar>
                        <q-avatar>
                          <img v-bind:src="`http://localhost:8000/img/${allCreator.data.user[0].avatar}`">
                        </q-avatar>
                      </q-item-section>

                      <q-item-section>
                        <q-item-label>{{allCreator.data.user[0].username}}</q-item-label>
                        <q-item-label caption>{{post.date}}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-separator></q-separator>
                    <q-card-section>
                      <div class="text-overline text-primary">Videos</div>
                      <div class="text-h5 q-mt-sm q-mb-xs">{{post.title}}</div>
                      <div class="text-body1 text-dark">
                        {{post.content}} </div>
                    </q-card-section>
                    <q-separator></q-separator>
                    <q-item
                      v-for="video in post.videos"
                      :key="video.id"
                    >
                      <iframe
                        v-bind:src="`http://localhost:8000/videos/${video.video}`"
                        width="100%"
                        height="360"
                        frameborder="0"
                      ></iframe>
                    </q-item>
                    <q-separator></q-separator>
                    <q-card-actions align="right">
                      <q-btn
                        v-if="!post.isPublic"
                        outline
                        color="primary"
                        icon-right="lock_outline"
                        label="Desbloquear"
                      />
                      <q-btn
                        flat
                        color="primary"
                        round
                        icon="favorite"
                        class="q-ml-md"
                      >
                        <q-badge
                          color="secondary"
                          floating
                        >{{post.cantLikes}}</q-badge>
                      </q-btn>
                    </q-card-actions>
                  </q-card>
                </div>
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
      expanded: false
    }
  },
  mounted: function () {
    this.getPostsCreator()
    this.getAllCreator()
    // Verifico si hay una sesion iniciada
    if (sessionStorage.getItem('apiToken')) {
      // tengo un token guardado localmente
      this.getUser()
    }
  },
  methods: {
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
    // En postsCreator estan todos los posts de ese creator (con imagens videos y like si es que los tiene)
    getPostsCreator: async function () {
      var idCreator = this.$route.params.idCreator
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
