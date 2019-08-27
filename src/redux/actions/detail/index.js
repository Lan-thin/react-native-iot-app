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
export {
    getPondInfo
}