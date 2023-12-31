interface responseData {
    code: number,
    message: string,
    ok: boolean
}

// spu数据类型
export interface spuData {
    id?: number,
    spuName: string,
    description: string,
    category3Id: string | number,
    tmId: number | string,
    spuSaleAttrList: null | spuImg[],
    spuImageList: null | saleAttr[]

}

// 获取已有的spu接口返回的数据类型
export interface hasSpuResponseData extends responseData {
    data: {
        records: spuData[],
        total: number,
        size: number,
        current: number,
        searchCount: boolean,
        pages: number,
    }
}

// 品牌数据类型
export interface trademark {
    id: number,
    tmName: string,
    logoUrl: string,
}
// 品牌接口返回数据类型
export interface allTrademark extends responseData {
    data: trademark[]
}

// 商品图片类型
export interface spuImg {
    id?: number,
    createTime?: string,
    updateTime?: string,
    spuId?: string,
    imgName?: string,
    imgUrl?: string,
    name?: string,
    url?: string
}

// spu照片墙数据类型
export interface spuHasImg extends responseData {
    data: spuImg[]
}

// 销售属性值对象
export interface saleAttrValue {
    id?: number,
    createTime?: null,
    updateTime?: null,
    spuId?: number,
    baseSaleAttrId: number,
    saleAttrValueName: string,
    saleAttrName?: string,
    isChecked?: null
}

// 销售属性对象
export interface saleAttr {
    id?: number,
    createTime?: null,
    updateTime?: null,
    spuId?: number,
    flag?: boolean,
    saleAttrValue?: string,
    baseSaleAttrId: number,
    saleAttrName: string,
    spuSaleAttrValueList: saleAttrValue[]
}

export interface saleAttrResponseData extends responseData {
    data: saleAttr[]
}
export interface hasSaleAttr {
    id: number,
    name: string
}
export interface hasSaleAttrResponseData extends responseData {
    data: hasSaleAttr[]
}

interface attr {
    attrId: number | string,
    valueId: number | string
}
interface saleArr {
    saleAttrId: number | string,
    saleAttrValueId: number | string
}
export interface skuData {
    category3Id: string | number,
    spuId: string | number,
    tmId: string | number,
    skuName: string | number,
    price: string | number,
    weight: string | number,
    skuDesc: string,
    skuAttrValueList?: attr[],
    skuSaleAttrValueList?: saleArr[],
    skuDefaultImg: string
}

export interface skuInfoData extends responseData{
    data:[]
}

