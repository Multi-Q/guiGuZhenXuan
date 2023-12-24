<template>
    <div id="login-container">
        <el-row>
            <el-col :Span="12" :xs="0">站位格子</el-col>
            <el-col :Span="12" :xs="24">
                <el-form class="login-form" :rules="rules" :model="loginForm" ref="loginForms">
                    <h1>Hello</h1>
                    <h2>欢迎来到硅谷甄选</h2>
                    <el-form-item prop="username">
                        <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" :prefix-icon="Lock" :show-password="true"
                            v-model="loginForm.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="default" class="login-btn" @click="login"
                            :loading="loading">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { ref, reactive } from "vue";
defineOptions({ name: "Login" });
import useUserStore from "@/stores/modules/user";
import type { loginForm } from '@/api/user/type';
import { getTime } from "@/utils/time";

const userStore = useUserStore();
const router = useRouter();

// 登陆表单
const loginForm = reactive<loginForm>({
    username: "admin",
    password: "111111"
});
// 表单校验对象
const rules = reactive({
    username: [
        { required: true, message: "请填写用户名", trigger: "blur" },
        {
            validate: (rule: any, value: any, callback: any) => {
                if (/^d{5,10}$/.test(value)) {
                    callback();
                } else {
                    callback(new Error("账号长度5~10位"));
                }
            },
            trigger: "blur"
        }
    ],
    password: [
        { required: true, message: "请填写密码", trigger: "blur" },
        {
            validate: (rule: any, value: any, callback: any) => {
                if (/^d{6,10}$/.test(value)) {
                    callback();
                } else {
                    callback(new Error("密码长度5~10位"));
                }
            },
            trigger: "blur"
        }
    ]
})
// 控制登录按钮的加载圈圈
let loading = ref<boolean>(false);
const loginForms = ref();

/**
 * 登录<br>
 * 将当前收集的账号密码传递给useUserStore仓库，让仓库发请求
 * @param  null
 * @return {Promise<void>} null
 */
async function login():Promise<void> {
    loading.value = true;
    await loginForms.value.validate();
    // 通知仓库发送登录请求
    try {
        await userStore.userLogin(loginForm);
        router.push("/");
        ElNotification({ type: "success", message: "登陆成功", title: `Hi,${getTime()}好` });
    } catch (err) {
        loading.value = false;
        ElNotification({ type: "error", message: (err as Error).message });
    }

}



</script>

<style scoped lang="scss">
#login-container {
    width: 100%;
    height: 100vh;
    background: url("@/assets/images/background.jpg") no-repeat;
    background-size: cover;
}

.login-form {
    position: relative;
    width: 80%;
    top: 30vh;
    color: white;
    padding: 0 40px;
    background: url("@/assets/images/login_form.png") no-repeat;
    background-size: cover;

    h1 {
        font-size: 40px;
    }

    h2 {
        font-size: 20px;
        margin: 20px 0;
    }

    .login-btn {
        width: 100%;
    }
}
</style>