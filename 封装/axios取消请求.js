import axios from 'axios'
import qs from 'qs'
const codeMessage = {
    400: '请求错误',
    401: '用户没有权限。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求是不存在的记录',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除',
    422: '验证错误',
    500: '服务器发生错误',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。'
}
const pending = new Map()

const request = axios.create({
    baseURL: '',
    withCredentials: true,
    timeout: 15000
})

/**
 * 添加请求
 *  */
const addPending = (config) => {
    const url = [config.method, config.url, qs.stringify(config.params), qs.stringify(config.data)].join('&');
    config.cancelToken = config.cancelToken || new axios.CancelToken(cancel => {
        if (!pending.has(url)) {
            pending.set(url, cancel);
        }
    })
}

/**
 * 移除请求
 *  */
const removePending = (config) => {
    const url = [config.method, config.url, qs.stringify(config.params), qs.stringify(config.data)].join('&');
    if (pending.has(url)) {
        // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
        const cancel = pending.get(url);
        cancel(url);
        pending.delete(url);
    }
}

/**
 * 清空请求（在路由跳转时清空请求）
 */
export const clearPending = () => {
    for (const [url, cancel] of pending) {
        cancel(url);
    }
    pending.clear();
}

request.interceptors.request.use(config => {
    // 请求开始之前，对之前的请求做检查取消操作
    removePending(config);
    // 将当前请求添加到 pending 中
    addPending(config);
    return config;
}, error => {
    return Promise.resolve(error || '服务器异常');
})

request.interceptors.response.use(response => {
    // 如果存在就移除为得到响应的请求
    removePending(response);
    // 其他处理
    return response.data;
}, error => {
    // 其他处理
    return Promise.reject(error);
})

export default request;

