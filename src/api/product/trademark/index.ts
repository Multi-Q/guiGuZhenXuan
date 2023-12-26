import axios from "@/utils/request";

enum API{
    TRADEMARK_URL="/admin/product/baseTrademark/"
}

// 获取已有品牌的接口方法
export const reqHasTrademark=(page:number,limit:number)=> axios.get<any,any>(API.TRADEMARK_URL+`${page}/${limit}`)

