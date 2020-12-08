<template>
  <q-layout view="hHr LpR ffr">
    <!---------------- Inicia el encabezado -------------------------->
    <q-header
      class="q-pt-sm q-pb-sm"
      elevated
    >
      <q-toolbar>
        <router-link to="/">
          <!--Icono de CreatorHouse-->
          <img
            alt="Creator House logo"
            src="~assets/creator-house-icon.svg"
            style="height: 40px; max-width: 150px"
          />
        </router-link>
        <div class="self-strech row no-wrap">
          <!--Titulo Creator House -->
          <div class="q-pl-md">
            <q-toolbar-title></q-toolbar-title>
          </div>

          <!--Categorias-->
          <q-btn-dropdown
            v-if="!isLogin"
            color="primary"
            content-class="bg-grey-1"
            label="Categorías"
            unelevated
            @click="getCategory"
          >
            <q-list>
              <q-item
                v-for="category in categories"
                :key="category.id"
                v-close-popup
                :idCategory="category.id"
                clickable
                v-bind:to="`/FilterCategory/${category.id}`"
              >
                <q-item-section>
                  <q-item-label>{{ category.nameCategory }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <!--Link al blog-->
          <div class="q-pa-sm desktop-only">
            <a
              href="https://creatorhouse.media"
              style="color:white;text-decoration:none"
              target="_blank"
            >Blog</a>
            <router-link
              href="https://creatorhouse.media"
              style="color:white;text-decoration:none"
              target="_blank"
            >Blog
            </router-link>
          </div>
        </div>
        <div class="q-space"></div>
        <!--Agregar Fecha Actual
        <div class="text-subtitle1 q-pl-xl desktop-only">{{todaysDate}}</div>-->
        <!--Combo de busqueda-->
        <div
          class="desktop-only"
          style="min-width: 300px"
        >
          <q-select
            ref="search"
            v-model="search"
            :options="filteredOptions"
            :stack-label="false"
            class=""
            color="black"
            dark
            dense
            hide-selected
            label="Buscá tu creador..."
            standout
            style="width: 300px"
            use-input
            @filter="filter"
            @input="goCreator(search['label'])"
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
                  <q-item-label v-html="scope.opt.label"/>
                </q-item-section>
                <q-item-section
                  :class="{ 'default-type': !scope.opt.type }"
                  side
                >
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <!--Boton Login y Registrarse-->
        <div class="q-pa-sm q-ml-md q-mr-md desktop-only">
          <router-link
            v-if="!islogin"
            style="color:white;text-decoration:none"
            to="/login"
          >Login
          </router-link>
        </div>
        <div class="q-pa-sm desktop-only">
          <q-btn
            v-if="!islogin"
            icon="create"
            label="Registrarse"
            style="color: white;background-color:black"
            to="/register"
            unelevated
          />
        </div>
        <!--Imagen de perfil y Menu Desplegable -->
        <div class="q-pa-md q-gutter-sm">
          <q-avatar
            v-if="islogin"
            style="cursor: pointer;"
          >
            <q-icon
              name="account_circle"
              size="30px"
            />
            <q-menu>
              <q-list
                padding
                style="min-width: 250px"
              >
                <q-item
                  v-ripple
                  clickable
                  to="/home"
                >
                  <q-item-section avatar>
                    <q-icon name="home"/>
                  </q-item-section>

                  <q-item-section>
                    Inicio
                  </q-item-section>
                </q-item>

                <q-item
                  v-ripple
                  clickable
                  to="/EditUser"
                >
                  <q-item-section avatar>
                    <q-icon name="account_circle"/>
                  </q-item-section>

                  <q-item-section>
                    Mi Perfil
                  </q-item-section>
                </q-item>
                <q-item
                  v-ripple
                  clickable
                  @click="logout"
                >
                  <q-item-section avatar>
                    <q-icon name="logout"/>
                  </q-item-section>

                  <q-item-section>
                    Logout
                  </q-item-section>
                </q-item>
                <q-separator/>
                <q-item
                  v-close-popup
                  clickable
                  to="/help"
                >
                  <q-item-section avatar>
                    <q-icon name="help_outline"/>
                  </q-item-section>
                  <q-item-section>
                    Ayuda y Feedback
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-avatar>
        </div>
      </q-toolbar>
    </q-header>
    <!-----------------Footer----------------------------------------->
    <q-footer class="bg-secondary">
      <div class="container q-pb-md">
        <div class="row justify-center q-pt-md q-pb-md text-dark bg-blue-grey-1">
          <div class="col-12 col-md-8 q-pa-xl">
            <div class="row">
              <div class="col-12 col-md-3">
                <img
                  alt="Creator House logo"
                  src="~assets/creator-house.png"
                  style="width: 100%"
                />
              </div>
              <div class="col-12 col-md-1">
              </div>
              <div class="col-12 col-md-4">
                <div class="text-h6 text-weight-light q-pb-md">Contacto</div>
                <div class="text-body2 text-weight-light">Tel : +64 21 087 97516</div>
                <div class="text-body2 text-weight-light q-pt-md">info@creatorhouse.media</div>
                <div class="text-body2 text-weight-light q-pt-md">Kita-Kokubun Station, Ichikawa, Chiba, Japón,</div>
              </div>
              <div class="col-12 col-md-4">
                <div class="text-h6 text-weight-light q-pb-md">Media</div>
                <div class="text-body2 text-weight-light"><a
                  class="text-primary"
                  href="https://creatorhouse.media"
                  style="text-decoration:none"
                >Blog Creator House</a></div>
                <div class="text-body2 text-weight-light q-pt-md">Instagram</div>
              </div>
            </div>
          </div>
        </div>
        <q-toolbar class="q-pt-md q-pb-md">
          <q-toolbar-title class=" text-overline text-center q-pt-sm">CREATOR HOUSE ©2020 - Made With
            &#10084; from {{ location }}
          </q-toolbar-title>
        </q-toolbar>
      </div>
    </q-footer>
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>

import { date } from 'quasar'
import * as axios from 'axios'

export default {
  computed: {
    todaysDate () {
      const timeStamp = Date.now()
      return date.formatDate(timeStamp, 'dddd D MMMM')
    }
  },
  methods: {
    getLocation () {
      axios.get('http://localhost:8000/getCity/' + this.ipLaura, {})
        .then((response) => {
          console.log(response.data)
          this.location = response.data
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    logout: async function () {
      sessionStorage.removeItem('apiToken')
      this.user = []
      this.$router.push(this.$route.query.redirect || '/')
    },
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
    goCreator ($username) {
      // this.$q.notify('elegi un creator!')
      // alert($username)
      // Buscar el id correspondiente en el array creators
      var $id = ''
      this.creators.forEach(element => {
        // this.creatorName.push(element.username)
        if (element.username === $username) {
          $id = element.idCreator[0].id
        }
      })
      // alert($id)
      if ($id === '') {
        // nada
      } else {
        this.$router.push(this.$route.query.redirect || '/Creator/' + $id)
      }
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
  name: 'MainLayout',
  data () {
    return {
      categories: [],
      creators: [],
      creatorName: [],
      search: '',
      options: null,
      filteredOptions: [],
      drawerRight: false,
      islogin: false,
      ipLaura: '152169111047',
      ipDamian: '181031.164.171',
      ipNorbert: '181031.164.171',
      location: ''
    }
  },
  created () {
    this.getLocation()
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
