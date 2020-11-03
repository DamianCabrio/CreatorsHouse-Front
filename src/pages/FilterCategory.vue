<template>
<q-page class="flex flex-center">
    <h1>Creadores x Categorias</h1>
    <q-list id="creadoresXCategoria">
      <q-item
        v-for="creator in creatorsXCat"
        :key="creator.id"
      >
        <q-item-section>
          <q-item-label>Creador: ---- {{creator}}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
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
    }
  }
}
</script>
