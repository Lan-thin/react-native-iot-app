import {combineReducers} from 'redux'
import home from './home'
import detail from './detail'
// import common from './common'
const rootReducer = combineReducers({
    home,
    // common,
    detail
})

export default rootReducer