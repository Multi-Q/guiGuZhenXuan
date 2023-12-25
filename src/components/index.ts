import SvgIconVue from "./SvgIcon.vue";
import Pagination from "./Pagination.vue";

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const allGlobalComponent = { SvgIconVue, Pagination };

export default {
    //@ts-ignore
    install(app) {
        Object.keys(allGlobalComponent).forEach(key => {
            //@ts-ignore
            app.component(key, allGlobalComponent[key]);
        });
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
          }
    }
}