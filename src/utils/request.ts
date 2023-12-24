import axios from "axios";
import { ElMessage } from "element-plus";

const request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 5000
});

request.interceptors.request.use(
    config => {
        // config.headers.Authorization=`Bear `;
        return config;
    },
    err => {
        console.log(err);
    }
);

request.interceptors.response.use(
    res => {
        
        return res.data;
    },
    err => {
        //处理网络错误
        let msg: string = '';
        let status: number = err.response.status;
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
        // ElMessage({
        //     message: '登陆失败',
        //     type: 'error',
        // });
        alert("失败")
        return Promise.reject(err);
    }
);

export default request;