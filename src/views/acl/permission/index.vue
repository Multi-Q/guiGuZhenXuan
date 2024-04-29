<template>
    <div id="permission-container">
        <el-table :data="permissionArr" border row-key="id" style="width: 100%; margin-bottom: 20px;">
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="code" label="权限值"></el-table-column>
            <el-table-column prop="updateTime" label="修改时间"></el-table-column>
            <el-table-column label="操作">
                <template #="{ row, $index }">
                    <el-button type="primary" size="small" :disabled="row.level == 4 ? true : false"
                        @click="addPermission(row)">{{ row.level === 3 ? '添加菜单' : '添加功能' }}</el-button>
                    <el-button type="primary" size="small" :disabled="row.level == 1 ? true : false"
                        @click="updatePermission(row)">编辑</el-button>
                    <el-popconfirm title="你确定删除这条菜单吗？" width="200px" confirm-button-text="确定" cancel-button-text="取消"
                        @confirm="deletePermission(row.id)">
                        <template #reference>
                            <el-button type="primary" size="small" :disabled="row.level == 1 ? true : false">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <!-- 添加菜单 -->
        <el-dialog v-model="dialogVisible" :title="menuData.id ? '修改菜单' : '添加菜单'">
            <el-form :model="menuData" :rules="rules" ref="formRef" label-width="100px">
                <el-form-item label="菜单名称">
                    <el-input placeholder="请输入菜单名称" v-model="menuData.name"></el-input>
                </el-form-item>
                <el-form-item label="权限值">
                    <el-input placeholder="请输入权限值" v-model="menuData.code"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button type="primary" @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="save">确定</el-button>
            </template>
        </el-dialog>

        
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { reqAddOrUpdate, reqAllPermission, reqRemoveMenu } from "@/api/acl/permission/index";
import type { menuParams, permission, permissionResponseData } from "@/api/acl/permission/type";

defineOptions({ name: "Permission" });

let permissionArr = ref<permission[]>([]);
let dialogVisible = ref<boolean>(false);
let formRef = ref<any>();
let rules = {
    roleName: [
        {
            required: true, trigger: "blur", validator: (rule: any, value: any, callback: any) => {
                if (value.length > 2) {
                    callback();
                } else {
                    callback(new Error("职位名称长度需大于2位"));
                }
            }
        }
    ]
}
let menuData = reactive<menuParams>({
    code: "", level: 0, name: "", pid: 0
});


async function getHasPermission() {
    const res: permissionResponseData = await reqAllPermission();
    if (res.code === 200) {
        permissionArr.value = res.data;
    }
}

function addPermission(row: permission) {
    dialogVisible.value = true;
    Object.assign(menuData, { id: 0, code: "", level: 0, name: "", pid: 0 });
    menuData.level = (row.level as number) + 1;
    menuData.pid = (row.id as number);

}

function updatePermission(row: permission) {
    dialogVisible.value = true;
    Object.assign(menuData, row);
}

async function deletePermission(permissionId: number) {
    const res: any = await reqRemoveMenu(permissionId);
    if (res.code === 200) {
        ElMessage.success("删除成功");
        getHasPermission();
    }
}

async function save() {
    const res: any = await reqAddOrUpdate(menuData);
    console.log(res);

    if (res.code === 200) {
        dialogVisible.value = false;
        ElMessage.success(menuData.id ? "修改成功" : "添加成功");
        getHasPermission();
    }
}

onMounted(() => { getHasPermission() });
</script>

<style scoped></style>