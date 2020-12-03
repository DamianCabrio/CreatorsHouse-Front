<template>
  <q-page>
    <div
      class="bg-primary q-pa-xl flex flex-center"
      style="min-height:35vh;margin-top:-5px"
    >
      <div class="text-h3 text-center text-white q-pa-xl text-weight-light">
        {{ creatorsXCat.nameCategory[0].nameCategory }}
        <div class="text-uppercase text-overline">Categoría</div>
      </div>
    </div>
    <div class="container">
      <div class="row justify-center q-pt-xl q-pb-xl">
        <div class="col-12 col-md-8">
          <div class="row flex flex-center q-pt-xl q-pb-xl">
            <div
              v-for="creator in creatorsXCat"
              :key="creator.id"
              class="col-12 col-md-4"
            >
              <div
                v-for="user in creator.User"
                :key="user.id"
              >
                <div class="q-pa-lg">
                  <q-card
                    bordered
                    flat
                  >
                    <div
                      v-ripple
                      class="cursor-pointer relative-position"
                      @click="goHomeCreator(creator.id)"
                    >
                      <q-item>
                        <q-item-section avatar>
                          <q-btn
                            color="secondary"
                            flat
                            icon="share"
                            round
                          />
                        </q-item-section>

                        <q-item-section>
                          <q-item-label>@{{ user.username }}</q-item-label>
                          <q-item-label caption>{{ user.name }}</q-item-label>
                        </q-item-section>
                      </q-item>

                      <q-img
                        :ratio="1.8/1"
                        v-bind:src="`http://localhost:8000/${user.avatar}`"
                      >
                      </q-img>
                    </div>
                  </q-card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--     <div>
      <pre> {{ creatorsXCat }}</pre>
    </div> -->
  </q-page>
</template>

<script>
import * as axios from 'axios'

export default {
  name: 'FilterCategory',
  data () {
    return {
      creatorsXCat: []
    }
  },
  mounted: function () {
    this.getCreators_Categoria()
  },
  /*  updated: function () {
    this.getCreators_Categoria()
  }, */
  methods: {
    getCreators_Categoria: async function () {
      var idCategory = this.$route.params.idCategory
      // alert(idCategory)
      axios.get('http://localhost:8000//catCreators/' + idCategory)
        .then((response) => {
          this.creatorsXCat = response.data
          // console.log(this.creatorsXCat)
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
    goHomeCreator ($idCreator) {
      // this.$q.notify('Ir a Creator Home!')
      // alert($idCreator)
      // this.$router.push({ name: 'Creator', params: { $idCreator } })
      this.$router.push(this.$route.query.redirect || '/Creator/' + $idCreator)
    }
  }
}
</script>
