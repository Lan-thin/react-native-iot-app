/*
 * @Descripttion: 
 * @version: 
 * @Author: tao.pan
 * @Date: 2019-08-14 10:46:40
 */
import * as config from '../../config'
import ajax from './ajax'
import * as redux from '../../redux'

export default ()=> {
    global.$config = config
    global.$ajax = ajax
    global.$redux = redux
}