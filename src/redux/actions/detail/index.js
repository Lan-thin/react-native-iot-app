import * as types from '../../constants'
import {Alert} from 'react-native'
// 轮序的时间
let time = 0
// 定时器
let actionSuccessTime = null
let currentOpenNumber = 0
const getPondInfo = (poolId)=> {
    return dispatch => {
        dispatch({
            type: types.common.OPEN_LOADING
        })
        global.$ajax({
            url: `pools/${poolId}`,
            // data: params.data
        }, (res = {}) => {
            const { code, data } = res;
            dispatch({
                type: types.detail.GET_POND_INFO,
                data
            })
            dispatch({
                type: types.common.CLOSE_LOADING
            })
        })
    }
}
// 选择增氧机
const selectSwitch = (item) => {
    return dispatch => {
        dispatch({
            type: types.detail.SELECT_SWITCH_ITEM,
            item
        })
        const {warningLevel, id} = item
        // 如果不是失联就获取单个增氧机的信息
        if(!global.$utils.isUnConnect(warningLevel)) {
            dispatch({
                type: types.common.OPEN_LOADING
            })
            global.$ajax({
                url: `switch/${id}/timings`,
            },(res = {}) => {
                const {code, data} = res
                console.log(res)
                dispatch({
                    type: types.detail.GET_TIMING_SWITCH_INFO,
                    data
                })
                dispatch({
                    type: types.common.CLOSE_LOADING
                })
            })
        }
    }
} 
// 初始化选择的增氧机信息
const initSelectSwitch = () => {
    return dispatch => {
        dispatch({
            type: types.detail.INIT_SELECT_SWITCH
        })
    }
}
const initTimingSwitchInfo = () => {
    return dispatch => {
        dispatch({
            type: types.detail.INIT_TIMING_SWITCH_INFO
        })
    }
}
const changeStatus = (params) => {
    return dispatch => {
        dispatch({
            type: types.common.OPEN_LOADING
        })
        const {switchId, poolId, openStatus} = params
        global.$ajax({
            url: switchId ? `switch/${switchId}` : `pools/${poolId}/status`,
            data: {
                openStatus,
            }
        }, (res = {}) => {
            const { code, data } = res;
            const {requestKey, sumSwitches} = data
            // 整个塘的 或者单个增氧机进行轮序
            if(requestKey || switchId) {
                let time = 0
                let isSuccessParams = {
                    openStatus
                }
                requestKey && (isSuccessParams.requestKey = requestKey)
                switchId && (isActionSuccess.switchId = switchId)
                actionSuccessTime = setInterval(()=>{
                    isActionSuccess(isSuccessParams)
                }, 2000)
            }
        })
    }
}

// 校验是否开启成功
const isActionSuccess = (isSuccessParams) => {
    time += 2000
    const {switchId, requestKey, openStatus} = isSuccessParams
    global.$ajax({
        url: 'valid/switches/status',
        data: isSuccessParams
    }, (res = {})=> {
        const {success, checkedSwitches, sumSwitches} = res
        if(success) {
            actionSuccessCallback(isSuccessParams.openStatus)
        } else {
            // 针对整个塘的
            if(!switchId){
                checkedSwitches != currentOpenNumber &&(time = 0)
                // 超出时间 即操作失败
                if(time >= global.$config.appConfig.networkTimeout){
                    Alert('网络超时')
                    clearInterval(actionSuccessTime)
                    time = 0
                    initSelectSwitch()
                    initTimingSwitchInfo()
                }
            }
        }
    })
}
// 操作成功的回调
const actionSuccessCallback = (openStatus) => {
    let toastText = openStatus ? '开启成功' : '关闭成功'
    getPondInfo()
    Alert(toastText)
    clearInterval(actionSuccessTime)
    // 初始化
    time = 0
    initSelectSwitch()
    initTimingSwitchInfo()
}

export {
    getPondInfo,
    selectSwitch,
    initSelectSwitch,
    initTimingSwitchInfo,
    changeStatus
}