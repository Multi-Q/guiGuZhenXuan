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
    tmId: number,
    spuSaleAttrList: null,
    spuImageList: null

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
interface trademark {
    id: number,
    tmName: string,
    logoUrl: string,
}
// 品牌接口返回数据类型
export interface allTrademark extends responseData {
    data: trademark[]
}

// 商品图片类型
 interface spuImg {
    id: number,
    createTime: string,
    updateTime: string,
    spuId: string,
    imgName: string,
    imgUrl: string
}

// spu照片墙数据类型
export interface spuHasImg extends responseData{
    data:spuImg[]
}

// 销售属性值对象
interface saleAttrValue{
    id?:number,
    createTime:null,
    updateTime:null,
    spuId:number,
    baseSaleAttrId:number,
    saleAttrValueName:string,
    saleAttrName:string,
    isChecked:null
}

// 销售属性对象
 interface saleAttr{
    id?:number,
    createTime:null,
    updateTime:null,
    spuId:number,
    baseSaleAttrId:number,
    saleAttrName:string,
    spuSaleAttrValueList:saleAttrValue[]
}

export interface saleAttrResponseData extends responseData{
    data:saleAttr[]
}
interface hasSaleAttr{
    id:number,
    name:string
}
export interface hasSaleAttrResponseData extends responseData{
    data:hasSaleAttr[]
}


