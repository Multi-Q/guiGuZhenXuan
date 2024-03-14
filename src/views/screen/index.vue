<template>
    <div id="screen-container">
        <div class="screen" ref="screen">
            <div class="top">
                <Top></Top>
            </div>
            <div class="bottom">
                <div class="left">
                    <Tourist class="tourist"></Tourist>
                    <Sex class="sex"></Sex>
                    <Age class="age"></Age>
                </div>
                <div class="center"></div>
                <div class="right"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Top from "@/views/screen/components/top/index.vue";
import Tourist from "@/views/screen/components/tourist/index.vue";
import Sex from "@/views/screen/components/sex/index.vue";
import Age from "@/views/screen/components/age/index.vue";

defineOptions({ name: "Screen" });

let screen = ref<any>();


function getScale(w: number = 1920, h: number = 1080) {
    const ww = window.innerWidth / w;
    const wh = window.innerHeight / h;
    return ww < wh ? ww : wh;
}
window.onresize = () => { screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`; }
onMounted(() => { screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`; });
</script>

<style scoped lang="scss">
#screen-container {
    width: 100vw;
    height: 100vh;
    background: url("./images/bg.png") no-repeat;
    background-size: cover;

    .screen {
        position: fixed;
        width: 1920px;
        height: 1080px;
        left: 50%;
        top: 50%;
        transform-origin: top left;

        .top {
            width: 100%;
            height: 40px;
        }

        .bottom {
            display: flex;

            .right {
                flex: 1
            }

            .left {
                flex: 1;
                display: flex;
                flex-direction: column;
                .tourist {
                    flex: 1.2;
                }

                .sex {
                    flex: 1;
                    margin-top: 20px;
                }

                .age {
                    flex: 1;
                }
            }

            .center {
                flex: 2;
            }
        }
    }
}</style>