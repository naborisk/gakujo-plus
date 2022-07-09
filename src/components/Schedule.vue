<template>
  <h1>時間割</h1>
  <v-row v-for="(a, i) in schedule" :key="i">
    <v-col v-for="(s, j) in schedule[i]" :key="j">
      <v-card v-if="s.teacher">
        {{ s.name }}
        <br />
        {{ s.teacher }}
        <br />
        {{ s.classroom }}
      </v-card>
    </v-col>
  </v-row>
</template>
<script setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import axios from "axios";

const schedule = ref([]);

const fetchSchedule = () => {
  axios.get("http://localhost:3000/schedule").then((res) => {
    schedule.value = res.data;
  });
};

onMounted(() => {
  fetchSchedule();
});
</script>
