import axios from "@/utils/request";
import type { skuResponseData, skuInfoData } from "@/api/product/sku/type";

enum API {
    SKU_URL = "/admin/product/list",
    SALE_URL = "/admin/product/onSale",
    CANCEL_SALE_URL = "/admin/product/cancelSale",
    SKU_INFO_URL = "/admin/product/getSkuInfo",
    DELETE_SKU_URL = "/admin/product/deleteSku"

}

export const reqSkuList = (page: number, limit: number) => axios.get<any, skuResponseData>(API.SKU_URL + `/${page}/${limit}`);

export const reqSaleSku = (skuId: number) => axios.get<any, any>(API.SALE_URL + `/${skuId}`);

export const reqCancelSaleSku = (skuId: number) => axios.get<any, any>(API.CANCEL_SALE_URL + `/${skuId}`);

export const reqSkuInfo = (skuId: number) => axios.get<any, skuInfoData>(API.SKU_INFO_URL + `/${skuId}`);

export const reqDeleteSku = (skuId: number) => axios.delete<any, any>(API.DELETE_SKU_URL + `/${skuId}`);