import * as types from '../../constants'

const getPondList = (params = {})=> {
    
    return dispatch => {
        global.$ajax({
            url: 'pools',
            // data: params.data
        }, (res = {}) => {
            const { code, data } = res;
            dispatch({
                type: types.home.GET_POND_LIST,
                data
            })
        })
    }
}
export {
    getPondList
}