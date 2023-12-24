import { type RouteRecordRaw } from "vue-router";
export const  constanRoute:RouteRecordRaw[]=[
    {path:"/",component:()=>import("@/views/home/index.vue"),name:"layout"},
    {path:"/login",component:()=>import("@/views/login/index.vue"),name:"login"},
    {path:"/404",component:()=>import("@/views/404/index.vue"),name:"404"},
    {path:"/:pathMatch(.*)*",redirect:"/404",name:"any"},

];