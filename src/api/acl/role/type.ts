interface responseData {
    code: number,
    message: string,
    ok: boolean
}

export interface roleData {
    id?: number,
    createTime?: string,
    updateTime?: string,
    roleName: string,
    remark?: null
}

export interface roleResponseData extends responseData {
    data: {
        records: roleData[],
        total: number,
        size: number,
        current: number,
        pages: number
    }
}

export interface menuData {
    id?: number,
    createTime?: string,
    updateTime?: string,
    pid?: number,
    name?: string,
    code?: string,
    toCode?: string,
    type?: number,
    status?: null,
    level?: number,
    children?: menuData[],
    elect?: boolean
}

export interface menuResponseData extends responseData{
    data:menuData[]
}
