import axios from "@/utils/request";
import type { menuResponseData, roleData, roleResponseData } from "@/api/acl/role/type";
enum API {
    ALL_ROLE_URL = "/admin/acl/role",
    ADD_ROLE_URL = "/admin/acl/role/save",
    UPDATE_ROLE_URL = "/admin/acl/role/update",
    ALL_PERMISSION_URL="/admin/acl/permission/toAssign",
    SET_PERMISSION_URL="/admin/acl/permission/doAssign",
    REMOVE_ROLE_URL="/admin/acl/role/remove"
}

export const reqAllRoleList = (page: number, limit: number, roleName: string) => axios.get<any, roleResponseData>(API.ALL_ROLE_URL + `/${page}/${limit}/?roleName=${roleName}`);

export const reqAddOrUpdateRole = (data: roleData) => {
    if (data.id) {
        return axios.put<any,any>(API.UPDATE_ROLE_URL,data);
    } else {
        return axios.post<any,any>(API.ADD_ROLE_URL,data);
    }
}

export const reqAllMenuList=(roleId:number)=>axios.get<any,menuResponseData>(API.ALL_PERMISSION_URL+`/${roleId}`);

export const reqSetpermission=(roleId:number,permissionId:number[])=>axios.post<any,any>(API.SET_PERMISSION_URL+`/?roleId=${roleId}&permissionId=${permissionId}`);

export const reqRemoveRole=(roleId:number)=>axios.delete<any,any>(API.REMOVE_ROLE_URL+`/${roleId}`);