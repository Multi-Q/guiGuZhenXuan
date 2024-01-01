<template>
    <el-card style="height: 70px;">
        <el-form inline class="form">
            <el-form-item label="用户名：">
                <el-input placeholder="请输入用户名" v-model="keyword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :disabled="keyword ? false : true" @click="search">搜索</el-button>
                <el-button type="primary" @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin: 10px 0;">
        <el-button type="primary" @click="addUser">添加用户</el-button>
        <el-button type="primary" :disabled="batchIdArr.length ? false : true" @click="deletBatch">批量删除</el-button>
        <el-table border :data="userArr" @selection-change="selectChange" style="margin: 10px 0;">
            <el-table-column type="selection" align="center" width="40px"></el-table-column>
            <el-table-column type="index" label="#" align="center" width="60px"></el-table-column>
            <el-table-column prop="id" label="ID" align="center"></el-table-column>
            <el-table-column prop="username" label="用户名字" align="center"></el-table-column>
            <el-table-column prop="name" label="用户名称" align="center"></el-table-column>
            <el-table-column prop="roleName" label="用户角色" align="center"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间" align="center"></el-table-column>
            <el-table-column label="操作" align="center" width="300px">
                <template #="{ row, $index }">
                    <el-button type="primary" size="small" icon="User" @click="setRole(row)">分配角色</el-button>
                    <el-button type="primary" size="small" icon="Edit" @click="updateUser(row)">编辑</el-button>
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
            layout="prev,pager,next,jumper,->,sizes,total" :total="total" @current-change="getHasUser"
            @size-change="handler"></el-pagination>
    </el-card>

    <!-- 添加用户 -->
    <el-drawer v-model="drawer">
        <template #header>
            <h3>{{ userParams.id ? "更新用户" : "添加用户" }}</h3>
        </template>
        <template #default>
            <el-form :model="userParams" :rules="rules" ref="formRef">
                <el-form-item prop="username" label="用户姓名">
                    <el-input v-model="userParams.username" placeholder="请输入用户姓名"></el-input>
                </el-form-item>
                <el-form-item prop="name" label="用户昵称">
                    <el-input v-model="userParams.name" placeholder="请输入用户昵称"></el-input>
                </el-form-item>
                <el-form-item v-if="!userParams.id" prop="password" label="用户密码">
                    <el-input v-model="userParams.password" placeholder="请输入用户密码"></el-input>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <el-button type="primary" @click="cancelClick">取消</el-button>
            <el-button type="primary" @click="save">确定</el-button>
        </template>
    </el-drawer>

    <!-- 分配角色 -->
    <el-drawer v-model="drawer1">
        <template #header>
            <h3>角色分配</h3>
        </template>
        <template #default>
            <el-form>
                <el-form-item label="用户名称">
                    <el-input disabled v-model="userParams.username"></el-input>
                </el-form-item>
                <el-form-item label="职位列表">
                    <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate"
                        @change="handleCheckAllChange">全选</el-checkbox>
                    <el-checkbox-group v-model="userRole" @change="handleCheckChange">
                        <el-checkbox v-for="(item, index) in allRole" :key="index" :label="item">{{ item.roleName
                        }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <el-button type="primary" @click="drawer1 = false">取消</el-button>
            <el-button type="primary" @click="confirmClick">确定</el-button>
        </template>
    </el-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from "vue";
import { reqAddOrUpdateUser, reqAllRole, reqRemoveUser, reqSetUserRole, reqUserInfo, reqDeleteUser } from "@/api/acl/user/index";
import type { allRoleResponse, roleData, setRoleData, user, userResponseData } from "@/api/acl/user/type";
import useLayoutSettingStore from "@/stores/modules/setting";

defineOptions({ name: "User" });
const layoutSettingStore = useLayoutSettingStore();

let pageNo = ref<number>(1);
let pageSize = ref<number>(3);
let total = ref<number>(0);
let userArr = ref<user[]>([]);
let drawer = ref<boolean>(false);
let userParams = reactive<user>({
    username: "", name: "", password: ""
});
let formRef = ref<any>();
let rules = {
    username: [
        {
            required: true, trigger: blur, validator: (rule: any, value: any, callback: any) => {
                if (value.trim().length >= 5) { callback(); } else { callback(new Error("用户名字长度至少5位")); }
            }
        }
    ],
    name: [
        {
            required: true, trigger: blur, validator: (rule: any, value: any, callback: any) => {
                if (value.trim().length >= 5) { callback(); } else { callback(new Error("用户名字长度至少5位")); }
            }
        }
    ],
    password: [
        {
            required: true, trigger: blur, validator: (rule: any, value: any, callback: any) => {
                if (value.trim().length >= 6) { callback(); } else { callback(new Error("密码长度至少5位")); }
            }
        }
    ]
}
let drawer1 = ref<boolean>(false);
let checkAll = ref<boolean>(false);
let isIndeterminate = ref<boolean>(true);
let allRole = ref<roleData[]>([]);
let userRole = ref<roleData[]>([]);
let batchIdArr = ref<user[]>([]);
let keyword = ref<string>("");



async function getHasUser(pager: number = 1) {
    pageNo.value = pager;
    const res: userResponseData = await reqUserInfo(pageNo.value, pageSize.value, keyword.value);
    if (res.code === 200) {
        total.value = res.data.total;
        userArr.value = res.data.records;
    }
}

function handler() {
    getHasUser();
}

function addUser() {
    drawer.value = true;
    Object.assign(userParams, { id: 0, username: "", name: "", password: "" });
    nextTick(() => {
        formRef.value.clearValidate("username");
        formRef.value.clearValidate("name");
        formRef.value.clearValidate("password");
    });
}

function updateUser(row: user) {
    drawer.value = true;
    Object.assign(userParams, row);
    nextTick(() => {
        formRef.value.clearValidate("username");
        formRef.value.clearValidate("name");
    });
}

/**
 * 保存和更新
 */
async function save() {
    await formRef.value.validate();

    const res: any = await reqAddOrUpdateUser(userParams);
    if (res.code === 200) {
        drawer.value = false;
        ElMessage.success(userParams.id ? "修改成功" : "添加成功");
        getHasUser(userParams.id ? pageNo.value : 1);
        // 浏览器刷新一次
        window.location.reload();
    } else {
        drawer.value = false;
        ElMessage.error(userParams.id ? "修改失败" : "添加失败");
    }
}

/**
 * 分配角色
 */
async function setRole(row: user) {
    Object.assign(userParams, row);
    const res: allRoleResponse = await reqAllRole((row.id as number));
    if (res.code === 200) {
        allRole.value = res.data.allRolesList;
        userRole.value = res.data.assignRoles;
        drawer1.value = true;
    }
}

function handleCheckAllChange(val: boolean) {
    userRole.value = val ? allRole.value : [];
    isIndeterminate.value = false
}

function handleCheckChange(val: string[]) {
    checkAll.value = val.length === allRole.value.length;
    isIndeterminate.value = !(val.length === allRole.value.length);
}

async function confirmClick() {
    let data: setRoleData = {
        userId: (userParams.id as number),
        roleIdList: userRole.value.map(item => (item.id as number)),
    };
    const res: any = await reqSetUserRole(data);
    if (res.code === 200) {
        ElMessage.success("分配成功");
        getHasUser(pageNo.value);
        drawer1.value = false;
    } else {
        ElMessage.error("分配失败");
        drawer1.value = false;
    }
}

/**
 * 删除单个用户
 */
async function deleteUser(userId: number) {
    const res: any = await reqRemoveUser(userId);
    if (res.code === 200) {
        ElMessage.success("删除成功");
        getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1);
    } else {
        ElMessage.success("删除失败");
    }

}

/**
 * 收集选中状态的数据
 */
function selectChange(val) {
    batchIdArr.value = val;
}

/**
 * 批量删除
 */
async function deletBatch() {
    let idList: any = batchIdArr.value = batchIdArr.value.map(item => item.id);
    const res: any = await reqDeleteUser(idList);
    if (res.code === 200) {
        ElMessage.success("批量删除成功");
        getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1);
    } else {
        ElMessage.error("批量删除失败");
    }

}

function search() {
    getHasUser();
    keyword.value = "";
}

function reset() {
    layoutSettingStore.refresh = !layoutSettingStore.refresh;
}

onMounted(() => { getHasUser(); });
</script>

<style scoped lang="scss">
.form {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>