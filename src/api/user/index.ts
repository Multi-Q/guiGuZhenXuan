import axios from "@/utils/request";
import type { loginFormData,loginResponseData,userInfoResponseData,logoutResponseData } from "@/api/user/type";


// 管理统一接口
enum API{
    LOGIN_URL="/admin/acl/index/login",
    USERINFO_URL="/admin/acl/index/info",
    LOGOUT_URL="/admin/acl/index/logout"
}

export const reqLogin=(data:loginFormData)=>axios.post<any,loginResponseData>(API.LOGIN_URL,data);

export const reqUserInfo=()=>axios.get<any,userInfoResponseData>(API.USERINFO_URL);

export const reqLogout=()=>axios.post<any,logoutResponseData>(API.LOGOUT_URL);