/*
 * @Descripttion: 
 * @version: 
 * @Author: tao.pan
 * @Date: 2019-08-14 17:54:38
 */

 export const baseUrl = global.__DEV__ ? 'https://mp.yudada.com/iot/': 'https://mp.iot.yudada.com/'
//  网络等待时长
 export const networkTimeout = 30000
//  默认缓存时长
 export const defaultExpires = 1000 * 3600 * 24 * 7;

 export const sessionKey = {
    userInfo: 'userInfo'
 }