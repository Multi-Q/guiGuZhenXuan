import axios from "@/utils/request";
import type { skuData, allTrademark, hasSaleAttrResponseData, hasSpuResponseData, saleAttrResponseData, spuHasImg, skuInfoData } from "@/api/product/spu/type";

enum API {
    HASSPU_URL = "/admin/product",
    ALL_TRADEMARK_URL = "/admin/product/baseTrademark/getTrademarkList",
    // 获取某个spu下的全部售卖商品的图片数据
    IMAGE_URL = "/admin/product/spuImageList",
    // 获取某一个spu下全部已有的销售属性
    SPU_HAS_SALE_ATTR_URL = "/admin/product/spuSaleAttrList",
    // 获取整个项目全部的销售属性
    ALL_SALE_ATTR_URL = "/admin/product/baseSaleAttrList",
    // 添加spu
    SAVE_SPU_URL = "/admin/product/saveSpuInfo",
    // 更新已有的spu
    UPDATE_SPU_URL = "/admin/product/saveSpuInfo",
    //追加一个新增sku地址
    ADDSKU_URL = "/admin/product/saveSkuInfo",
    //查看某一个已有的spu下全部售卖的上平
    SKUINFO_URL = "/admin/product/findBySpuId/",
    // 删除已有的spu
    REMOVE_SPU_URL="/admin/product/deleteSpu/"
}

export const reqHasSpu = (pageNo: number, pageSize: number, category3Id: string | number) => axios.get<any, hasSpuResponseData>(API.HASSPU_URL + `/${pageNo}/${pageSize}?category3Id=${category3Id}`);

export const reqAllTrademark = () => axios.get<any, allTrademark>(API.ALL_TRADEMARK_URL);

export const reqSpuImageList = (spuId: number) => axios.get<any, spuHasImg>(API.IMAGE_URL + `/${spuId}`);

export const reqspuHasSaleAttr = (spuId: number) => axios.get<any, saleAttrResponseData>(API.SPU_HAS_SALE_ATTR_URL + `/${spuId}`);

export const reqAllSaleAttr = () => axios.get<any, hasSaleAttrResponseData>(API.ALL_SALE_ATTR_URL);

export const reqSaveOrUpdateSpu = (data: any) => {
    if (data.id) {
        return axios.post<any, any>(API.SAVE_SPU_URL, data);
    } else {
        return axios.post<any, any>(API.UPDATE_SPU_URL, data);
    }
}

export const reqAddSku = (data: any) => axios.post<any, skuData>(API.ADDSKU_URL, data);

export const reqSkuList = (spuId: number | string) => axios.get<any, skuInfoData>(API.SKUINFO_URL + `/${spuId}`);

export const reqRemoveSku=(spuId:number|string)=>axios.delete<any,any>(API.REMOVE_SPU_URL+`/${spuId}`);
