<template>
    <v-row v-for="s, i in schedule" :key="i">
        <v-col v-for="a, j in schedule[i]" :key="j">
            {{a.name}}
            <br>
            {{a.teacher}}
            <br>
            {{a.classroom}}
        </v-col>
    </v-row>
    {{schedule}}
</template>
<script setup>
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import axios from 'axios'

const schedule = ref([])

const fetchSchedule = () => {
    axios.get('http://localhost:3000/schedule').then(res => {
        schedule.value = res.data
    })
}

onMounted(() => {
    fetchSchedule()
})

</script>