<template>
    <div>
        <el-card class="box-card">
            <el-button type="primary" icon="Plus" @click="addTrademark">添加品牌</el-button>
            <el-table border :data="trademarkArr" style="margin-top: 20px;">
                <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
                <el-table-column label="品牌名称" align="center" prop="tmName"></el-table-column>
                <el-table-column label="品牌LOGO" align="center">
                    <template #default="{ row, $index }">
                        <img :src="row.logoUrl" alt="没有图片" style="height: 50px;width: 50px;">
                    </template>
                </el-table-column>
                <el-table-column label="品牌操作" align="center">
                    <template #default="{ row, $index }">
                        <el-button type="primary" size="small" icon="Edit" @click="updateTrademark(row)">编辑</el-button>
                        <el-popconfirm width="250px" confirm-button-text="确定" cancel-button-text="取消" icon="Delete"
                            icon-color="#626AEF" :title="`您是否要删除-${row.tmName}-数据?`" @confirm="deleteTrademark(row)">
                            <template #reference>
                                <el-button type="primary" size="small" icon="Delete">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 10]"
                :background="true" layout="prev,pager,next,jumper,->,sizes,total" :total="total"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" style="margin-top: 20px;">
            </el-pagination>
        </el-card>

        <!-- 对话框 -->
        <el-dialog v-model="dialogFormVisible" :title="trademarkParams.id ? '修改品牌' : '添加品牌'">
            <el-form :model="trademarkParams" :rules="rules" ref="formRef">
                <el-form-item label="品牌名称" label-width="100px" required prop="tmName">
                    <el-input placeholder="请输入品牌名称" v-model="trademarkParams.tmName"></el-input>
                </el-form-item>
                <el-form-item label="品牌Logo" label-width="100px" required prop="logoUrl">
                    <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
                        :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess">
                        <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button type="primary" @click="cancel">取消</el-button>
                <el-button type="primary" @click="confirm">确定</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { reqHasTrademark, reqAddOrUpdateTrademark, reqRemoveTrademark } from "@/api/product/trademark/index";
import type { UploadProps } from 'element-plus';
import type { trademark, records, trademarkResponseData } from "@/api/product/trademark/type";
defineOptions({ name: "TradeMark" });


// 当前页码
let pageNo = ref<number>(1);
// 每一页展示多少数据
let limit = ref<number>(3);
let total = ref<number>(0);
// 存储已有品牌的数据
let trademarkArr = ref<records>([]);
// 控制添加品牌的对话框显示和隐藏
let dialogFormVisible = ref<boolean>(false);
const formRef = ref();

const rules = {
    tmName: [
        { required: true, message: "品牌名称必须填写", trigger: "blur" },
        {
            trigger: "change", validator: (rule: any, value: any, callback: any) => {
                if (value.trim().length >= 2) {
                    callback();
                } else {
                    callback(new Error("品牌名称长度大于等于2位"))
                }
            }
        },
    ],
    logoUrl: [
        {
            required: true, validator: (rule: any, value: any, callback: any) => {
                if (value) {
                    callback();
                } else {
                    callback(new Error("请上传图片"));
                }
            }
        }
    ]
};

let trademarkParams = reactive<trademark>({
    tmName: "",
    logoUrl: ""
});

/**
 * 用于获取商品数据，在组件挂载时会触发一次
 * @param pageNo 当前页码
 * @param limit 每页展示多少数据
 * @return {string|Promise} "ok"或一个Promise错误
 */
async function getHasTradeMark(pageNo: number = 1, limit: number = 3) {
    const res: trademarkResponseData = await reqHasTrademark(pageNo, limit);
    if (res.code === 200) {
        // 存储已有的品牌总个数
        total.value = res.data?.total || 0;
        trademarkArr.value = res.data?.records || [];
        return "ok";
    } else {
        return Promise.reject(new Error(res.message));
    }
}

/**
 * 每页展示数据
 * @param limitSize 更换每页展示多少条数据
 */
function handleSizeChange(limitSize: number) {
    getHasTradeMark(pageNo.value, limitSize);
}

/**
 * 翻页
 * @param val 当前页码变更后的页码
 */
function handleCurrentChange(val: number) {
    getHasTradeMark(val, limit.value);
}

/**
 * 添加品牌按钮
 */
function addTrademark() {
    dialogFormVisible.value = true;
    trademarkParams.logoUrl = "";
    trademarkParams.tmName = "";
    trademarkParams.id = 0;
    nextTick(() => {
        formRef.value.clearValidate("tmName");
        formRef.value.clearValidate("logoUrl");
    });
}

/**
 * 对话框取消按钮
 */
function cancel() {
    dialogFormVisible.value = false;
}
/**
 * 对话框确定按钮
 */
async function confirm() {
    // 调用方法前调用表单校验
    await formRef.value.validate();
    const res = await reqAddOrUpdateTrademark(trademarkParams);
    if (res.code === 200) {
        dialogFormVisible.value = false;
        ElMessage.success(`${trademarkParams.id ? '修改' : '添加'}品牌成功`);
        getHasTradeMark(pageNo.value, limit.value);
        return "ok";
    } else {
        ElMessage.error(`${trademarkParams.id ? '修改' : '添加'}品牌失败`);
        return Promise.reject(new Error(`${trademarkParams.id ? '修改' : '添加'}品牌失败`));
    }
}

/**
 * 上传图片钩子
 * @param rawFile 图片
 */
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type === "image/jpeg" || rawFile.type === "image/jpg" || rawFile.type === "image/png") {
        if (rawFile.size / 1024 / 1024 > 4) {
            ElMessage.error('上传的图片大小应小于4M');
            return false;
        }
        return true;
    } else {
        ElMessage.error('图片格式必须为.jpeg/.jpg/.png');
        return false;
    }
}

/**
 * 
 * @param response 图片上成功的响应对象
 * @param uploadFile 一个代理对象
 */
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
    trademarkParams.logoUrl = response.data;
    formRef.value.clearValidate("logoUrl");
}

/**
 * 修改数据
 */
async function updateTrademark(row: any) {
    dialogFormVisible.value = true;
    nextTick(() => {
        formRef.value.clearValidate("tmName");
        formRef.value.clearValidate("logoUrl");
    });
    Object.assign(trademarkParams, row);
}

/**
 * 删除数据
 */
async function deleteTrademark(row: any) {
    const res: trademarkResponseData = await reqRemoveTrademark(row.id);
    if (res.code === 200) {
        ElMessage.success("删除品牌成功");
        await getHasTradeMark(trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1, limit.value);
        return "ok";
    } else {
        ElMessage.success("删除品牌失败");
        return Promise.reject(new Error("删除失败"));
    }
}

onMounted(() => {
    getHasTradeMark(pageNo.value, limit.value);
})
</script>



<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>