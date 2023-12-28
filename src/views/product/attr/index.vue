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
                            <el-button type="warning" icon="Edit" size="small" @click="updateAttr(row)"></el-button>
                            <el-popconfirm width="250px" confirm-button-text="确定" cancel-button-text="取消"
                                icon="QuestionFilled" icon-color="#626AEF" title="您是否要删除这条数据？"
                                @confirm="deleteAttr(row.id)">
                                <template #reference>
                                    <el-button type="danger" icon="Delete" size="small"></el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div v-show="scene === true">
                <el-form inline>
                    <el-form-item label="属性名称">
                        <el-input v-model="attrParams.attrName" placeholder="请您输入属性名称"></el-input>
                    </el-form-item>
                </el-form>
                <el-button :disabled="attrParams.attrName ? false : true" @click="addAttrValue" type="primary"
                    size="default" icon="Plus">添加属性值</el-button>
                <el-button type="primary" size="default" icon="Close" @click="cancel">取消</el-button>
                <el-table border style="margin: 10px 0;" :data="attrParams.attrValueList">
                    <el-table-column label="序号" width="80px" type="index" align="center"></el-table-column>
                    <el-table-column label="属性值名称">
                        <!-- row为当前属性值对象 -->
                        <template #="{ row, $index }">
                            <el-input v-if="row.flag" :ref="(ele: any) => inputArr[$index] = ele"
                                @blur="toLook(row, $index)" size="small" v-model="row.valueName"
                                placeholder="请输入属性值名称"></el-input>
                            <div v-else @click="toEdit(row, $index)"> {{ row.valueName }} </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="属性值操作" width="120px">
                        <template #="{ row, $index }">
                            <el-button type="warning" size="small" icon="Delete"
                                @click="attrParams.attrValueList.splice($index, 1)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="primary" size="default" @click="save()"
                    :disabled="attrParams.attrValueList.length > 0 ? false : true">保存</el-button>
                <el-button type="primary" size="default" @click="cancel">取消</el-button>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch ,onBeforeUnmount} from "vue";
import useCategoryStore from "@/stores/modules/category";
import { reqAttr, reqAddOrUpdateAttr, reqDeleteAttr } from "@/api/product/attr/index";
import type { attrResponseData, attr, attrValue } from "@/api/product/attr/type";
import Category from "@/components/category/index.vue";

defineOptions({ name: "Attr" });

const categoryStore = useCategoryStore();
let attrArr = ref<attr[]>([]);
let scene = ref<boolean>(false);
// 收集新增的属性的数据
let attrParams = reactive<attr>({
    id: "",
    attrName: "", //新增的属性值数组
    attrValueList: [], //新增的属性值数组
    categoryId: "", //三级分类id
    categoryLevel: 3, //代表是三级分类
});
// 属性值表单失去焦点的切换查看模式
// let flag = ref<boolean>(true);
// 用于存储el-input实例
const inputArr = ref<any>([]);

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
    // 每一次点击的时候都先清空数据
    Object.assign(attrParams, {
        id: "",
        attrName: "", //新增的属性值数组
        attrValueList: [], //新增的属性值数组
        categoryId: categoryStore.c3Id, //三级分类id
        categoryLevel: 3, //代表是三级分类
    });
    scene.value = true;
}

/**
 * 修改属性
 */
function updateAttr(row: attr) {
    scene.value = true;
    // 将已有的属性对象赋值给attrparams
    Object.assign(attrParams, JSON.parse(JSON.stringify(row)));
}

function cancel() {
    scene.value = false;
}

/**
 * 添加属性值
 */
function addAttrValue() {
    // 再添加属性值对象前，如果之前有属性值为空的，先把它除掉再添新对象
    attrParams.attrValueList.forEach((item, index) => {
        if (item.valueName.trim() === "" || item.valueName.trim() === undefined) {
            attrParams.attrValueList.splice(index, 1);
        }
    });
    // 点击添加属性值按钮，向数组添加一个属性值对象
    attrParams.attrValueList.push({
        valueName: "",
        flag: true, //用于控制每一个属性值编辑模式与切换
    });
    nextTick(() => {
        inputArr.value[attrParams.attrValueList.length - 1].focus();
    });
}
/**
 * 添加属性值的保存按钮
 */
async function save() {
    const hasNull = attrParams.attrValueList.every((item, index) => {
        if (item.valueName.trim() === "" || item.valueName.trim() === undefined) {
            attrParams.attrValueList.splice(index, 1);
            return false;
        }
        return true;
    });
    if (!hasNull) {
        ElMessage.error("含有非法属性值");
        return;
    }
    const res = await reqAddOrUpdateAttr(attrParams);
    if (res.code === 200) {
        scene.value = false;
        ElMessage.success(`${attrParams.id ? '修改成功' : '添加成功'}`);
        getAttr();
    } else {
        ElMessage.success(`${attrParams.id ? '修改失败' : '添加失败'}`);
    }
}

/**
 * 属性值失去焦点触发函数
 * @param row 
 */
function toLook(row: attrValue, $index: number) {
    // 非法情况判断1 空
    if (row.valueName.trim() === "") {
        // 删除对应属性值为空的元素
        attrParams.attrValueList.splice($index, 1);
        ElMessage.error("属性值不能为空");
        return;
    }
    // 非法情况2 去重
    const repeat = attrParams.attrValueList.find(item => {
        if (item != row) {
            return item.valueName === row.valueName;
        }
    });
    if (repeat) {
        // 将重复的数据剔除掉
        attrParams.attrValueList.splice($index, 1);
        ElMessage.error("属性值不能重复");
        return;
    }
    row.flag = false;
}
/**
 * 属性值点击div触发函数
 * @param row 
 */
function toEdit(row: attrValue, $index: number) {
    row.flag = true;
    nextTick(() => {
        inputArr.value[$index].focus();
    });
}

/**
 * 删除已有的属性值
 * @param attrId  属性值id
 */
async function deleteAttr(attrId: number) {
    const res: any = await reqDeleteAttr(attrId);
    if (res.code === 200) {
        ElMessage.success("删除成功");
        getAttr();
    } else {
        ElMessage.error("删除失败");
        return Promise.reject(new Error("删除属性值失败"));
    }
}

/**
 * 当组件路由切换时将仓库中的state的值清空
 */
onBeforeUnmount(()=>{
    categoryStore.$reset();
});
</script>

<style scoped></style>