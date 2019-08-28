import * as types from '../../constants'

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
        if(global.$utils.isUnConnect(warningLevel)) {
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

export {
    getPondInfo,
    selectSwitch,
    initSelectSwitch,
    initTimingSwitchInfo
}