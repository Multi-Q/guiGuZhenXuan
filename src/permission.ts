// 路由鉴权
import router from "@/router/index";
import useUserStore from "@/stores/modules/user";
import pinia from "./stores";
import setting from "./setting";

const userStore = useUserStore(pinia);

// 全局前置守卫
router.beforeEach(async (to: any, from: any) => {
    document.title=`${setting.title}-${to.meta.title}`;
    // 获取token，判断用户登录
    const token = userStore.token;
    if (token) {
        // 登陆成功，还想访问login，直接重定向到home页
        if (to.path == "/login") {
            return { path: "/" };
        } else {
            // 登录成功访问其他留个路由
            // 由用户信息
            if (userStore.username) {
                return true;
            } else {
                try {
                    await userStore.userInfo();
                    return true;
                } catch (err) {
                    // token过期，用户手动修改本地token
                    ElMessage({ type: "error", message: "token过期或token为假" });
                    userStore.userLogout();
                    return {name:"login",query:{redirect:to.path}};
                }
            }
        }
    } else {
        // 用户未登录判断
        if (to.path == "/login") {
            return true;
        } else {
            return { name: "login", query: { redirect: to.path } };
        }
        // true或undefined表示放行
    }
});

// 后置路由守卫
router.afterEach((to: any, from: any) => {

    return false;
});
export default router;


