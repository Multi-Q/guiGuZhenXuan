<template>
    <div id="role-container">
        <el-card style="height: 70px;">
            <el-form inline class="form">
                <el-form-item label="职位搜索：">
                    <el-input placeholder="请输入职位关键字" v-model="keyword"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :disabled="keyword ? false : true" @click="search">搜索</el-button>
                    <el-button type="primary" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card style="margin: 10px 0;">
            <el-button type="primary" icon="Plus" @click="addRole">添加职位</el-button>
            <el-button type="primary">批量删除</el-button>
            <el-table border :data="allRole" style="margin: 10px 0;">
                <el-table-column type="selection" align="center" width="40px"></el-table-column>
                <el-table-column type="index" label="#" align="center" width="60px"></el-table-column>
                <el-table-column prop="id" label="ID" align="center"></el-table-column>
                <el-table-column prop="roleName" label="职位名称" align="center"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
                <el-table-column prop="updateTime" label="更新时间" align="center"></el-table-column>
                <el-table-column label="操作" align="center" width="300px">
                    <template #="{ row, $index }">
                        <el-button type="primary" size="small" icon="User" @click="setPermission(row)">分配权限</el-button>
                        <el-button type="primary" size="small" icon="Edit" @click="updateRole(row)">编辑</el-button>
                        <el-popconfirm title="你确定删除这个用户信息吗？" width="200px" confirm-button-text="确定" cancel-button-text="取消"
                            @confirm="deleteUser(row.id)">
                            <template #reference>
                                <el-button type="primary" size="small" icon="Delete">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" background :page-sizes="[3, 5, 7, 9]"
                layout="prev,pager,next,jumper,->,sizes,total" :total="total" @current-change="getHasRole"
                @size-change="handler"></el-pagination>
        </el-card>

        <!-- 添加职位 -->
        <el-dialog v-model="dialogVisible" :title="roleParams.id ? '修改职位' : '添加职位'">
            <el-form :model="roleParams" :rules="rules" ref="formRef">
                <el-form-item>
                    <el-input placeholder="请输入职位名称" v-model="roleParams.roleName"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button type="primary" @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="save">确定</el-button>
            </template>
        </el-dialog>
        
        
        <!-- 分配权限 -->
        <el-drawer v-model="drawerVisible">
        <template #header>
            <h3>分配菜单与按钮权限</h3>
        </template>
        <template #default>
           <el-tree></el-tree>
        </template>
        <template #footer>
            <el-button type="primary" @click="drawerVisible = false">取消</el-button>
            <el-button type="primary" @click="confirmClick">确定</el-button>
        </template>
    </el-drawer>


    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from "vue";
import { reqAllRoleList, reqAddOrUpdateRole } from "@/api/acl/role/index";
import type { roleData, roleResponseData } from "@/api/acl/role/type";
import useLayoutSettingStore from "@/stores/modules/setting";

defineOptions({ name: "Role" });

const layoutSettingStore = useLayoutSettingStore();

let pageNo = ref<number>(1);
let pageSize = ref<number>(5);
let total = ref<number>(0);
let keyword = ref<string>("");
let allRole = ref<roleData[]>([]);
let dialogVisible = ref<boolean>(false);
let roleParams = reactive<roleData>({ roleName: "", });
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
let drawerVisible=ref<boolean>(false);


async function getHasRole(pager: number = 1) {
    pageNo.value = pager;
    const res: roleResponseData = await reqAllRoleList(pageNo.value, pageSize.value, keyword.value);
    if (res.code === 200) {
        allRole.value = res.data.records;
        total.value = res.data.total;
    }

}

function handler() {
    getHasRole();
}

function search() {
    getHasRole();
}

function reset() {
    layoutSettingStore.refresh = !layoutSettingStore.refresh;
}

function addRole() {
    dialogVisible.value = true;
    Object.assign(roleParams, { id: 0, roleName: "" });
    nextTick(() => formRef.value.clearValidate("roleName"));
}

async function updateRole(row: roleData) {
    dialogVisible.value = true;
    Object.assign(roleParams, row);
    nextTick(() => formRef.value.clearValidate("roleName"));
}

async function save() {
    await formRef.value.validate();

    const res: any = await reqAddOrUpdateRole(roleParams);
    if (res.code === 200) {
        ElMessage.success(roleParams.id ? "更新成功" : "添加成功");
        getHasRole(roleParams.id ? pageNo.value : 1);
        dialogVisible.value = false;
    } else {
        ElMessage.error(roleParams.id ? "更新失败" : "添加失败");
    }

}

function setPermission(row:roleData){

}


onMounted(() => { getHasRole(); });
</script>

<style scoped></style>