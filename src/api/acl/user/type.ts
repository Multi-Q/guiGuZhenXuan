interface responseData{
    code:number,
    message:string,
    ok:boolean
}

export interface user{
    id?:number,
    createTime?:string,
    updateTime?:string,
    username?:string,
    password?:string,
    name?:string,
    phone?:string,
    roleName?:string
}

export interface userResponseData extends responseData{
    data:{
        records:user[],
        total:number,
        size:number,
        current:number,
        pages:number
    }
}

export interface roleData{
    id?:number,
    createTime?:string,
    updateTime?:string,
    roleName?:string,
    remark?:null
}

export interface allRoleResponse extends responseData{
    data:{
        assignRoles:roleData[],
        allRolesList:roleData[]
    }
}

export interface setRoleData{
    roleIdList:number[],
    userId:number
}