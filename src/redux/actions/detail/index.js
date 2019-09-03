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
        console.log(poolId)
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
            method: 'PUT',
            data: {
                openStatus,
                timeUnix: 0
            }
        }, (res = {}) => {
            const { code, data } = res;
            let isSuccessParams = {
                openStatus
            }
            if(data) {
                const {requestKey, sumSwitches} = data
                requestKey && (isSuccessParams.requestKey = requestKey)
            }
            
            // 整个塘的 或者单个增氧机进行轮序
            // if(requestKey || switchId) {
                let time = 0
                // requestKey && (isSuccessParams.requestKey = requestKey)
                switchId && (isSuccessParams.switchId = switchId)
                actionSuccessTime = setInterval(()=>{
                    dispatch(isActionSuccess(isSuccessParams, poolId))
                }, 2000)
            // }
        })
    }
}

// 校验是否开启成功
const isActionSuccess = (isSuccessParams, poolId) => {
    return dispatch => {
        time += 2000
        const {switchId, requestKey, openStatus} = isSuccessParams
        global.$ajax({
            url: 'valid/switches/status',
            params: isSuccessParams
        }, (res = {})=> {
            const {success, checkedSwitches, sumSwitches} = res.data
            if(success) {
                dispatch(actionSuccessCallback(isSuccessParams.openStatus, poolId))
            } else {
                // 针对整个塘的
                if(!switchId){
                    checkedSwitches != currentOpenNumber &&(time = 0)     
                } 
                // 超出时间 即操作失败
                if(time >= global.$config.appConfig.networkTimeout){
                    // Alert('网络超时')
                    clearInterval(actionSuccessTime)
                    time = 0
                    initSelectSwitch()
                    initTimingSwitchInfo()
                }
            }
        })
    }
    
    
    
}
// 操作成功的回调
const actionSuccessCallback = (openStatus, poolId) => {
    return dispatch => {
        let toastText = openStatus ? '开启成功' : '关闭成功'
        dispatch(getPondInfo(poolId))
        // Alert(toastText)
        clearInterval(actionSuccessTime)
        // 初始化
        time = 0
        dispatch(initSelectSwitch())
        dispatch(initTimingSwitchInfo())
    }
    
}

export {
    getPondInfo,
    selectSwitch,
    initSelectSwitch,
    initTimingSwitchInfo,
    changeStatus
}