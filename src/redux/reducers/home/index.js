import * as types from '../../constants'
const initState = {
    userPondInfo: {}
}
export default function home(state = initState, action) {
    switch (action.type) {
        case types.home.GET_POND_LIST: 
            return {
                ...state,
                userPondInfo: action.data
            }
            break;
        default:
            return state
    }
}