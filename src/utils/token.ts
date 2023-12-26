export function SET_TOKEN(token:string):void{
    localStorage.setItem("TOKEN",token);
}
export function GET_TOKEN():string|null{
    return localStorage.getItem("TOKEN");
}

export function REMOVE_TOKEN():void{
    localStorage.removeItem("TOKEN");
}