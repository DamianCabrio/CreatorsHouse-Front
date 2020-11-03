<template>
<q-page class="flex flex-center">
    <h1>Creadores x Categorias {{creatorsXCat[0]}}</h1>
    <q-list id="creadoresXCategoria">
      <q-item
        v-for="creator in creatorsXCat"
        :key="creator.id"
      >
        <q-item-section>
          <q-item-label>Creador: ---- {{creator.banner}}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
</q-page>
</template>

<script>
import * as axios from 'axios'

export default {
  name: 'FilterCategory',
  data: function () {
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
      alert(idCategory)
      axios.get('http://localhost:8000/catCreators/' + idCategory)
        .then(function (response) {
          this.creatorsXCat = response.data
          console.log(response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
