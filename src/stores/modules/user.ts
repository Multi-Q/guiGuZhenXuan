import { defineStore } from "pinia";
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "@/utils/token";
import { reqLogin, reqUserInfo, reqLogout } from "@/api/user";
import type { UserState } from "@/stores/modules/types/type";
import type{loginFormData,loginResponseData,userInfoResponseData,logoutResponseData} from "@/api/user/type";

// 引入常量路由
import { constanRoute } from "@/router/routes";

const useUserStore = defineStore("user", {
    state: (): UserState => {
        return {
            token: GET_TOKEN(),
            menuRoutes: constanRoute,
            username: "",
            avatar: ""
        };
    },

    actions: {
        /**
         * 用户登录接口
         * @param loginFormObj  存储账号密码对象
         * @returns {Promise<string>}  成功或失败
         */
        async userLogin(loginFormObj: loginFormData) {
            const res: loginResponseData = await reqLogin(loginFormObj);
            if (res.code === 200) {
                this.token = (res.data as string);
                SET_TOKEN((res.data as string));
                //    这里返回的值会在Promise对象中的[[PromiseResult]]看到
                return "ok";
            } else {
                return Promise.reject(new Error(res.data));
            }
        },

        /**
         * 获取用户信息
         */
        async userInfo() {
            const res:userInfoResponseData = await reqUserInfo();
            // console.log(res);

            // 获取用户信息成功，就存储用户信息
            if (res.code === 200) {
                this.username = res.data.name;
                this.avatar = res.data.avatar;
                return "ok";
            } else {
                return Promise.reject(new Error(res.message));
            }
        },

        /**
         * 提出登录
         */
        async userLogout() {
            const res:logoutResponseData = await reqLogout();
            if (res.code === 200) {
                REMOVE_TOKEN();
                this.token = "";
                this.username = "";
                this.avatar = "";
                return "ok";
            } else {
                return Promise.reject(new Error(res.message));
            }
        },


    },
    getters: {

    }
});

export default useUserStore;