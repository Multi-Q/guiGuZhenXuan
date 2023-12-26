import type { RouteRecordRaw } from "vue-router";

// 小仓库数据类型
export interface UserState{
    token:string|null;
    menuRoutes:RouteRecordRaw[],
    username:string,
    avatar:string
} 