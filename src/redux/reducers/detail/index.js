import * as types from '../../constants'
const initState = {
    pondInfo: {},
    // 开关列表
    switchList: []
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
        item.switchList && item.switchList.map((sItem, sIndex) => {
            const {xline, yline, bindStatus} = sItem
            if (bindStatus) {
                let switchIndex = xline * 6 + yline
                switchList[switchIndex] = sItem
            }
            
        })
    })
    return switchList
}