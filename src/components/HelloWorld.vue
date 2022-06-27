<template>
    <v-app>
      <v-system-bar></v-system-bar>
      <v-app-bar color="primary">
        <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>
          Gakujo
        </v-app-bar-title>

        
      </v-app-bar>
      <v-navigation-drawer color="grey-darken-2" permanent></v-navigation-drawer>
      <v-main>


        {{notifications}}

      </v-main>
      <v-footer>
        
      </v-footer>
  </v-app>
</template>

<script setup>
import { ref } from "@vue/reactivity"
import axios from 'axios'


const notifications = ref([])

const fetchNotifications = () => {
  axios.get('http://localhost:3000/notifications')
    .then(res => {
      notifications.value = res.data
      console.log(res.data)
    })
}

fetchNotifications()

</script>
