<template>
    <RouterView v-slot="{ Component }">
        <transition name="fade">
            <component :is="Component" v-if="flag"></component>
        </transition>
    </RouterView>
</template>

<script setup lang="ts">
import { watch, ref, nextTick } from "vue";
import useLayoutSettingStore from "@/stores/modules/setting";

defineOptions({ name: "Main" });

const layoutSettingStore = useLayoutSettingStore();
let flag = ref<boolean>(true);
watch(() => layoutSettingStore.refresh, () => {
    flag.value = false;
    nextTick(() => {
        flag.value = true;
    });
});
</script>

<style scoped lang="scss">
.fade-enter-from {
    opacity: 0;
   
}

.fade-enter-active {
    transition: all 1s;
}

.fade-enter-to {
    opacity: 1;
   
}
</style>