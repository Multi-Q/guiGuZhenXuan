<template>
    <el-button size="small" :icon="Refresh" circle @click="updateRefresh"></el-button>
    <el-button size="small" :icon="FullScreen" circle @click="fullScreen"></el-button>
    <el-popover placement="top-start" title="主题设置" :width="300" trigger="hover">
        <el-form>
            <el-form-item label="主题颜色">
                <el-color-picker v-model="color" show-alpha :predefine="predefineColors" @change="setColor" />
            </el-form-item>
            <el-form-item label="暗黑模式">
                <el-switch v-model="dark" @change="changeDark" size="small" inline-prompt active-icon="MoonNight"
                    inactive-icon="Sunny"></el-switch>
            </el-form-item>
        </el-form>
        <template #reference>
            <el-button size="small" :icon="Setting" circle></el-button>
        </template>
    </el-popover>
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
import { useRouter, useRoute } from 'vue-router';

defineOptions({ name: "Setting" });

const layoutSettingStore = useLayoutSettingStore();
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
let dark = ref<boolean>(false);
const predefineColors = ref([
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
    'rgba(255, 69, 0, 0.68)',
    'rgb(255, 120, 0)',
    'hsv(51, 100, 98)',
    'hsva(120, 40, 94, 0.5)',
    'hsl(181, 100%, 37%)',
    'hsla(209, 100%, 56%, 0.73)',
    '#c7158577',
]);
const color = ref('rgba(255, 69, 0, 0.68)');

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
        router.push({ name: "login", query: { redirect: route.path } });
    }, 1000);

}

/**
 * 暗黑主题切换
 */
function changeDark() {
    const html = document.documentElement;
    dark.value ? html.className = "dark" : html.className = "";
}

function setColor() {
    // document.documentElement 是全局变量时
    const el = document.documentElement

    // 获取 css 变量
    getComputedStyle(el).getPropertyValue(`--el-color-primary`)

    // 设置 css 变量
    el.style.setProperty('--el-color-primary', 'red')
}

</script>

<style scoped></style>