<template>
  <q-layout view="lHh Lpr lFf">
    <!---------------- Inicia el encabezado -------------------------->
    <q-header elevated>
      <q-toolbar>
        <router-link to="/">

                <!--Icono de CreatorHouse-->
        <img
          style="height: 40px; max-width: 150px"
          alt="Creator House logo"
          src="~assets/creator-house-icon.svg"
        >
        </router-link>
        <!--Titulo Creator House-->
        <q-toolbar-title>
        </q-toolbar-title>
        <!--Agregar Fecha Actual
        <div class="text-subtitle1 q-pl-xl desktop-only">{{todaysDate}}</div>-->
        <!--Combo de busqueda-->
        <div class="q-gutter-y-md column q-pa-sm desktop-only" style="min-width: 400px">
          <q-input color="white"  outlined label="Encontrá a tu creador">
            <template v-slot:append>
              <q-icon color="white" name="search" />
            </template>
          </q-input>
        </div>
        <!--Boton Login-->
        <div class="q-pa-sm desktop-only">
          <router-link to="login" style="color:white;text-decoration:none">Login</router-link>
        </div>
        <div class="q-pa-sm desktop-only">
          <q-btn to="register" unelevated style="color: white;background-color:black" label="Registrarse" icon="create" />
        </div>
        <!--Imagen de perfil y Menu Desplegable -->
        <div class="q-pa-md q-gutter-sm">
          <q-btn-dropdown color="primary" unelevated label="CREAR POST" content-class="bg-grey-1">
            <q-list>
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>Fotos</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>Videos</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>Artículos</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-avatar @click="drawerRight = !drawerRight" style="cursor: pointer;">
            <img src="https://www.placecage.com/gif/200/200">
          </q-avatar>
        </div>
      </q-toolbar>
    </q-header>
    <!--Menu lateral Perfil de usuario-->
      <q-drawer
        side="right"
        v-model="drawerRight"
        show-if-above
        :width="250"
        :breakpoint="600"
        >
        <q-scroll-area style="height: calc(100% - 112px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="inbox" />
              </q-item-section>

              <q-item-section>
                Inbox
              </q-item-section>
            </q-item>

            <q-item active clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="star" />
              </q-item-section>

              <q-item-section>
                Star
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="send" />
              </q-item-section>

              <q-item-section>
                Send
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="drafts" />
              </q-item-section>

              <q-item-section>
                Drafts
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="https://media1.tenor.com/images/1bf691ff3daa369719b691ace708bf13/tenor.gif?itemid=14796708" style="height: 114px">
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
    onItemClick () {
      console.log('Clicked on an Item')
    }
  },
  data () {
    return {
      drawerRight: false
    }
  }
}
</script>
