<template>
    <el-card>
        <el-table border style="margin: 10px 0;" :data="skuArr">
            <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
            <el-table-column label="名称" show-overflow-tooltip width="150px" prop="skuName"></el-table-column>
            <el-table-column label="描述" show-overflow-tooltip prop="skuDesc"></el-table-column>
            <el-table-column label="重量" width="100px" prop="weight"></el-table-column>
            <el-table-column label="重量" width="150px">
                <template #="{ row, $index }">
                    <img :src="row.skuDefaultImg" style="width:100px;height:100px;">
                </template>
            </el-table-column>
            <el-table-column label="价格" width="100px" prop="price"></el-table-column>
            <el-table-column label="操作" fixed="right" width="250px">
                <template #="{ row, $index }">
                    <el-button type="primary" size="small" :icon="row.isSale ? 'Bottom' : 'Top'"
                        @click="updateSale(row)"></el-button>
                    <el-button type="primary" size="small" icon="Edit" @click="updateSku"></el-button>
                    <el-button type="primary" size="small" icon="infoFilled" @click="findSku(row)"></el-button>
                    <el-popconfirm title="你确定删除吗?" confirm-button-text="确定" cancel-button-text="取消" width="220px"
                        @confirm="removeSku(row.id)">
                        <template #reference>
                            <el-button type="primary" size="small" icon="Delete"></el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]" background
            :total="total" layout="prev,pager,next,jumper,->,sizes,total" @current-change="getHasSku"
            @size-change="handler"></el-pagination>

        <!-- 抽屉 -->
        <el-drawer v-model="drawer">
            <template #header>
                <h4>查看商品详情</h4>
            </template>
            <template #default>
                <el-row style="margin: 10px 0;">
                    <el-col :span="6">名称</el-col>
                    <el-col :span="18">{{ skuInfo.skuName }}</el-col>
                </el-row>
                <el-row style="margin: 10px 0;">
                    <el-col :span="6">描述</el-col>
                    <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
                </el-row>
                <el-row style="margin: 10px 0;">
                    <el-col :span="6">价格</el-col>
                    <el-col :span="18">{{ skuInfo.price }}</el-col>
                </el-row>
                <el-row style="margin: 10px 0;">
                    <el-col :span="6">平台属性</el-col>
                    <el-col :span="18">
                        <el-tag v-for="item in skuInfo.skuAttrValueList" :key="item.id" style="margin:  5px;">{{
                            item.valueName }}</el-tag>
                    </el-col>
                </el-row>
                <el-row style="margin: 10px 0;">
                    <el-col :span="6">销售属性</el-col>
                    <el-col :span="18">
                        <el-tag v-for="item in skuInfo.skuSaleAttrValueList" :key="item.id" style="margin:  5px;">{{
                            item.saleAttrValueName }}</el-tag>
                    </el-col>
                </el-row>
                <el-row style="margin: 10px 0;">
                    <el-col :span="6">商品图片</el-col>
                    <el-col :span="18">
                        <el-carousel :interval="2000" type="card" height="200px" indicator-position="none">
                            <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                                <img :src="item.imgUrl" alt="" style="width: 100%;height: 100%;">
                            </el-carousel-item>
                        </el-carousel>
                    </el-col>
                </el-row>

            </template>
        </el-drawer>
    </el-card>
</template>

<script setup lang="ts">
import { reqCancelSaleSku, reqSaleSku, reqSkuList, reqSkuInfo, reqDeleteSku } from "@/api/product/sku/index";
import type { skuResponseData, skuData, skuInfoData } from "@/api/product/sku/type";
import { ref, onMounted } from "vue";

defineOptions({ name: "Sku" });

let pageNo = ref<number>(1);
let pageSize = ref<number>(5);
let total = ref<number>(0);
let skuArr = ref<skuData[]>([]);
let drawer = ref<boolean>(false);
let skuInfo = ref<any>({});

async function getHasSku(pager: number = 1) {
    pageNo.value = pager;
    const res: skuResponseData = await reqSkuList(pageNo.value, pageSize.value);
    if (res.code === 200) {
        total.value = res.data.total;
        skuArr.value = res.data.records;
    }
}
function handler() {
    getHasSku();
}
/**
 * 更新销售状态
 * @param row 当前的条目对象
 */
async function updateSale(row: skuData) {
    if (row.isSale) {
        await reqCancelSaleSku((row.id as number));
        ElMessage.success("下架成功");
        getHasSku(pageNo.value);
    } else {
        await reqSaleSku((row.id as number));
        ElMessage.success("上架成功");
        getHasSku(pageNo.value);
    }
}
/**
 * 更新已有的sku
 */
function updateSku() {
    ElMessage.warning("程序员正在更新中");
}

async function findSku(row: skuData) {
    drawer.value = true;
    const res: skuInfoData = await reqSkuInfo((row.id as number));
    console.log(res);

    skuInfo.value = res.data;
}
async function removeSku(id: number) {
    const res: any = await reqDeleteSku(id);
    if (res.code === 200) {
        ElMessage.success("删除成功");
        getHasSku(skuArr.value.length > 1 ? pageNo.value : pageNo.value - 1);
    } else {
        ElMessage.error("系统数据，不能删除");
    }
}
onMounted(() => {
    getHasSku();
});

</script>

<style scoped>
.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>