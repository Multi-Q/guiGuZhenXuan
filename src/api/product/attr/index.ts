import axios from "@/utils/request";
import type { categoryResponseData,attrResponseData ,attrValue} from "@/api/product/attr/type";

enum API{
    C1_URL="/admin/product/getCategory1",
    C2_URL="/admin/product/getCategory2/",
    C3_URL="/admin/product/getCategory3/",
    ATTR_URL="/admin/product/attrInfoList/",
    // 添加或修改已有的属性和接口
    ADD_OR_UPDATE_ATTR_URL="/admin/product/saveAttrInfo"
}
export const reqC1=()=>axios.get<any,categoryResponseData>(API.C1_URL);
export const reqC2=(category1Id:number|string)=>axios.get<any,categoryResponseData>(API.C2_URL+`${category1Id}`);
export const reqC3=(category2Id:number|string)=>axios.get<any,categoryResponseData>(API.C3_URL+`${category2Id}`);
export const reqAttr=(c1Id:string|number,c2Id:string|number,c3Id:string|number)=>axios.get<any,attrResponseData>(API.ATTR_URL+`${c1Id}/${c2Id}/${c3Id}`);
export const reqAddOrUpdateAttr=(data:attrValue)=>axios.post<any,any>(API.ADD_OR_UPDATE_ATTR_URL,data);
