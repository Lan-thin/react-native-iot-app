import * as types from '../../constants'
const initState = {
    pondInfo: {},
    // 开关列表
    switchList: [],
    // 选择的增氧机
    selectSwitchItem: {},
    // 增氧机定时的信息
    timingSwitchInfo: {}
}
export default function detail(state = initState, action) {
    switch (action.type) {
        case types.detail.GET_POND_INFO: 
            return {
                ...state,
                pondInfo: action.data,
                switchList: getSwitchList(action.data.deviceList)
            }
            break;
        case types.detail.SELECT_SWITCH_ITEM:
            return {
                ...state,
                selectSwitchItem: action.item
            }
            break
        case types.detail.INIT_SELECT_SWITCH: 
            return {
                ...state,
                selectSwitchItem: {}
            }
            break;
        case types.detail.GET_TIMING_SWITCH_INFO: 
            return {
                ...state,
                timingSwitchInfo: action.data
            }
            break;
        case types.detail.INIT_TIMING_SWITCH_INFO:
            return {
                ...state,
                timingSwitchInfo: {}
            }
            break;
        default:
            return state
    }
}

// 获取池塘内24格内的增氧机
const getSwitchList = (deviceList) => {
    let switchList = []
    for(let i = 0; i < 24; i++){
        switchList.push({
            xline: Math.floor(i / 6),
            yline: i % 6
        })
    }
    deviceList && deviceList.length && deviceList.map((item,index) => {
        const {warningLevel} = item
        item.switchList && item.switchList.map((sItem, sIndex) => {
            const {xline, yline, bindStatus} = sItem
            if (bindStatus) {
                // 如果是控制器异常了将控制器的异常传给增氧机
                if(global.$utils.isDeviceWarn(warningLevel)) {
                    sItem.warningLevel = warningLevel
                }
                let switchIndex = xline * 6 + yline
                switchList[switchIndex] = sItem
            }
            
        })
    })
    return switchList
}