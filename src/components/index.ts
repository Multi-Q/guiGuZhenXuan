import SvgIconVue from "./SvgIcon.vue";
import Pagination from "./Pagination.vue";

const allGlobalComponent = { SvgIconVue, Pagination };

export default {
    //@ts-ignore
    install(app) {
        Object.keys(allGlobalComponent).forEach(key => {
            //@ts-ignore
            app.component(key, allGlobalComponent[key]);
        })
    }
}