import axios from "@/utils/request";
import type { roleData, roleResponseData } from "@/api/acl/role/type";
enum API {
    ALL_ROLE_URL = "/admin/acl/role",
    ADD_ROLE_URL = "/admin/acl/role/save",
    UPDATE_ROLE_URL = "/admin/acl/role/update",
}

export const reqAllRoleList = (page: number, limit: number, roleName: string) => axios.get<any, roleResponseData>(API.ALL_ROLE_URL + `/${page}/${limit}/?roleName=${roleName}`);

export const reqAddOrUpdateRole = (data: roleData) => {
    if (data.id) {
        return axios.put<any,any>(API.UPDATE_ROLE_URL,data);
    } else {
        return axios.post<any,any>(API.ADD_ROLE_URL,data);
    }
}