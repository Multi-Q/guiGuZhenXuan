<template>
    <el-form border label-width="100px">
        <el-form-item label="spu名称">
            <el-input placeholder="请你输入spu名称" v-model="spuParams.spuName"></el-input>
        </el-form-item>
        <el-form-item label="spu品牌">
            <el-select v-model="spuParams.tmId">
                <el-option v-for="item in allTrademarks" :key="item.id" :label="item.tmName" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="spu描述">
            <el-input type="textarea" placeholder="请你输入spu描述" v-model="spuParams.description"></el-input>
        </el-form-item>
        <el-form-item label="spu图片">
            <el-upload v-model:file-list="(imgList as any)" action="/api/admin/product/fileUpload" list-type="picture-card"
                :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :before-upload="handleUpload">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>
            <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="预览图片" style="width: 100%;" />
            </el-dialog>
        </el-form-item>
        <el-form-item label="spu销售属性">
            <el-select v-model="saleAttrIdAndValueName"
                :placeholder="unSelectSaleAttr.length > 0 ? `你还有${unSelectSaleAttr.length}个未选择` : `无`">
                <el-option v-for="item in unSelectSaleAttr" :key="item.id" :label="item.name"
                    :value="`${item.id}:${item.name}`"></el-option>
            </el-select>
            <el-button @click="addSaleAttr" type="primary" icon="Plus" style="margin-left: 10px;">添加属性</el-button>
            <el-table border :data="saleAttrs" style="margin: 10px 0;">
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="销售属性名字" width="120px" prop="saleAttrName"></el-table-column>
                <el-table-column label="销售属性值">
                    <!-- row即为当前spu已有的销售属性对象 -->
                    <template #="{ row, $index }">
                        <el-tag @close="row.spuSaleAttrValueList.splice($index, 1)" v-for="item in row.spuSaleAttrValueList"
                            :key="item.id" class="mx-1" closable style="margin-right: 5px;">{{ item.saleAttrValueName
                            }}</el-tag>
                        <el-input v-if="row.flag" @blur="toLook(row)" v-model="row.saleAttrValue" placeholder="请输入属性值"
                            style="width:100px;"></el-input>
                        <el-button v-else @click="toEdit(row)" type="success" icon="Plus" style="height: 24px;"></el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120px">
                    <template #="{ row, $index }">
                        <el-button type="danger" icon="Delete" size="small"
                            @click="saleAttrs.splice($index, 1)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="save">保存</el-button>
            <el-button type="primary" @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { saleAttrValue, hasSaleAttr, saleAttr, spuImg, trademark, spuData, hasSaleAttrResponseData, saleAttrResponseData, spuHasImg, allTrademark } from '@/api/product/spu/type';
import { reqAllTrademark, reqSpuImageList, reqspuHasSaleAttr, reqAllSaleAttr, reqSaveOrUpdateSpu } from "@/api/product/spu/index";
import type { UploadProps } from "element-plus";

defineOptions({ name: "SpuForm" });
const emit = defineEmits(["changeScene"]);

let allTrademarks = ref<trademark[]>([]);
let imgList = ref<spuImg[]>([]);
let saleAttrs = ref<saleAttr[]>([]);
let allSaleAttrs = ref<hasSaleAttr[]>([]);
// 存储已有的spu类型
let spuParams = ref<spuData>({
    category3Id: "",
    spuName: "",
    description: "",
    tmId: "",
    spuSaleAttrList: [],
    spuImageList: []
});
let dialogVisible = ref<boolean>(false);
// 存储预览图片的地址
let dialogImageUrl = ref<string>("");
let saleAttrIdAndValueName = ref<string>("");


function cancel() {
    emit("changeScene", {flag:0,params:""});
}

/**
 * 初始化spu数据
 * @param spu spu基础属性对象，该变量从父亲那边传过来的
 */
async function initHasSpuData(spu: spuData) {
    spuParams.value = spu;
    // 获取全部品牌的数据
    const res: allTrademark = await reqAllTrademark();
    // 获取某一个品牌其下全部售卖商品的图片
    const res1: spuHasImg = await reqSpuImageList((spu.id as number));
    // 获取已有的spu销售属性的数据
    const res2: saleAttrResponseData = await reqspuHasSaleAttr((spu.id as number));
    // 获取整个spu的销售属性
    const res3: hasSaleAttrResponseData = await reqAllSaleAttr();
    allTrademarks.value = res.data;
    imgList.value = res1.data.map(item => {
        return {
            name: item.imgName,
            url: item.imgUrl
        }
    });
    saleAttrs.value = res2.data;
    allSaleAttrs.value = res3.data;

}

/**
 * 删除图片
 * @param uploadFile 被删除的图片对象
 * @param uploadFiles 该spu的图片列表
 */
function handleRemove(uploadFile: any, uploadFiles: any) {
    console.log(uploadFile, uploadFiles)

}

/**
 * 预览图片
 * @param file 要预览的图片对象
 */
function handlePictureCardPreview(file: any) {
    dialogImageUrl.value = file.url;
    dialogVisible.value = true;
}
/**
 * 上传图片对图片进行校验
 * @param file 上传的图片
 */
function handleUpload(file: any) {
    console.log(file)
    if (file.type === "image/png" || file.type === "image/jpg" || file.type === "image/jpeg" || file.type === "image/gif") {
        if (file.size / 1024 / 1024 < 3) {
            return true;
        } else {
            ElMessage.error("上传文件大小必须小于3M");
            return false;
        }
    } else {
        ElMessage.error("上传文件必须为.png/.jpg/.gif");
        return false;
    }
}
/**
 * 计算未选择的销售属性，展示到下拉列表中
 */
const unSelectSaleAttr = computed(() => {
    return allSaleAttrs.value.filter(item => {
        return saleAttrs.value.every(item1 => {
            return item.name !== item1.saleAttrName;
        });
    });
});
/**
 * 添加销售属性
 */
function addSaleAttr() {
    if (!saleAttrIdAndValueName.value) return;
    const [saleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(":");
    let newSaleAttr: saleAttr = {
        baseSaleAttrId: Number(saleAttrId),
        saleAttrName,
        spuSaleAttrValueList: []
    }
    // 追加到数组当中
    saleAttrs.value.push(newSaleAttr);
    saleAttrIdAndValueName.value = "";
}

function toEdit(row: saleAttr) {
    // 动态添加一个属性
    row.flag = true;
    row.saleAttrValue = ""
}
function toLook(row: saleAttr) {
    // 整理收集到的属性值和属性id
    const { baseSaleAttrId, saleAttrValue } = row;
    let newSaleAttrVale: saleAttrValue = {
        baseSaleAttrId,
        saleAttrValueName: saleAttrValue || ""
    }
    // 非法情况
    if ((saleAttrValue as string).trim() === "") {
        ElMessage.error("属性值不能为空");
        row.flag = false;
        return;
    }
    // 判重
    let repeat = row.spuSaleAttrValueList.find(item => {
        return item.saleAttrValueName == saleAttrValue;
    });
    if (repeat) {
        ElMessage.error("属性值重复");
        row.flag = false;
        return;
    }
    row.spuSaleAttrValueList.push(newSaleAttrVale);
    row.flag = false;
}

async function save() {
    // 整理数据
    // 照片墙数据
    spuParams.value.spuImageList = imgList.value.map((item: any) => {
        return {
            imgName: item.name,
            imgUrl: (item.response && item.response.data) || item.url
        }
    });
    spuParams.value.spuSaleAttrList = saleAttrs.value;
    const res = await reqSaveOrUpdateSpu(spuParams.value);
    // console.log(res);

    if (res.code === 200) {
        ElMessage({ type: "success", message: spuParams.id ? '更新成功' : '添加成功' });
        emit("changeScene", {flag:0,params:spuParams.value.id?'update':'add'});
    } else {
        ElMessage({ type: "error", message: spuParams.id ? '更新失败' : '添加失败' });
    }

}
// 添加新的spu
async function initAddSpu(c3Id: number | string) {
    // 清空数据
    Object.assign(spuParams, {
        id:"",
        category3Id: "",
        spuName: "",
        description: "",
        tmId: "",
        spuSaleAttrList: [],
        spuImageList: []
    });
    imgList.value = [];
    saleAttrs.value = [];
    saleAttrIdAndValueName.value = "";

    spuParams.value.category3Id = c3Id;
    let res: allTrademark = await reqAllTrademark();
    let res1: hasSaleAttrResponseData = await reqAllSaleAttr();
    allTrademarks.value = res.data;
    allSaleAttrs.value = res1.data;
}

defineExpose({ initHasSpuData, initAddSpu });
</script>

<style scoped></style>
