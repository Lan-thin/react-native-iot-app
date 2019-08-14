/*
 * @Descripttion: 
 * @version: 
 * @Author: tao.pan
 * @Date: 2019-08-14 18:19:42
 */
import Storage from 'react-native-storage'
import {AsyncStorage} from 'react-native'
import {appConfig} from '../../config'

const storage = new Storage({
    size: 1000,

    storageBackend: AsyncStorage,

    defaultExpires: appConfig.defaultExpires || 1000*3600*24,

    enableCache: true
})

const localStorage = {
    /** *
    *  @param {Object} obj
    *  @param {string} obj.key
    *  @param {any} obj.value
    *  @param {number} obj.expires
    */
    set(obj){
        
    }
}