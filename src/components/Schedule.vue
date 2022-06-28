<template>
    <v-row v-for="i in 5" :key="i">
        <v-col v-for="j in 5" :key="j">{{i + j}}</v-col>
    </v-row>
</template>