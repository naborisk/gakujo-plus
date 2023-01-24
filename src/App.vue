<template>
  <v-app :theme="theme">
    <v-app-bar color="primary" app>
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="$vuetify.display.mobile ? drawer = !drawer : rail = !rail"
      ></v-app-bar-nav-icon>
      <v-app-bar-title class="ml-4">学情プラス</v-app-bar-title>
      <v-btn variant="text" :icon="`mdi-brightness-${theme === 'dark' ? '2' : '7'}`" @click="theme = theme === 'dark' ? 'light' : 'dark'"></v-btn>
    </v-app-bar>

    <v-navigation-drawer app :rail="$vuetify.display.mobile ? false : rail" v-model="drawer">
      <v-list nav>
        <v-list-item prepend-icon="mdi-home" href="#/" title="ホーム" :active="currentPath === '#/' || currentPath === ''" />
        <v-list-item prepend-icon="mdi-heart" href="#/favorites" title="お気に入り" :active="currentPath === '#/favorites'"/>
        <v-list-item prepend-icon="mdi-calendar" href="#/schedule" title="時間割" :active="currentPath === '#/schedule'" />
        <v-list-item prepend-icon="mdi-cog" href="#/settings" title="設定" :active="currentPath === '#/settings'" />
      </v-list>
    </v-navigation-drawer>
    
    <v-main>
      <v-container fluid>
        <component :is="currentView"/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { ref } from '@vue/reactivity'
import Home from './components/Home.vue'
import Favorites from './components/Favorites.vue'
import Schedule from './components/Schedule.vue'
import Settings from './components/Settings.vue'

const rail = ref(true)
const drawer = ref()

const theme = ref('dark')

const routes = {
  '/': Home,
  '/favorites': Favorites,
  '/schedule': Schedule,
  '/settings': Settings
}

export default {
  name: 'App',

  components: {
    Home,
    Favorites,
    Schedule,
    Settings
  },

  data: () => ({
      currentPath: window.location.hash,
      drawer,
      theme
  }),
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/']
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
		  this.currentPath = window.location.hash
		})
  }
}
</script>
