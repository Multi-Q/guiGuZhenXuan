<template>
    <template v-for="(item, index) in menuList" :key="item.name">
        <!-- 没有子路由 -->
        <template v-if="!item.children">
            <el-menu-item :index="item.name" v-if="!item.meta.hidden" @click="goRoute">
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <template #title><span>{{ item.meta.title }}</span></template>
            </el-menu-item>
        </template>
        <!-- 有子路由且路由只有一个 -->
        <template v-if="item.children && item.children.length === 1">
            <el-menu-item v-if="!item.children[0].meta.hidden" :index="item.children[0].name" @click="goRoute">
                <el-icon>
                    <component :is="item.children[0].meta.icon"></component>
                </el-icon>
                <template #title>
                    <span>{{ item.children[0].meta.title }}</span>
                </template>
            </el-menu-item>
        </template>
        <!-- 有子路由且个数大于一个 -->
        <el-sub-menu v-if="item.children && item.children.length > 1" :index="item.name">
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <!-- 使用递归组件，该组件必须拥有一个name属性 -->
            <Menu :menuList="item.children"></Menu>
        </el-sub-menu>
    </template>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
defineOptions({ name: "Menu" });
defineProps(["menuList"]);
// const route = useRoute();
const router = useRouter();

/**
 * 路由跳转
 * @param vc 一个代理对象，获取该标签的属性值，其中index属性的值就是标签内index绑定的值
 */
function goRoute(vc:any) {
    //    去掉"/"，使用命名路由
    // const routePath: string = (vc.index as string);
    // let routerName: string = "";
    // if (routePath.lastIndexOf("/") === -1) {
    //     routerName = routePath;
    // } else {
    //     routerName = routePath.slice(routePath.lastIndexOf("/") + 1);
    // }
    // console.log(vc.index);
    
    router.push({name:vc.index});
}
</script>

<style scoped></style>