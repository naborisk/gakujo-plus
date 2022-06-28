<template>
  <v-app>
    <v-app-bar color="grey-lighten-2" app></v-app-bar>

    <v-navigation-drawer color="grey-darken-2" permanent>
      
      <v-list>
        <v-list-item prepend-icon="mdi-home" href="#/">Home</v-list-item>
        <v-list-item prepend-icon="mdi-forum" href="#/test">test</v-list-item>
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
import Test from './components/Test.vue'

const routes = {
  '/': HelloWorld,
  '/test': Test
}

export default {
  name: 'App',

  components: {
    HelloWorld,
    Test,
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
