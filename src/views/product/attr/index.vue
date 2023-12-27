<template>
    <div id="attr-container">
        <Category :scene="scene"></Category>
        <el-card style="margin:18px 0;">
            <div v-show="scene === false">
                <el-button type="primary" size="default" icon="Plus" :disabled="categoryStore.c3Id ? false : true"
                    @click="addAttr">添加平台属性</el-button>
                <el-table border style="margin-top: 10px;" :data="attrArr">
                    <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                    <el-table-column label="属性名称" align="center" width="120px" prop="attrName"></el-table-column>
                    <el-table-column label="属性值名称" align="center">
                        <template #default="{ row, $index }">
                            <el-tag v-for="item in row.attrValueList" :key="item.id" style="margin: 5px;">{{ item.valueName
                            }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="120px">
                        <template #default="{ row, $index }">
                            <el-button type="primary" icon="Edit" size="small" @click="updateAttr"></el-button>
                            <el-button type="warning" icon="Delete" size="small"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div v-show="scene === true">
                <el-form inline>
                    <el-form-item label="属性名称">
                        <el-input placeholder="请您输入属性名称"></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" size="default" icon="Plus">添加属性值</el-button>
                <el-button type="primary" size="default" icon="Close" @click="cancel">取消</el-button>
                <el-table border style="margin: 10px 0;">
                    <el-table-column label="序号" width="80px" type="index" align="center"></el-table-column>
                    <el-table-column label="属性值名称"></el-table-column>
                    <el-table-column label="属性值操作" width="120px"></el-table-column>
                </el-table>
                <el-button type="primary" size="default">保存</el-button>
                <el-button type="primary" size="default">取消</el-button>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive,watch } from "vue";
import useCategoryStore from "@/stores/modules/category";
import { reqAttr } from "@/api/product/attr";
import type { attrResponseData, attr } from "@/api/product/attr/type";
import Category from "@/components/category/index.vue";

defineOptions({ name: "Attr" });

const categoryStore = useCategoryStore();
let attrArr = ref<attr[]>([]);
let scene = ref<boolean>(true);
// 收集新增的属性的数据
let attrParams=reactive<attr>({
    attrName:"", //新增的属性值数组
    attrValueList:[], //新增的属性值数组
    categoryId:"", //三级分类id
    categoryLevel:3, //代表是三级分类
});

async function getAttr() {
    const res: attrResponseData = await reqAttr(categoryStore.c1Id, categoryStore.c2Id, categoryStore.c3Id);
    if (res.code === 200) {
        attrArr.value = res.data;
        return "ok";
    } else {
        return Promise.reject(new Error("获取属性值失败"));
    }
}
watch(() => categoryStore.c3Id, () => {
    // 清空上一次查询的结果
    attrArr.value = [];
    if (!categoryStore.c3Id) return;
    getAttr();
});

/**
 * 添加属性按钮
 */
function addAttr() {
    scene.value = true;
}

/**
 * 修改属性
 */
function updateAttr() {
    scene.value = true;
}

function cancel() {
    scene.value = false;
}
</script>

<style scoped></style>