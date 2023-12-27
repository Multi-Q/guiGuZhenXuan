import { reqC1, reqC2, reqC3,reqAttr } from "@/api/product/attr/index";
import type { categoryResponseData, categoryState, attrResponseData } from "@/api/product/attr/type";
import { defineStore } from "pinia";

const useCategoryStore = defineStore("category", {
    state: (): categoryState => {
        return {
            c1Arr: [],
            c1Id: "",
            c2Arr: [],
            c2Id: "",
            c3Arr: [],
            c3Id: "",
        };
    },
    actions: {
        /**
         * 获取一级分类
         * @returns "ok"|Promise.reject()
         */
        async getC1() {
            const res: categoryResponseData = await reqC1();
            if (res.code === 200) {
                this.c1Arr = res.data;
                return "ok";
            } else {
                return Promise.reject(new Error("获取一级分类数据失败"));
            }
        },
        /**
       * 获取二级分类
       * @returns "ok"|Promise.reject()
       */
        async getC2() {
            const res: categoryResponseData = await reqC2(this.c1Id);
            if (res.code === 200) {
                this.c2Arr = res.data;
                return "ok";
            } else {
                return Promise.reject(new Error("获取二级分类失败"));
            }
        },
        /**
       * 获取三级分类
       * @returns "ok"|Promise.reject()
       */
        async getC3() {
            const res: categoryResponseData = await reqC3(this.c2Id);
            if (res.code === 200) {
                this.c3Arr = res.data;
                return "ok";
            } else {
                return Promise.reject(new Error("获取二级分类失败"));
            }
        },
        

    },
    getters: {

    }
});

export default useCategoryStore;