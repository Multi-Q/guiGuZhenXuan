<template>
    <div id="top-container">
        <div class="left">
            <span class="lbtn" @click="goHome">首页</span>
        </div>
        <div class="center">
            <div class="title">智慧旅游可视化大数据平台</div>
        </div>
        <div class="right">
            <span class="rbtn">统计时间</span>
            <span class="time">当前时间：{{time}}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref,onMounted,onBeforeUnmount} from "vue";
import { useRouter } from 'vue-router';
import moment from "moment";

defineOptions({ name: "Top" });
const router=useRouter();
let time=ref(moment().format("YYYY-MM-DD:hh-mm-ss"));
let timer=ref(0);

const goHome=()=>{
    router.push("/home");
}

onMounted(()=>{
    timer.value=setInterval(()=>{
        time.value=moment().format("YYYY-MM-DD:hh-mm-ss");
    },1000);
});
onBeforeUnmount(()=>{
    clearInterval(timer.value);
});
</script>

<style scoped lang="scss">
#top-container {
    width: 100%;
    height: 40px;
    display: flex;

    .left {
        flex: 1;
        background: url("../../images/dataScreen-header-left-bg.png") no-repeat;
        background-size: cover;
        height: 1040px;
        .lbtn {
            width: 100px;
            height: 40px;
            float: right;
            background: url("../../images/dataScreen-header-btn-bg-l.png") no-repeat;
            background-size: 100% 100%;
            text-align: center;
            line-height: 40px;
            color: #29fcff;
            font-size: 20px;
            cursor: pointer;
        }
    }

    .center {
        flex: 2;

        .title {
            width: 100%;
            height: 74px;
            background: url("../../images/dataScreen-header-center-bg.png") no-repeat;
            background-size: 100% 100%;
            text-align: center;
            line-height: 74px;
            color: #29fcff;
            font-size: 30px;
        }
    }

    .right {
        flex: 1;
        background: url("../../images/dataScreen-header-left-bg.png") no-repeat;
        background-size: 100% 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .rbtn {
           float: left;
            width: 150px;
            height: 40px;
            background: url("../../images/dataScreen-header-btn-bg-r.png") no-repeat;
            background-size: 100% 100%;
            line-height: 40px;
            color: #29fcff;
            font-size: 20px;
            padding-left: 30px;
        }
        .time{
            color: #29fcff;
            margin-right: 10px;
        }
    }
}
</style>