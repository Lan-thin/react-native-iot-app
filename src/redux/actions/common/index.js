import * as types from '../../constants'


const openLoading = () => {
    dispatch({
        type: types.common.OPEN_LOADING
    })
}
const closeLoading = ()=> {
    dispatch({
        type: types.common.CLOSE_LOADING
    })
}

export {
    openLoading,
    closeLoading
}
