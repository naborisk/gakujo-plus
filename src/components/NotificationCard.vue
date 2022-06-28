<template>
    <v-card>
        <v-card-header>
          <v-card-header-text>
            <v-chip
                :ripple="false"
                :color="data.type == 'レポート' ? 'primary' : ''"
                size="small"
                class="my-2 mr-2"
            >{{data.type}}</v-chip>
            <v-chip
                size="small"
                v-if="data.title.includes('未読')"
                color="red"
            >未読</v-chip>
            <v-card-title>{{data.title}}</v-card-title>
            <v-card-subtitle>{{data.date}}</v-card-subtitle>
          </v-card-header-text>
        </v-card-header>
        <v-card-actions>
            <v-btn
            :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
            @click="expand"
            ></v-btn>
            <v-spacer></v-spacer>
            <v-btn
            icon="mdi-heart-outline"
            ></v-btn> 
        </v-card-actions>
        <v-expand-transition>
            <div v-show="show">
                <v-divider></v-divider>
                <v-card-text>
                    <div v-if="!contents">
                        <v-progress-linear indeterminate></v-progress-linear>
                    </div>
                    <h3 v-else>連絡内容</h3>
                    <v-table>
                        <tbody>
                            <tr
                                v-for="c in contents"
                                :key="c"
                            >
                                <td width="175px">{{c.title}}</td>
                                <td>
                                    <pre v-html="linkifyHtml(c.content, {target: '_blank'})" style="white-space:pre-line;"/>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card-text>
                
            </div>
        </v-expand-transition>
        
      </v-card>
</template>
<script setup>
import { ref } from "@vue/reactivity"
import axios from "axios"
import linkifyHtml from 'linkify-html'

const show = ref(false)

const contents = ref()

const props = defineProps({
    data: Object,
    index: Number
})

const expand = () => {
    if(!show.value) {
        show.value = true
        if(!contents.value) axios.get('http://localhost:3000/notifications', {params: {open: props.index}})
            .then(res => {contents.value = res.data})
    } else {
        show.value = false
    }
}
    

</script>