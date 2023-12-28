interface responseData {
    code: number,
    message: string,
    ok: boolean
}

export interface categoryObj {
    id: string | number,
    name: string,
    category1Id?: number,
    category2Id?: number,
}

export interface categoryResponseData extends responseData {
    data: categoryObj[]
}

// 仓库state对象类型
export interface categoryState {
    c1Id: string | number,
    c1Arr: categoryObj[],
    c2Arr: categoryObj[],
    c2Id: string | number,
    c3Arr: categoryObj[],
    c3Id: string | number,
}

// 已有属性值对象
export interface attrValue {
    id?: number,
    valueName: string,
    attrId?: number,
    flag?:boolean
}

export interface attr {
    id?: number|string,
    attrName: string,
    categoryId: number|string,
    categoryLevel: number,
    attrValueList:attrValue[]
}

export interface attrResponseData extends responseData {
    data: attr[]
}