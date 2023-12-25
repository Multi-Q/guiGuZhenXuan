<template>
    <el-button size="small" :icon="Refresh" circle @click="updateRefresh"></el-button>
    <el-button size="small" :icon="FullScreen" circle @click="fullScreen"></el-button>
    <el-button size="small" :icon="Setting" circle></el-button>
    <el-avatar :size="30" fit="fill" src="../../../public/logo.png" style="margin: 0 10px;"></el-avatar>
    <el-dropdown>
        <span class="el-dropdown-link">
            admin
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
import { FullScreen, Refresh, Setting } from '@element-plus/icons-vue';
import useLayoutSettingStore from "@/stores/modules/setting";

defineOptions({ name: "Setting" });

const layoutSettingStore=useLayoutSettingStore();

function updateRefresh(){
    layoutSettingStore.refresh=!layoutSettingStore.refresh;
}

 function fullScreen(){
    // js中有个fullscreentElement可以判断是否全屏
    let full=document.fullscreenElement;
    
    if(!full){
         document.documentElement.requestFullscreen();
    }else{
        //退出全屏模式
         document.exitFullscreen();
    }
}
</script>

<style scoped></style>