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
                            <el-button type="primary" size="small" icon="Plus" title="添加SKU"
                                @click="addSku(row)"></el-button>
                            <el-button type="warning" size="small" icon="Edit" title="修改SPU"
                                @click="updateSpu(row)"></el-button>
                            <el-button type="info" size="small" icon="View" title="查看SKU列表"
                                @click="findSku(row)"></el-button>
                           <el-popconfirm>
                            <template #reference title="你确定要删除这条spu吗？" width="250px" @confim="deleteSpu(row.id)">
                                <el-button type="danger" size="small" icon="Delete" title="删除SPU"></el-button>
                            </template>
                           </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页器 -->
                <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 10]"
                    background layout="prev,pager,next,jumper,->,size,total" :total=total @current-change="getHasSpu"
                    @size-change="changeSize"></el-pagination>
            </div>

            <!-- 添加spu -->
            <SpuForm v-show="scene === 1" ref="spu" @changeScene="changeScene"></SpuForm>

            <!-- 添加sku -->
            <SkuForm v-show="scene === 2" ref="sku" @changeScene="changeScene"></SkuForm>

            <!-- 展示已有sku数据 -->
            <el-dialog title="sku展示" v-model="show">
                <el-table border :data="skuArr">
                    <el-table-column label="sku名字" prop="skuName"></el-table-column>
                    <el-table-column label="sku价格" prop="price"></el-table-column>
                    <el-table-column label="sku重量" prop="weight"></el-table-column>
                    <el-table-column label="sku图片" >
                        <template #="{row,$index}">
                            <img :src="row.skuDefaultImg" style="width: 100px;height:100px;">
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref ,onBeforeUnmount} from "vue";
import { reqHasSpu, reqRemoveSku, reqSkuList } from "@/api/product/spu/index";
import useCategoryStore from "@/stores/modules/category";
import type { skuData, hasSpuResponseData, skuInfoData, spuData } from "@/api/product/spu/type";
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
const spu = ref<any>();
const sku = ref<any>();
let skuArr = ref<skuData[]>([]);
let show=ref<boolean>(false);

async function getHasSpu(page?: number) {
    const res: hasSpuResponseData = await reqHasSpu(page ? page : pageNo.value, pageSize.value, categoryStore.c3Id);
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
    spu.value.initAddSpu(categoryStore.c3Id);
}
function changeScene(obj: any) {
    scene.value = (obj.flag as number);
    if (obj.params === "update") {
        getHasSpu(pageNo.value);
    } else {
        getHasSpu();
    }
}

function updateSpu(row: spuData) {
    scene.value = 1;
    //调用子组件实例方法获取完整已有的spu数据
    spu.value.initHasSpuData(row);
}

function addSku(row: spuData) {
    scene.value = 2;
    sku.value.initSkuData(categoryStore.c1Id, categoryStore.c2Id, row);
}

async function findSku(row: spuData) {
    const res: skuInfoData = await reqSkuList((row.id as number));
    if (res.code === 200) {
        skuArr.value = res.data;
        show.value=true;
    }
}

async function deleteSpu(spuId:number|string){
    const res=await reqRemoveSku(spuId);
    if(res.code===200){
        ElMessage.success("删除成功");
        getHasSpu(records.value.length>1?pageNo.value:pageNo.value-1);
    }else{
        ElMessage.error("删除失败");
        
    }
}

onBeforeUnmount(()=>{
    categoryStore.$reset();
});
</script>

<style scoped></style>