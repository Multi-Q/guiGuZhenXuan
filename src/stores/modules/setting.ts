// layout组件的小仓库
import { defineStore } from "pinia";

 const useLayoutSettingStore = defineStore("setting", {
    state: () => {
        return {
            fold:false as boolean,
            refresh:false as boolean,
            
        };
    }

});

export default useLayoutSettingStore;