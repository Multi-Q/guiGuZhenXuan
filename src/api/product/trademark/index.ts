import axios from "@/utils/request";
import type { trademark, trademarkResponseData } from "@/api/product/trademark/type";

enum API {
    TRADEMARK_URL = "/admin/product/baseTrademark/",
    ADD_TRADEMARK_URL = "/admin/product/baseTrademark/save",
    UPDATE_TRADEMARK_URL = "/admin/product/baseTrademark/update",
    GET_TRADEMARK_URL="/admin/product/baseTrademark/get/",
    DEL_TRADEMARK_URL="/admin/product/baseTrademark/remove/",

}

// 获取已有品牌的接口方法
export const reqHasTrademark = (page: number, limit: number) => axios.get<any, trademarkResponseData>(API.TRADEMARK_URL + `${page}/${limit}`)

// 修改或更新数据
export const reqAddOrUpdateTrademark = (data: trademark) => {
    if (data.id) return axios.put<any,any>(API.UPDATE_TRADEMARK_URL, data);
    else return axios.post<any,any>(API.ADD_TRADEMARK_URL, data);
}

// 删除品牌数据
export const reqRemoveTrademark=(id:number)=>axios.delete<any,any>(API.DEL_TRADEMARK_URL+id);



