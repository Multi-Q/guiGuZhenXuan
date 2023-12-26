
// 用户登录接口
export interface loginFormData{
    username:string,
    password:string
}

// 全部接口返回数据都有的类型
 interface responseData{
    code:number,
    message:string,
    ok:boolean
}

// 定义登录接口的返回数据
export interface loginResponseData extends responseData{
    data:string,
}

// 用户信息响应数据
export interface userInfoResponseData extends responseData{
    data:{
        routes:string[],
        buttons:string[],
        roles:string[],
        name:string,
        avatar:string
    }
}

// 用户退出登录响应数据
export interface logoutResponseData extends responseData{
    data:string|null|""
}