<template>
    <div id="logo-container" v-if="setting.logoHidden" :title="setting.title">
        <img :src="setting.logo" :alt="setting.title">
        <p>{{ setting.title }}</p>
    </div>
</template>

<script setup lang="ts">
import setting from '@/setting';

defineOptions({ name: "Logo" });
</script>

<style scoped lang="scss">
#logo-container {
    height: $base-menu-logo-height;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px;
    img{
        width: 40px;
        height: 40px;
    }
    p{
        height: 20px;
        font-size:$base-logo-title-font-size;
        color:white;
        margin-left: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
    }
}
</style>