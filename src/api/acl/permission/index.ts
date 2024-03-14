import axios from "@/utils/request";
import type {menuParams, permissionResponseData} from "@/api/acl/permission/type";

enum API{
    ALL_PERMISSION_URL="/admin/acl/permission",
    ADD_MENU_URL="/admin/acl/permission/save",
    UPDATE_MENU_URL="/admin/acl/permission/update",
    REMOVE_MENU_UEL="/admin/acl/permission/remove"
}

export const reqAllPermission=()=>axios.get<any,permissionResponseData>(API.ALL_PERMISSION_URL);

export const reqAddOrUpdate=(data:menuParams)=>{
    if(data.id){
        return axios.put<any,any>(API.ADD_MENU_URL,data);
    }else{
        return axios.post<any,any>(API.UPDATE_MENU_URL,data);
    }
}

export const reqRemoveMenu=(menuId:number)=>axios.delete<any,any>(API.REMOVE_MENU_UEL+`/${menuId}`);