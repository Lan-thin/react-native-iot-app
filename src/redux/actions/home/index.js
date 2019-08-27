import * as types from '../../constants'

const getPondList = (params = {})=> {
    
    return dispatch => {
        dispatch({
            type: types.common.OPEN_LOADING
        })
        global.$ajax({
            url: 'pools',
            // data: params.data
        }, (res = {}) => {
            const { code, data } = res;
            dispatch({
                type: types.home.GET_POND_LIST,
                data
            })
            dispatch({
                type: types.common.CLOSE_LOADING
            })
        })
    }
}
export {
    getPondList
}