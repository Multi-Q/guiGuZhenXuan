<template>
    <el-form label-width="100px">
        <el-form-item label="sku名称">
            <el-input placeholder="sku名称" v-model="skuParams.skuName"></el-input>
        </el-form-item>
        <el-form-item label="价格(元)">
            <el-input placeholder="价格(元)" type="number" v-model="skuParams.price"></el-input>
        </el-form-item>
        <el-form-item label="重量(克)">
            <el-input placeholder="重量(克)" type="number" v-model="skuParams.weight"></el-input>
        </el-form-item>
        <el-form-item label="sku描述">
            <el-input placeholder="sku描述" type="textarea" v-model="skuParams.skuDesc"></el-input>
        </el-form-item>
        <el-form-item label="平台属性">
            <el-form inline>
                <el-form-item v-for="item in attrArr" :key="item.id" :label="item.attrName">
                    <el-select v-model="item.attrIdAndValueId">
                        <el-option v-for="attrValue in item.attrValueList" :key="attrValue.id" :label="attrValue.valueName"
                            :value="`${item.id}:${attrValue.id}`"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

        </el-form-item>
        <el-form-item label="销售属性">
            <el-form inline>
                <el-form-item v-for="item in saleArr" :key="item.id" :label="item.saleAttrName">
                    <el-select v-model="item.saleIdAndValueId">
                        <el-option v-for="saleAttrValue in item.spuSaleAttrValueList" :key="saleAttrValue.id"
                            :label="saleAttrValue.saleAttrValueName" :value="`${item.id}:${saleAttrValue.id}`"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

        </el-form-item>
        <el-form-item label="图片名称">
            <el-table border :data="imgArr" ref="table">
                <el-table-column type="selection" width="80px" align="center"></el-table-column>
                <el-table-column label="图片">
                    <template #="{ row, $index }">
                        <img :src="row.imgUrl" style="width:100px;height:100px" alt="">
                    </template>
                </el-table-column>
                <el-table-column label="名称" prop="imgName"></el-table-column>
                <el-table-column label="操作">
                    <template #="{ row, $index }">
                        <el-button type="primary" size="small" @click="handler(row)">设置默认</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="small" @click="save">保存</el-button>
            <el-button type="primary" size="small" @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { reqAttr } from "@/api/product/attr/index";
import { reqAddSku, reqSpuImageList, reqspuHasSaleAttr } from "@/api/product/spu/index";
import type { skuData } from "@/api/product/spu/type";
import { ref, reactive } from "vue";

defineOptions({ name: "SkuForm" });
const emit = defineEmits(["changeScene"]);

let attrArr = ref<any>([]);
let saleArr = ref<any>([]);
let imgArr = ref<any>([]);
let skuParams = reactive<skuData>({
    category3Id: "",
    spuId: "",
    tmId: "",
    skuName: "",
    price: "",
    weight: "",
    skuDesc: "",
    skuAttrValueList: [],
    skuSaleAttrValueList: [],
    skuDefaultImg: "string"
});
const table = ref<any>();

function cancel() {
    emit("changeScene", { flag: 0, params: "" });
}

async function initSkuData(c1Id: number | string, c2Id: number | string, spu: any) {
    skuParams.category3Id = spu.category3Id;
    skuParams.spuId = spu.spuId;
    skuParams.tmId = spu.tmId;
    const res = await reqAttr(c1Id, c2Id, spu.category3Id);
    const res1 = await reqspuHasSaleAttr(spu.id);
    const res2 = await reqSpuImageList(spu.id);
    attrArr.value = res.data;
    saleArr.value = res1.data;
    imgArr.value = res2.data;
}
function handler(row: any) {
    // 点击时，让所有图片复选框不选中
    imgArr.value.forEach((item: any) => table.value.toggleRowSelection(item, false));
    //    选中的图片选中
    table.value.toggleRowSelection(row, true);
    skuParams.skuDefaultImg = row.imgUrl;
}
async function save() {
    skuParams.skuAttrValueList = attrArr.value.reduce((prev: any, next: any) => {
        if (next.attrIdAndValueId) {
            const [attrId, valueId] = next.attrIdAndValueId.split(":");
            prev.push({ attrId, valueId });
        }
        return prev;
    }, []);
    skuParams.skuSaleAttrValueList = saleArr.value.reduce((prev: any, next: any) => {
        if (next.saleIdAndValueId) {
            const [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(":");
            prev.push({ saleAttrId, saleAttrValueId });
        }
        return prev;
    }, []);

    const res: any = await reqAddSku(skuParams);
    if (res.code === 200) {
        ElMessage.success("添加SPU成功");
        emit("changeScene", { flag: 0, params: "" });
    } else {
        ElMessage.error("添加SPU失败");
    }
}

defineExpose({ initSkuData });
</script>

<style scoped></style>