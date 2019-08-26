import * as types from '../../constants'

const getPondInfo = (poolId)=> {
    
    return dispatch => {
        global.$ajax({
            url: `pools/${poolId}`,
            // data: params.data
        }, (res = {}) => {
            const { code, data } = res;
            dispatch({
                type: types.detail.GET_POND_INFO,
                data
            })
        })
    }
}
export {
    getPondInfo
}