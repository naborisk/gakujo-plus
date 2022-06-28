<template>
   <h1>HelloWorld</h1> 
   <p>{{notifications}}</p>
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
