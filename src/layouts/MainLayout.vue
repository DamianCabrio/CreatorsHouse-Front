<template>
  <q-layout view="hHr LpR ffr">
    <!---------------- Inicia el encabezado -------------------------->
    <q-header
      elevated
      class="q-pt-sm q-pb-sm"
    >
      <q-toolbar>
        <router-link to="/">
          <!--Icono de CreatorHouse-->
          <img
            style="height: 40px; max-width: 150px"
            alt="Creator House logo"
            src="~assets/creator-house-icon.svg"
          >
        </router-link>
        <div class="self-strech row no-wrap">
          <!--Titulo Creator House -->
          <div class="q-pl-md">
            <q-toolbar-title>
            </q-toolbar-title>
          </div>

          <!--Categorias-->
          <q-btn-dropdown
            v-if="!isLogin"
            color="primary"
            unelevated
            label="Categorías"
            content-class="bg-grey-1"
            @click="getCategory"
          >
            <q-list>
              <q-item
                v-for='category in categories'
                :key="category.id"
                clickable
                v-close-popup
                :idCategory = "category.id"
                v-bind:to = "`/FilterCategory/${category.id}`"
              >
                <q-item-section>
                  <q-item-label>{{category.nameCategory}}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <!--Link al blog-->
          <div class="q-pa-sm desktop-only">
            <router-link
              to=""
              style="color:white;text-decoration:none"
            >Blog</router-link>
          </div>
        </div>
        <div class="q-space"></div>
        <!--Agregar Fecha Actual
        <div class="text-subtitle1 q-pl-xl desktop-only">{{todaysDate}}</div>-->
        <!--Combo de busqueda-->
        <div
          class=" column desktop-only"
          style="min-width: 400px"
        >
          <q-select
            ref="search"
            dark
            dense
            standout
            use-input
            hide-selected
            class="GL__toolbar-select"
            color="black"
            :stack-label="false"
            label="Buscá tu creador..."
            v-model="search"
            :options="filteredOptions"
            @filter="filter"
            style="width: 300px"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section>
                  <div class="text-center">
                    <q-spinner-pie
                      color="grey-5"
                      size="24px"
                    />
                  </div>
                </q-item-section>
              </q-item>
            </template>

            <template v-slot:option="scope">
              <q-item
                v-bind="scope.itemProps"
                v-on="scope.itemEvents"
                class="GL__select-GL__menu-link"
              >
                <q-item-section>
                  <q-item-label v-html="scope.opt.label" />
                </q-item-section>
                <q-item-section
                  side
                  :class="{ 'default-type': !scope.opt.type }"
                >
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <!--Boton Login y Registrarse-->
        <div class="q-pa-sm desktop-only">
          <router-link
            v-if="!islogin"
            to="/login"
            style="color:white;text-decoration:none"
          >Login</router-link>
        </div>
        <div class="q-pa-sm desktop-only">
          <q-btn
            v-if="!islogin"
            to="/register"
            unelevated
            style="color: white;background-color:black"
            label="Registrarse"
            icon="create"
          />
        </div>
        <!--Imagen de perfil y Menu Desplegable -->
        <div class="q-pa-md q-gutter-sm">
          <q-btn-dropdown
            color="primary"
            unelevated
            label="CREAR POST"
            content-class="bg-grey-1"
            v-if="islogin"
          >
            <q-list>
              <q-item
                clickable
                v-close-popup
                @click="onItemClick"
              >
                <q-item-section>
                  <q-item-label>Fotos</q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                clickable
                v-close-popup
                @click="onItemClick"
              >
                <q-item-section>
                  <q-item-label>Videos</q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                clickable
                v-close-popup
                @click="onItemClick"
              >
                <q-item-section>
                  <q-item-label>Cerrar Sesion</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-avatar
            @click="drawerRight = !drawerRight"
            style="cursor: pointer;"
            v-if="islogin"
          >
            <img src="https://www.placecage.com/gif/200/200">
          </q-avatar>
        </div>
      </q-toolbar>
    </q-header>
    <!-----------------Footer----------------------------------------->
    <q-footer class="bg-secondary">
      <div class="q-pb-md">
      <q-card flat class="q-pt-md q-pb-md" style="background-color:#202032"></q-card>
      <q-toolbar class="q-pt-md q-pb-md">
        <q-toolbar-title class="text-weight-thin text-caption">CREATOR HOUSE ©2020</q-toolbar-title>
      </q-toolbar>
      </div>
    </q-footer>
    <!--Menu lateral Perfil de usuario-->
    <q-drawer
      elevated
      content-class="bg-grey-1"
      side="right"
      v-model="drawerRight"
      show-if-above
      :width="260"
      :breakpoint="10600"
    >
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
        <q-list padding>
          <q-item
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>

            <q-item-section>
              Inicio
            </q-item-section>
          </q-item>

          <q-item
            active
            clickable
            v-ripple
            to='/User'
          >
            <q-item-section avatar>
              <q-icon name="account_circle" />
            </q-item-section>

            <q-item-section>
              Mi Perfil
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>

            <q-item-section>
              Logout
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
          >

          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="https://media1.tenor.com/images/1bf691ff3daa369719b691ace708bf13/tenor.gif?itemid=14796708"
        style="height: 114px"
      >
        <div class="absolute-bottom bg-transparent">
          <div class="text-weight-bold">@username?</div>
          <div>user@mail?</div>
        </div>
      </q-img>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>

import { date } from 'quasar'
export default {
  computed: {
    todaysDate () {
      const timeStamp = Date.now()
      return date.formatDate(timeStamp, 'dddd D MMMM')
    }
  },
  methods: {
    getCreators: async function () {
      try {
        const data = await fetch('http://localhost:8000/userCreators')
        const response = await data.json()
        // console.log(response.data)
        this.creators = response.data
        this.getUsernames()
      } catch (error) {
        console.error(error)
      }
    },
    getUsernames: function () {
      this.creators.forEach(element => {
        this.creatorName.push(element.username)
      })
      // console.log(this.creatorName)
    },
    getCategory: async function () {
      try {
        const data = await fetch('http://localhost:8000/categories')
        const response = await data.json()
        // console.log(response.data.id)
        this.categories = response.data
      } catch (error) {
        console.error(error)
      }
    },
    onItemClick () {
      console.log('Clicked on an Item')
    },
    filter (val, update) {
      if (this.options === null) {
        // load data
        setTimeout(() => {
          this.getCreators()
          this.options = this.creatorName
          this.$refs.search.filter('')
        }, 100)
        update()
        return
      }
      if (val === '') {
        update(() => {
          this.filteredOptions = this.options.map(op => ({ label: op }))
        })
        return
      }
      update(() => {
        this.filteredOptions = [
          ...this.options
            .filter(op => op.toLowerCase().includes(val.toLowerCase()))
            .map(op => ({ label: op }))
        ]
      })
    }
  },
  data () {
    return {
      categories: [],
      creators: [],
      creatorName: [],
      search: '',
      options: null,
      filteredOptions: [],
      drawerRight: false,
      islogin: false
    }
  },
  mounted () {
    // Verifico si hay una sesion iniciada
    if (sessionStorage.getItem('apiToken')) {
      this.islogin = true
      // devuelve true si está la sesión iniciada
    } else {
      this.islogin = false
    }
    this.getCreators()
    // console.log(this.creators)
  }
}
</script>
