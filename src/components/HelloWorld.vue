<template>
   <h1>お知らせ</h1>
   <v-card
    v-for="n, i in notifications"
    :key="i"
    >
      <v-card-title>
        {{n.title}}
      </v-card-title>
      <v-card-subtitle>
        {{n.type + ' ' + n.date}}
      </v-card-subtitle>

   </v-card>

   <code>{{notifications}}</code>
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
