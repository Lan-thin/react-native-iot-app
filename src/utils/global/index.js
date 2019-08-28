/*
 * @Descripttion: 
 * @version: 
 * @Author: tao.pan
 * @Date: 2019-08-14 10:46:40
 */
import * as config from '../../config'
import ajax from './ajax'
import * as redux from '../../redux'
import * as filter from './filter'
const store = redux.store()

export default ()=> {
    global.$config = config
    global.$ajax = ajax
    global.$redux = redux
    // 不可使用$filter
    global.$utils = filter
    global.$store = store
}