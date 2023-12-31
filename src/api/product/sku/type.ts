interface responseData{
    code:number,
    message:string,
    ok:boolean
}
interface attr {
    id?:number,
    attrId: number | string,
    valueId: number | string
}
interface saleArr {
    id?:number,
    saleAttrId: number | string,
    saleAttrValueId: number | string
}
export interface skuData {
    id?:number|string,
    category3Id?: string | number,
    spuId?: string | number,
    isSale?:boolean|number,
    tmId?: string | number,
    skuName?: string | number,
    price?: string | number,
    weight?: string | number,
    skuDesc?: string,
    skuAttrValueList?: attr[],
    skuSaleAttrValueList?: saleArr[],
    skuDefaultImg?: string
}

export interface skuResponseData extends responseData{
    data:{
        records:skuData[],
        total:number,
        size:number,
        current:number,
        orders:[],
        optimizeCountSql:boolean,
        hitCount:boolean,
        countId:null,
        maxLimit:null,
        searchCount:boolean,
        pages:number
    }
}

export interface skuInfoData extends responseData{
    data:skuData
}