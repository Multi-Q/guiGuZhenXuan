<template>
    <el-form border label-width="100px">
        <el-form-item label="spu名称">
            <el-input placeholder="请你输入spu名称"></el-input>
        </el-form-item>
        <el-form-item label="spu品牌">
            <el-select>
                <el-option label="华为"></el-option>
                <el-option label="华为"></el-option>
                <el-option label="华为"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="spu描述">
            <el-input type="textarea" placeholder="请你输入spu描述"></el-input>
        </el-form-item>
        <el-form-item label="spu图片">
            <el-upload v-model:file-list="fileList" action="#" list-type="picture-card">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>
            <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog>
        </el-form-item>
        <el-form-item label="spu销售属性">
            <el-select>
                <el-option label="上海"></el-option>
                <el-option label="上海"></el-option>
                <el-option label="上海"></el-option>
            </el-select>
            <el-button type="primary" icon="Plus" style="margin-left: 10px;">添加属性值</el-button>
            <el-table border style="margin: 10px 0;">
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="销售属性名字" width="120px"></el-table-column>
                <el-table-column label="销售属性值"></el-table-column>
                <el-table-column label="操作" width="120px">
                    <template #="{ row, $index }">
                        <el-button type="danger" icon="Delete"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary">保存</el-button>
            <el-button type="primary" @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
defineOptions({ name: "SpuForm" });
const emit=defineEmits(["changeScene"]);

function cancel(){
    emit("changeScene",0);
}
</script>

<style scoped></style>
