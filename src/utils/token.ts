export function SET_TOKEN(token:string):void{
    localStorage.setItem("TOKEN",token);
}
export function GET_ITEM():string|null{
    return localStorage.getItem("TOKEN");
}