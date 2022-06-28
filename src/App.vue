<template>
  <v-app>
    <v-app-bar color="grey-lighten-2" app></v-app-bar>

    <v-navigation-drawer color="grey-darken-2" permanent>
      
      <v-list>
        <v-list-item prepend-icon="mdi-home" href="#/">Home</v-list-item>
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
import Settings from './components/Settings.vue'

const routes = {
  '/': HelloWorld,
  '/settings': Settings
}

export default {
  name: 'App',

  components: {
    HelloWorld,
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
