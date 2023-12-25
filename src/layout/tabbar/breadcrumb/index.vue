<template>
    <el-icon style="margin-right: 10px;" @click="changeIcon">
        <component :is="layoutSettingStore.fold?'Fold':'Expand'"></component>
    </el-icon>
    <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="(item, index) in route.matched" :key="index" v-show="item.meta.title" :to="item.path">
            <el-icon style="margin:0 5px;vertical-align:middle;">
                <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{ item.meta.title }}</span>

        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import useLayoutSettingStore from "@/stores/modules/setting";

defineOptions({ name: "Breadcrumb" });

const route = useRoute();
const layoutSettingStore = useLayoutSettingStore();


function changeIcon() {
    layoutSettingStore.fold = !layoutSettingStore.fold;
}


</script>

<style scoped></style>