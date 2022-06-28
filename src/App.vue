<template>
  <v-app>
    <v-app-bar color="primary" app>
      <v-app-bar-title>が苦情++</v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer color="grey-darken-2" permanent mini-variant>
      <v-list>
        <v-list-item prepend-icon="mdi-home" href="#/">Home</v-list-item>
        <v-list-item prepend-icon="mdi-heart" href="#/favorites">Favorites</v-list-item>
        <v-list-item prepend-icon="mdi-calendar" href="#/schedule">Schedule</v-list-item>
        <v-list-item prepend-icon="mdi-cog" href="#/settings">Settings</v-list-item>
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
import HelloWorld from './components/HelloWorld.vue'
import Favorites from './components/Favorites.vue'
import Schedule from './components/Schedule.vue'
import Settings from './components/Settings.vue'

const routes = {
  '/': HelloWorld,
  '/favorites': Favorites,
  '/schedule': Schedule,
  '/settings': Settings
}

export default {
  name: 'App',

  components: {
    HelloWorld,
    Favorites,
    Schedule,
    Settings,
  },

  data: () => ({
      currentPath: window.location.hash
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
