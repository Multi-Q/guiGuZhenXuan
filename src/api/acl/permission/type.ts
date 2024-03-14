interface responseData {
    code: number,
    message: string,
    ok: boolean
}

export interface permission{
    id?:number,
    createTime?:string,
    updateTime?:string,
    pid?:number,
    name?:string,
    code?:null,
    toCode?:null,
    type?:number,
    status?:null,
    level?:number,
    children?:permission[],
    select?:boolean
}

export interface permissionResponseData extends responseData{
    data:permission[]
}

export interface menuParams{
    id?:number,
    code:string,
    level:number,
    name:string,
    pid:number
}