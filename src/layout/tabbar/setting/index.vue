<template>
    <el-button size="small" :icon="Refresh" circle @click="updateRefresh"></el-button>
    <el-button size="small" :icon="FullScreen" circle @click="fullScreen"></el-button>
    <el-button size="small" :icon="Setting" circle></el-button>
    <el-avatar :size="30" fit="fill" :src="userStore.avatar" style="margin: 0 10px;"></el-avatar>
    <el-dropdown style="margin-right: 20px;cursor: pointer;">
        <span class="el-dropdown-link">
            {{ userStore.username }}
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
import { FullScreen, Refresh, Setting } from '@element-plus/icons-vue';
import useLayoutSettingStore from "@/stores/modules/setting";
import useUserStore from "@/stores/modules/user";
import { useRouter,useRoute } from 'vue-router';

defineOptions({ name: "Setting" });

const layoutSettingStore = useLayoutSettingStore();
const userStore = useUserStore();
const router = useRouter();
const route=useRoute();

/**
 * 刷新
 */
function updateRefresh() {
    layoutSettingStore.refresh = !layoutSettingStore.refresh;
}

/**
 * 全屏
 */
function fullScreen() {
    // js中有个fullscreentElement可以判断是否全屏
    let full = document.fullscreenElement;

    if (!full) {
        document.documentElement.requestFullscreen();
    } else {
        //退出全屏模式
        document.exitFullscreen();
    }
}

/**
 * 退出登录
 */
async function logout() {
   await userStore.userLogout();
    ElMessage({ message: '退出成功', type: 'success', });
    setTimeout(() => {
        router.push({ name: "login" ,query:{redirect:route.path}});
    }, 1000);
    
}


</script>

<style scoped></style>