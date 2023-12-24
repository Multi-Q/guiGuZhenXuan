// 登录接口需要携带参数的ts类型
export interface loginForm{
    username:string,
    password:string
}

interface dataType{
    token:string
}

// 登录接口返回的类型
export interface loginResponseData{
    code:number,
    data:dataType
}

interface userInfo{
    userId:number,
    avatar:string,
    username:string,
    password:string,
    desc:string,
    roles:Array<string>,
    buttons:string[],
    routes:string[],
    token:string
}
interface user{
    checkUser:userInfo
}
// 定义服务器返回的数据类型
export interface userResponseData{
    code:number,
    data:user
}