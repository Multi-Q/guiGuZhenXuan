import { defineStore } from "pinia";
import { reqLogin } from "@/api/user";
import type { loginForm, loginResponseData } from "@/api/user/type";

const useUserStore = defineStore("user", {
    state: () => {
        return {
            token: localStorage.getItem("TOKEN") as string,


        };
    },

    actions: {
        async userLogin(loginFormObj: loginForm) {
            const res:loginResponseData = await reqLogin(loginFormObj);
            if (res.code === 200) {
                this.token = res.data.token;
                // console.log(res);
                
                localStorage.setItem("TOKEN", res.data.token);
            //    这里返回的值会在Promise对象中的[[PromiseResult]]看到
                return "ok";
            } else {
                return Promise.reject(new Error("登陆失败，账号或密码错误"));
            }
        }
    },
    getters: {

    }
});

export default useUserStore;