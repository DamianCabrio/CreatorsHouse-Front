<template>
  <q-page class="">
    <div class="container">
      <div class="row justify-center">
        <div class="col-12 col-md-10 q-pt-lg q-pb-lg">
          <div class="row justify-center">
            <div class="col-12 col-md-6">
              <q-btn
                class="q-ma-sm q-mb-lg"
                color="primary"
                icon-right="arrow_back"
                label="Volver atrás"
                outline
                v-bind:to="`/creator/${$route.params.idCreator}`"
              />
              <div v-if="post === null">
                <q-card class="q-mb-md q-mb-xl q-ma-sm">
                  <h3>Oh Oh, este post no existe</h3>
                </q-card>
              </div>
              <div v-else>
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
                          v-bind:src="`http://localhost:8000/${image.image}`"
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
                  <!--                   <q-card-actions align="right">
                                      <q-btn
                                        v-if="!post.isPublic && post.isPrivate"
                                        color="primary"
                                        disable
                                        icon-right="lock_outline"
                                        label="Suscríbase para desbloquear"
                                        outline
                                      />
                                      <div v-if="post.isPublic || !post.isPrivate">
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
                                          disable
                                          round
                                          @click="unlikePost(post.id,i)"
                                        >
                                          <q-badge
                                            color="primary"
                                            floating
                                          >
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
                                            floating
                                          >
                                            {{ post.cantLikes }}
                                          </q-badge>
                                        </q-btn>
                                      </div>
                                    </q-card-actions> -->
                </q-card>
                <div v-if="post.isPublic && !post.isPrivate">
                  <div v-if="isLogin">
                    <template>
                      <div class="q-pa-md">
                        <q-input
                          v-model="text"
                          autogrow
                          bg-color="indigo-1"
                          label="Deje su comentario"
                          outlined
                        >
                          <template v-slot:after>
                            <q-btn
                              dense
                              flat
                              icon="send"
                              round
                              @click="sendComment"
                            />
                          </template>
                        </q-input>
                      </div>
                    </template>
                  </div>
                  <div v-if="post.comments.length !== 0 || post.comments === null">
                    <q-card
                      v-for="comment in comments"
                      v-bind:key="comment.id"
                      class="q-mb-md q-mb-xl q-ma-sm"
                    >
                      <q-item class="bg-dark text-white">
                        <q-item-section avatar>
                          <q-avatar>
                            <img v-bind:src="`http://localhost:8000/${comment.user.avatar}`">
                          </q-avatar>
                        </q-item-section>

                        <q-item-section>
                          <q-item-label>{{ comment.user.username }}</q-item-label>
                          <q-item-label caption class="text-white">{{ comment.created_at }}</q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-separator></q-separator>
                      <q-section>
                        <q-item>{{ comment.text }}</q-item>
                      </q-section>
                    </q-card>
                    <q-separator></q-separator>
                  </div>
                  <div v-else>
                    <h3 class="text-h4 text-weight-light text-center text-primary">Sé el primero en comentar</h3>
                  </div>
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
  name: 'CreatorPost',
  data () {
    return {
      post: [],
      allCreator: [],
      user: [],
      isCreator: false,
      isLogin: false,
      text: '',
      comments: []
    }
  },
  mounted: function () {
    if (sessionStorage.getItem('apiToken')) {
      this.isLogin = true
      // devuelve true si está la sesión iniciada
    } else {
      this.isLogin = false
    }
    // Get post
    this.getAllCreator()
    this.getUser()
    this.getPost()
  },
  methods: {
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
          console.log(response.data)
        })
        .catch(err => {
          console.log(err.response)
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
          console.log(response.data)
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    getPost () {
      var idCreator = this.$route.params.idCreator
      var idPost = this.$route.params.idPost
      if (this.isLogin) {
        axios.defaults.headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + sessionStorage.getItem('apiToken')
        }
      }
      // alert(idCreator)
      axios.get('http://localhost:8000/creators/' + idCreator + '/post/' + idPost)
        .then((response) => {
          this.post = response.data
          this.comments = this.post.comments
        })
        .catch((error) => {
          this.$q.notify({
            type: 'negative',
            message: 'Ocurrió un error al obtener los posts del creador, vuelva a intentar'
          })
          console.log(error)
        })
    },
    sendComment () {
      axios.defaults.headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('apiToken')
      }
      axios.post('http://localhost:8000/api/user/' + this.user.data.id + '/post/' + this.$route.params.idPost + '/comment', {
        text: this.text
      })
        .then((response) => {
          location.reload()
          this.comments.unshift(response.data)
          this.text = ''
        })
        .catch((error) => {
          this.$q.notify({
            type: 'negative',
            message: 'Ocurrió un error al obtener los posts del creador, vuelva a intentar'
          })
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
          this.$q.notify({
            type: 'negative',
            message: 'Ocurrió un error al obtener los datos del creador, vuelva a intentar'
          })
          console.log(error)
        })
    },
    getUser () {
      if (this.isLogin) {
        axios.defaults.headers = {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + sessionStorage.getItem('apiToken')
        }
        axios.get('http://localhost:8000/api/users/me', {
          token: sessionStorage.getItem('apiToken')
        })
          .then((response) => {
            this.user = response.data
            console.log(this.user)
          })
          .catch(err => {
            this.$q.notify({
              type: 'negative',
              message: 'Ocurrió un error al obtener datos del usuario, vuelva a intentar'
            })
            console.log(err)
          })
      }
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
