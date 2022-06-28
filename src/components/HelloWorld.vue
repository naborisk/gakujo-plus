<template>
   <h1>お知らせ</h1>
   <v-row
      v-for="n, i in notifications"
      :key="i"
   >
    <v-col>
      <v-lazy
        transition="fade-transition"
      >
        <notification-card
          :data="n"
          :index="i"
        ></notification-card>
      </v-lazy>
      <!-- <v-card>
        <v-card-header>
          <v-card-header-text>
            <v-card-title>{{n.title}}</v-card-title>
            <v-card-subtitle>{{n.type + ' ' + n.date}}</v-card-subtitle>
          </v-card-header-text>
        </v-card-header>
            <v-card-actions>
              <v-btn
                :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="show = !show"
              ></v-btn>
            </v-card-actions>
      </v-card> -->
    </v-col>
   </v-row>

    <div v-if="!notifications">
      <v-progress-linear indeterminate></v-progress-linear>
    </div>

   <!-- <code>{{notifications}}</code> -->
</template>

<script setup>
import { ref } from "@vue/reactivity"
import { computed, onMounted } from "@vue/runtime-core"
import axios from 'axios'
import NotificationCard from "./NotificationCard.vue"

const notifications = ref()

const fetchNotifications = () => {
  axios.get('http://localhost:3000/notifications')
    .then(res => {
      notifications.value = res.data
    })
}

onMounted(() => {
  //プログレスバーを見たいからsetTimeoutを使った（あとで消そう）
  setTimeout(fetchNotifications, 1000)
})
</script>