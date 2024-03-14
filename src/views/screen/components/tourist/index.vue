<template>
    <div id="tourist-container">
        <div class="top">
            <p class="title">实时游客统计</p>
            <p class="bg"></p>
            <p class="right">可预约量<span>9999</span>人</p>
        </div>
        <div class="number">
            <span v-for="item in people" :key="index">{{ item }}</span>
        </div>
        <div class="charts" ref="charts">

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts"; 
import "echarts-liquidfill";
defineOptions({ name: "Tourist" });
let people = ref("215908");

let charts = ref();
onMounted(() => {
    let myCharts = echarts.init(charts.value);
    myCharts.setOption({
       series:{
        type:"pie",
        data:[0.6,0.4],
        waveAnimation:true,
        animationDuration:3,
        animationDurationUpdate:0,
        radius:"100%",
        outline:{
            show:true,
            color:"red",

        }
       }
    })
});
</script>

<style lang="scss" scoped>
#tourist-container {
    background: url("../../images/dataScreen-main-lb.png") no-repeat;
    background-size: 100% 100%;
    margin-top: 10px;

    .top {
        margin-left: 20px;

        .title {
            color: white;
            font-size: 20px;

        }

        .bg {
            width: 68px;
            height: 7px;
            background: url("../../images/dataScreen-title.png") no-repeat;
            background-size: 100% 100%;
        }

        .right {
            float: right;
            color: white;
            font-size: 20px;

            span {
                color: yellowgreen;
            }
        }
    }

    .number {
        padding: 10px;
        margin-top: 30px;
        display: flex;
        color: white;

        span {
            flex: 1;
            height: 40px;
            text-align: center;
            background: url("../../images/total.png") no-repeat;
            background-size: 100% 100%;
            line-height: 40px;
        }
    }

    .charts {
        width: 100%;
        height: 250px;
    }
}
</style>