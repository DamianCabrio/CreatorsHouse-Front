<template>
  <q-layout view="lHh Lpr lFf">
    <!---------------- Inicia el encabezado -------------------------->
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <!--Icono de CreatorHouse-->
        <img
          style="height: 40px; max-width: 150px"
          alt="Creator House logo"
          src="~assets/creator-house-another-version.png"
        >
        <!--Titulo Creator House-->
        <q-toolbar-title>
          Creator House
        </q-toolbar-title>
        <!--Combo de busqueda-->
          <div class="q-pa-md">
            <q-btn to="login" style="color: white" label="Login" />
          </div>
        <div class="q-gutter-y-md column q-pa-sm" style="max-width: 300px">
          <q-input rounded outlined v-model="text" label="Búsqueda">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <!--Imagen de perfil y Menu Desplegable
        <div class="q-pa-md q-gutter-sm">
          <q-avatar>
            <img src="https://www.placecage.com/gif/200/200">
          </q-avatar>
          <q-btn-dropdown color="primary" label="Dropdown Button" content-class="bg-grey-1">
            <q-list>
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>Photos</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>Videos</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>Articles</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
         <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>
    <!---------------- Menu Desplegable -------------------------->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
      >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
        Essential Links
        </q-item-label>
          <EssentialLink
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
      </q-list>
    </q-drawer>

    <q-page-container>
      <!--Agregar Fecha Actual-->
      <div class="text-subtitle1 q-pl-xl">{{todaysDate}}</div>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import { date } from 'quasar'

const linksData = [
  /* {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  }, */
  {
    title: 'Home',
    caption: 'Inicio CreatorHouse',
    icon: 'home',
    link: ''
  },
  {
    title: 'Ayuda',
    caption: 'Preguntas Frecuentes',
    icon: 'help',
    link: '#/help'
  },
  {
    title: 'Login',
    caption: 'Registarte - Ingresa al CreatorHouse',
    icon: 'login',
    link: '#/login'
  }
]

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  },
  computed: {
    todaysDate () {
      const timeStamp = Date.now()
      return date.formatDate(timeStamp, 'dddd D MMMM')
    }
  }
}
</script>
