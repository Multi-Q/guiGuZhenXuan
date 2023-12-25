<template>
    <div id="layout-container">
        <!-- 左侧菜单 -->
        <div class="layout-slider" :class="{ fold: layoutSettingStore.fold }">
            <Logo />
            <!-- 展示菜单 -->
            <el-scrollbar class="scrollbar">
                <el-menu  :collapse="layoutSettingStore.fold" background-color="#001529" text-color="white"
                    :default-active="route.path">
                    <!-- 根据路由动态生成菜单 -->
                    <Menu :menuList="userStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>

        <!-- 顶部导航 -->
        <div class="layout-tabbar" :class="{ fold: layoutSettingStore.fold }">
            <Tabbar />
        </div>

        <!-- 内容展示区 -->
        <div class="layout-main" :class="{ fold: layoutSettingStore.fold }">
            <Main></Main>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Logo from "./logo/index.vue";
import Menu from "@/layout/menu/index.vue";
import Main from "@/layout/main/index.vue";
import Tabbar from "@/layout/tabbar/index.vue";
import { useRoute } from "vue-router";
import useUserStore from "@/stores/modules/user";
import useLayoutSettingStore from "@/stores/modules/setting";

defineOptions({ name: "Layout" });
const route = useRoute();
const userStore = useUserStore();
const layoutSettingStore = useLayoutSettingStore();

onMounted(()=>{console.log(route);
})

</script>

<style scoped lang="scss">
#layout-container {
    width: 100%;
    height: 100vh;

    .layout-slider {
        width: $base-menu-width;
        height: 100vh;
        background-color: $base-menu-background;
        transition: all 0.3s;

        .scrollbar {
            width: 100%;
            height: calc(100vh - $base-menu-logo-height);

            .el-menu {
                border-right: 0;
            }

        }

        &.fold {
            width: $base-menu-min-width;
        }
    }




    .layout-tabbar {
        position: fixed;
        top: 0;
        left: $base-menu-width;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        transition: all 0.3s;

        &.fold {
            width: calc(100vw - $base-menu-min-width);
            left: $base-menu-min-width;
        }
    }

    .layout-main {
        position: absolute;
        left: $base-menu-width;
        top: $base-tabbar-height;
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-tabbar-height);
        padding: 20px;
        overflow: auto;
        background-color: green;
        transition: all 0.3s;

        &.fold {
            width: calc(100vw - $base-menu-min-width);
            left: $base-menu-min-width;
        }
    }
}
</style>