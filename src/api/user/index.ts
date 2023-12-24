import axios from "@/utils/request";

import type { loginForm ,loginResponseData,userResponseData} from "./type";

// 管理统一接口
enum API{
    LOGIN_URL="/user/login",
    USERINFO_URL="/user/info"
}

export const reqLogin=(data:loginForm)=>axios.post<any,loginResponseData>(API.LOGIN_URL,data);

export const reqUserInfo=()=>axios.get<any,userResponseData>(API.USERINFO_URL);