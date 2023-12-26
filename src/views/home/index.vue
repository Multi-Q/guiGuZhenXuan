<template>
    <h1>home</h1>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
defineOptions({name:"Home"});

import useUserStore from '@/stores/modules/user';
const userStore=useUserStore();



</script>

<style scoped>

</style>