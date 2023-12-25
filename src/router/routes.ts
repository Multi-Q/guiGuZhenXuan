import type { RouteRecordRaw } from "vue-router";
export const constanRoute: RouteRecordRaw[] = [
    {
        path: "/",
        component: () => import("@/layout/index.vue"),
        name: "layout",
        redirect: "/home",
        meta: { title: "", /* 菜单标题 */ hidden: false,/* 是否隐藏 */ icon: "",/* 图标 */},
        children: [
            {
                path: "home", name: "home", component: () => import("@/views/home/index.vue"),
                meta: { title: "首页", hidden: false, icon: "HomeFilled" }
            }
        ],
    },
    {
        path: "/screen", name: "screen", component: () => import("@/views/screen/index.vue"),
        meta: { title: "数据大屏", hidden: false, icon: "Platform" }
    },
    {
        path: "/acl", name: "acl", component: () => import("@/layout/index.vue"),
        redirect:"/acl/user",meta: { title: "权限管理", hidden: false, icon: "Lock" },
        children: [
            {
                path: "user", name: "user", component: () => import("@/views/acl/user/index.vue"),
                meta: { title: "用户管理", hidden: false, icon: "UserFilled" }
            },
            {
                path: "role", name: "role", component: () => import("@/views/acl/role/index.vue"),
                meta: { title: "角色管理", hidden: false, icon: "HelpFilled" }
            },
            {
                path: "permission", name: "permission", component: () => import("@/views/acl/permission/index.vue"),
                meta: { title: "菜单管理", hidden: false, icon: "Grid" }
            },
        ]
    },
    {
        path: "/product", name: "product", component: () => import("@/layout/index.vue"),
        redirect:"/product/trademark",meta: { title: "商品管理", hidden: false, icon: "Goods" },
        children: [
            {
                path: "trademark", name: "trademark", component: () => import("@/views/product/trademark/index.vue"),
                meta: { title: "品牌管理", hidden: false, icon: "ShoppingCartFull" }
            },
            {
                path: "attr", name: "attr", component: () => import("@/views/product/attr/index.vue"),
                meta: { title: "属性管理", hidden: false, icon: "List" }
            },
            {
                path: "spu", name: "spu", component: () => import("@/views/product/spu/index.vue"),
                meta: { title: "SPU管理", hidden: false, icon: "DataLine" }
            },
            {
                path: "sku", name: "sku", component: () => import("@/views/product/sku/index.vue"),
                meta: { title: "SKU管理", hidden: false, icon: "Calendar" }
            }
        ],

    },
    {
        path: "/login", name: "login", component: () => import("@/views/login/index.vue"),
        meta: { title: "登录", hidden: true, icon: "Edit" }
    },
    {
        path: "/404", name: "404", component: () => import("@/views/404/index.vue"),
        meta: { title: "404", hidden: true, icon: "Edit" }
    },
    // {
    //     path: "/:pathMatch(.*)*", name: "any", redirect: "/404",
    //     meta: { title: "任意路径", hidden: true, icon: "Edit" }
    // },

];