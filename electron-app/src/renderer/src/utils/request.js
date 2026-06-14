// request.js 网络请求工具
import axios from "axios";
import { CustomError } from './CustomError.js';
// 后端接口服务地址
const API_URL="http://localhost:3000/api"

const service =axios.create({
    baseURL: API_URL,
    timeout:5000
})

/**
 * axios 响应拦截器
 */
service.interceptors.response.use(
    (response) => {
        const { code } = response.data
        if (code !== 0) {
            return Promise.reject(new CustomError({ networkResponse: response.data }))
        } else if (code == 401) {
            console.warn('Unauthorized,logging out...')
        }
        return response.data.data
    },
    (error) => {
        console.error('request error', error);
        return Promise.reject(new CustomError({ error: error }))
    }
)

export const request = service

/**
 * GET 请求
 * @param {*} url 请求地址，相对路径
 * @param {*} params  请求参数，可选
 * @returns 
 */
export const get = (url, params = {}) => {
    return service.get(url, { params })
}

/**
 * POST请求
 * @param {*} url 请求地址，相对路径
 * @param {*} data 请求参数，可选
 * @returns 
 */
export const post = (url, data = {}) => {
    return service.post(url, data)
}