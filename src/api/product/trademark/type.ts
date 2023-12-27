 interface responseData{
    code:number,
    message:string,
    ok:boolean
}

export interface trademark{
    id?:number,
    tmName:string,
    logoUrl:string
}

export type records=trademark[];

export interface trademarkResponseData extends responseData{
    data:{
        records:records,
        total:number,
        size:number,
        current:number,
        searchCount:boolean,
        pages:number
    }|null
}

