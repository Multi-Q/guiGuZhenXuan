import axios from "axios";
import useUserStore from "@/stores/modules/user";

const request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 5000
});

request.interceptors.request.use(
    config => {
        const userStore = useUserStore();
        if (userStore.token) {
            config.headers.token = userStore.token;
        }
        return config;
    }
);

request.interceptors.response.use(
    res => {

        return res.data;
    },
    err => {
        //处理网络错误
        let msg: string = '';
        let status: number = err?.response?.status||0 ;
        switch (status) {
            case 401:
                msg = "token过期";
                break;
            case 403:
                msg = '无权访问';
                break;
            case 404:
                msg = "请求地址错误";
                break;
            case 500:
                msg = "服务器出现问题";
                break;
            default:
                msg = "无网络";
        }
        ElMessage({ message: err?.message || "出现错误-utils/request", type: 'error', });
        return Promise.reject(err);
    }
);

export default request;