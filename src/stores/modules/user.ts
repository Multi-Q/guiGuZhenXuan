import { defineStore } from "pinia";
import { SET_TOKEN,GET_ITEM } from "@/utils/token";
import { reqLogin } from "@/api/user";
import type { loginForm, loginResponseData } from "@/api/user/type";
import type { UserState } from "@/stores/modules/types/type";

const useUserStore = defineStore("user", {
    state: (): UserState => {
        return {
            token: GET_ITEM(),


        };
    },

    actions: {
        async userLogin(loginFormObj: loginForm) {
            const res: loginResponseData = await reqLogin(loginFormObj);
            if (res.code === 200) {
                this.token = (res.data.token as string);
                // console.log(res);
                SET_TOKEN((res.data.token as string));
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