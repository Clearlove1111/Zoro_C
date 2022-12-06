import axios, { HttpStatusCode } from "axios";

const http = axios.create(
    {
        //通用请求的地址前缀
        baseURL :'http://localhost:8088/',
        //baseURL :'http://47.101.132.16:8088/',
        //请求超时
        timeout :10000,
    }
)

export default http