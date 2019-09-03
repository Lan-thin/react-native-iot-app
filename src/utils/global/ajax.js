/*
 * @Descripttion: 
 * @version: 
 * @Author: tao.pan
 * @Date: 2019-08-14 17:50:58
 */
import axios from 'axios'
import {baseUrl, networkTimeout} from '../../config/appConfig'
import{
    Alert
} from 'react-native'
const server = axios.create({
    baseURL: baseUrl,
    timeout: networkTimeout || 15000
})
// 请求拦截
server.interceptors.request.use(config => { 
    // let m_userInfo = storage.get('m_userInfo')

    // if (m_userInfo) { 
    //     config.headers['access-token'] = m_userInfo.token
    // }
    // 暂时没做登录
    config.headers['x-access-token'] = 'D27FBDA3012F3B433F1A79D8E3738BDCAD2673276ECC15139621C3243E6B8B5A'
    return config
}, error => {
    return Promise.reject(error)
})
// 返回拦截
server.interceptors.response.use(response => {
    return response;
}, error => {
    return Promise.reject(error);
})
const ajax = (obj, callback) => {
    const {
        data,
        url,
        method,
        params,
        // headers,
        responseType
    } = obj;
    console.log(data)
    const ajaxParamsObj = {
        url,
        method: method || 'get',
        // headers,
        responseType: responseType || 'json'
    }
    
    data && (ajaxParamsObj.data = data)
    params && (ajaxParamsObj.params = params)
    console.log(ajaxParamsObj)
    server(ajaxParamsObj).then(rs => {
        const { code, message } = rs.data;
        console.log(rs)
        callback(rs.data);
        if (code != 1) {
            Alert.alert(message)
        }

    }).catch(err => {
        console.log(err)
        return;
    });
}




export default ajax

