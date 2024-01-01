import axios from "@/utils/request";
import type { allRoleResponse, setRoleData, user, userResponseData } from "@/api/acl/user/type";

enum API{
    ALL_USER_URL="/admin/acl/user",
    ADD_USER_URL="/admin/acl/user/save",
    UPDATE_USER_URL="/admin/acl/user/update",
    ALL_ROLE_URL="/admin/acl/user/toAssign",
    SET_ROLE_URL="/admin/acl/user/doAssignRole",
    DELETE_USER_URL="/admin/acl/user/remove",
    DELETE_ALL_USER_URL="/admin/acl/user/batchRemove"
}

export const reqUserInfo=(page:number,limit:number,username:string)=>axios.get<any,userResponseData>(API.ALL_USER_URL+`/${page}/${limit}/?username=${username}`);

export const reqAddOrUpdateUser=(data:user)=>{
    if(data.id){
        return axios.put<any,any>(API.UPDATE_USER_URL,data);
    }else{
        return axios.post<any,any>(API.ADD_USER_URL,data);
    }
}

export const reqAllRole=(userId:number)=>axios.get<any,allRoleResponse>(API.ALL_ROLE_URL+`/${userId}`);

export const reqSetUserRole=(data:setRoleData)=>axios.post<any,any>(API.SET_ROLE_URL,data);

export const reqRemoveUser=(userId:number)=>axios.delete<any,any>(API.DELETE_USER_URL+`/${userId}`);

export const reqDeleteUser=(idList:number[])=>axios.delete<any,any>(API.DELETE_ALL_USER_URL,{data:idList});
