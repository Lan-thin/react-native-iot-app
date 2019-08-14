/*
 * @Descripttion: 
 * @version: 
 * @Author: tao.pan
 * @Date: 2019-08-14 17:50:58
 */
import axios from 'axios'
import {baseUrl, networkTimeout} from '../../config'
const ajax = axios.create({
    baseURL: baseUrl,
    timeout: networkTimeout || 15000
})

ajax.interceptors.request.use(config => { 
    // let m_userInfo = storage.get('m_userInfo')

    // if (m_userInfo) { 
    //     config.headers['access-token'] = m_userInfo.token
    // }
    return config
}, error => {
    return Promise.reject(error)
})
export default ajax

