import * as types from '../../constants'

const initState = {
    loading: false 
}
export default function comon(state = initState, action) {
    switch (action.type) {
        case types.common.OPEN_LOADING: 
            return {
                ...state,
                loading: true
            }
            break;
        case types.common.CLOSE_LOADING: 
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}