<template>
    <div id="apu-container">
        <Category></Category>
        <el-card style="margin: 10px 0;">
            <div v-show="scene === 0">
                <el-button type="primary" size="default" icon="Plus" :disabled="categoryStore.c3Id ? false : true"
                    @click="addSpu">添加SPU</el-button>
                <el-table border :data="records" style="margin: 10px 0;">
                    <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                    <el-table-column label="SPU名称" prop="spuName"></el-table-column>
                    <el-table-column label="SPU描述" prop="description" show-overflow-tooltip></el-table-column>
                    <el-table-column label="SPU操作">
                        <template #="{ row, $index }">
                            <el-button type="primary" size="small" icon="Plus" title="添加SKU"></el-button>
                            <el-button type="warning" size="small" icon="Edit" title="修改SPU" @click="updateSpu"></el-button>
                            <el-button type="info" size="small" icon="View" title="查看SKU列表"></el-button>
                            <el-button type="danger" size="small" icon="Delete" title="删除SPU"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页器 -->
                <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 10]"
                    background layout="prev,pager,next,jumper,->,size,total" :total=total @current-change="getHasSpu"
                    @size-change="changeSize"></el-pagination>
            </div>

            <!-- 添加spu -->
            <SpuForm v-show="scene === 1" @changeScene="changeScene"></SpuForm>

            <!-- 添加sku -->
            <SkuForm v-show="scene === 2"></SkuForm>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { reqHasSpu } from "@/api/product/spu/index";
import useCategoryStore from "@/stores/modules/category";
import type { hasSpuResponseData, spuData } from "@/api/product/spu/type";
import SpuForm from "./SpuForm.vue";
import SkuForm from "./SkuForm.vue";

defineOptions({ name: "Spu" });

const categoryStore = useCategoryStore();

let pageNo = ref<number>(1);
let pageSize = ref<number>(3);
let scene = ref<number>(0); //0显示spu ，1添加或修改spu，2添加sku结构
let total = ref<number>(0);
// 存储已有的spu数据
let records = ref<spuData[]>([]);

async function getHasSpu() {
    const res: hasSpuResponseData = await reqHasSpu(pageNo.value, pageSize.value,categoryStore.c3Id);
    console.log(res);

    if (res.code === 200) {
        records.value = res.data.records;
        total.value = res.data.total;
    } else {
        Promise.reject(new Error("获取spu失败"));
    }
}

watch(() => categoryStore.c3Id, () => {
    if (!categoryStore.c3Id) return;
    getHasSpu();
});

function changeSize() {
    if (!categoryStore.c3Id) return;
    getHasSpu();
}

function addSpu() {
    scene.value = 1;
}
function changeScene(val: number) {
    scene.value = val;
}

function updateSpu(){
    scene.value=1;
}
</script>

<style scoped></style>