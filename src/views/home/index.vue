<template>
    <div id="home-container">
        <el-card>
            <div class="box">
                <img :src="userStore.avatar" alt="" class="avatar">
                <div class="welcome">
                    <h2>{{ getTime() }}好,<span>{{ userStore.username }}</span></h2>
                    <p>{{ setting.title }}</p>
                </div>
            </div>
        </el-card>
        <div class="bottom">
            <SvgIcon name="welcome" width="600px" height="300px" />
        </div>
    </div>
</template>

<script setup lang="ts">
defineOptions({ name: "Home" });
import { getTime } from '@/utils/time';
import setting from "@/setting";
import useUserStore from '@/stores/modules/user';
const userStore = useUserStore();



</script>

<style scoped lang="scss">
#home-container {
    .box {
        display: flex;

        .avatar {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            vertical-align: middle;
        }

        .welcome {
            margin-left: 20px;
            font-size: 24px;
            display: flex;
            flex-direction: column;
            justify-content: center;

            & span {
                font-weight: bolder;
            }

            & p {
                font-size: 18px;
                color: #d0cece;
                font-style: italic;
                margin-top: 10px;
            }
        }
    }

    .bottom {
        margin-top: 30px;
        text-align: center;
    }
}
</style>