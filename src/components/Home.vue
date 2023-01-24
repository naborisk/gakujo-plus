<template>
   <h1>お知らせ</h1>
   <!-- <v-btn color="primary" @click="filter = 'レポート'">レポート</v-btn>
   <v-btn color="secondary" @click="filter = '学内連絡'">学内連絡</v-btn>
   <v-btn color="red" @click="filter = ''">クリア</v-btn> -->
    <v-btn-toggle
      v-model="filter"
      shaped
      mandatory
      color="primary"
      variant="outlined"
      divided
      class="my-4"
    >
      <v-btn value="">
        全て
      </v-btn>

      <v-btn value="レポート">
        レポート
      </v-btn>

      <v-btn value="学内連絡">
        学内連絡
      </v-btn>

      <v-btn value="小テスト">
        小テスト
      </v-btn>

      <v-btn value="授業アンケート">
        授業アンケート
      </v-btn>
    </v-btn-toggle>
    <v-text-field
      label="検索"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      v-model="search"
    ></v-text-field>
        
    <div v-if="notifications.length === 0">
      <v-progress-linear indeterminate></v-progress-linear>
    </div>

    <div
    v-for="n, i in notifications"
    :key="i"
    >
      <v-row
          v-if="(n.type === filter || filter === '') && n.title.includes(search)"
      >
        <v-col >
          <v-lazy
            transition="fade-transition"
          >
            <notification-card
              :data="n"
              :index="i"
            ></notification-card>
          </v-lazy>
        </v-col>
      </v-row>
    </div>


</template>

<script setup>
import { ref } from "@vue/reactivity"
import { computed, onMounted } from "@vue/runtime-core"
import NotificationCard from "./NotificationCard.vue"


const notifications = ref([])

const filter = ref('')

const search = ref('')

const fetchNotifications = () => {
    notifications.value = JSON.parse(sessionStorage.getItem('notifications'))
}

onMounted(() => {
  //プログレスバーを見たいからsetTimeoutを使った（あとで消そう）
//  setTimeout(fetchNotifications, 500)
  fetchNotifications()
  window.addEventListener('notifications', () => {
    fetchNotifications()
  })
})
</script>
