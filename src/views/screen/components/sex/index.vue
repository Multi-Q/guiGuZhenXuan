<template>
    <div id="sex-container">
        <div class="title">
            <p>男女比例</p>
            <img scr="../../images/dataScreen-title.png">
        </div>
        <div class="sex">
            <div class="man">
                <img src="../../images/man.png" />
            </div>
            <div class="women">
                <img src="../../images/woman.png" />
            </div>
            
        </div>
        <div class="rate">
                <p>男士58%</p>
                <p>女士42%</p>
            </div>
    </div>
</template>

<script setup lang="ts">
defineOptions({ name: "Sex" });




</script>

<style lang="scss" scoped>
#sex-container {
    width: 100%;
    height: 100%;
    background: url("../../images/dataScreen-main-cb.png") no-repeat;
    background-size: 100% 100%;

    .title {
        margin-left: 20px;

        p {
            color: white;
            font-size: 20px;

        }
    }

    .sex {
        display: flex;
        justify-content: center;

        .man {
            width: 111px;
            height: 115px;
            margin: 20px;
            background: url("../../images/dmman-bg.png") no-repeat;
            background-size: 100% 100%;
            display:flex;
            justify-content:center;
            align-items:center;
        }

        .women {
            width: 111px;
            height: 115px;
            margin: 20px;
            background: url("../../images/dataScreen-woman-bg.png") no-repeat;
            background-size: 100% 100%;
            display:flex;
            justify-content:center;
            align-items:center;
        }
    }
}</style>