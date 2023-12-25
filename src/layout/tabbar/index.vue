<template>
    <div id="tabbar-container">
        <div class="tabbar-left">
           <Breadcrumb/>
        </div>
        <div class="tabbar-right">
            <Setting/>
        </div>
    </div>
</template>

<script setup lang="ts">
import Breadcrumb from "@/layout/tabbar/breadcrumb/index.vue";
import Setting from "@/layout/tabbar/setting/index.vue";



</script>

<style scoped lang="scss">
#tabbar-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;

    .tabbar-left {
        display: flex;
        align-items: center;
        margin-left: 20px;
    }

    .tabbar-right {
        display: flex;
        align-items: center;
    }
}
</style>