import React, {PureComponent} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Image,
    ScrollView
} from 'react-native'
import {
    connect
} from 'react-redux'
import * as $config from '../../../config'
import Pond from '../../../component/pond'
import { initTimingSwitchInfo } from '../../../redux/actions/detail';
import DeviceItem from '../../../component/deviceItem'
const {color, fontSize} = $config
class PondDetail extends PureComponent{
    constructor(props) {
        super(props)
        // 监听选择的增氧机
        global.$store.subscribe(()=> {
            console.log('store')
            console.log(global.$store.getState())
        })
    }
    componentDidMount(){
        const vm = this
        const {id} = this.props.navigation.state.params
        vm.props.getPondInfo(id)
    }
    _renderSwitchInfo(){
        const vm = this
        const {timingSwitchInfo} = vm.props
        const {switchName, warningLevel, deviceUniqueId, workType, switchTiming, status} = timingSwitchInfo

        return (
            <View style={styles.switchInfoContent}>
                <View style={styles.switchInfo}>
                    <Text style={styles.switchTitle}>增氧机{switchName}</Text>
                    <View style={styles.switchItem}>
                        <Text style={styles.itemLeft}>当前状态:</Text>
                        <Text style={styles.itemRight}>电流过载</Text>
                    </View>
                    <View style={styles.switchItem}>
                        <Text style={styles.itemLeft}>所属控制器:</Text>
                        <Text style={styles.itemRight}>编号{deviceUniqueId}</Text>
                    </View>
                    <View style={styles.switchItem}>
                        <Text style={styles.itemLeft}>接入类型:</Text>
                        <Text style={styles.itemRight}>{workType==1 ? '220': '380'}v</Text>
                    </View>
                    <View style={styles.timingItem}>
                        <Text style={styles.itemLeft}>当前定时:</Text>
                        <View style={styles.timingRight}>
                            {
                                (switchTiming && switchTiming.legth) ? (switchTiming.map((item,index) =>{
                                    <Text>{global.$utils.getTimingText(item.openTimeUnix, item.closeTimeUnix)}</Text>
                                })) : (<Text>无</Text>)
                            }
                        </View>
                    </View>
                    <View style={styles.action}>
                        {warningLevel ? (
                            <Text style={[styles.actionItem, warnItem]}>查看异常</Text>
                        ) :(null)}
                        <TouchableOpacity
                            style={[styles.actionItem, warningLevel ? styles.openWarnItem : styles.openNormalItem, ]}
                            onPress={this._changeStatus.bind(this)}>
                            <Text style={[styles.actionText, status!=0 ? styles.closeText : null]}>{status == 0 ? '立即开启': '立即关闭'}</Text>
                        </TouchableOpacity>
                        
                    </View>
                </View>
                <TouchableOpacity
                    onPress={this.props.initTimingSwitchInfo.bind(this)}>
                    <Image style={styles.closeInfo} source={require('../../../assert/images/icon_close.png')}/>  
                </TouchableOpacity>
            </View>
        )
    }
    _changeStatus(openStatus = 0){
        const vm = this
        const {timingSwitchInfo} = vm.props
        let params = {
            poolId: vm.props.navigation.state.params.id
        }
        // 开关增氧机
        if(timingSwitchInfo && timingSwitchInfo.id){
            const {id, status} = timingSwitchInfo
            params.switchId = id
            params.openStatus = status ? 0 : 1 
        } else {
            // 整个塘的开关
            params.openStatus = openStatus
            // params.poolId = vm.props.navigation.state.params.id
        }
        console.log(params)
        vm.props.changeStatus(params)
    }
    render(){
        const {pondInfo, selectSwitchInfo, timingSwitchInfo} = this.props
        const {deviceList, name} = pondInfo
        const {warningLevel} = selectSwitchInfo
        console.log(deviceList)
        return(
            <View style={styles.page}>
                <ScrollView>
                    <View style={styles.title}>
                        <Text>{name}</Text>
                    </View>
                    <Pond type="detail"/>
                    {deviceList && deviceList.length && deviceList.map((item, index)=> {
                        return (
                            <DeviceItem item={item} key={index}></DeviceItem>
                        )
                    })}
                </ScrollView>
                { timingSwitchInfo && timingSwitchInfo.id && this._renderSwitchInfo()}
                
                <View style={styles.pageBottom}>
                    
                    <Text style={[styles.bottomItem]} onPress={this._changeStatus.bind(this, 0)}>全部关闭</Text>
                    <Text style={[styles.bottomItem, styles.openItem]} onPress={this._changeStatus.bind(this, 1)}>全部开启</Text>
                </View>
            </View>
        )
    }
}
const mapStateToProps = (state)=> {
    return {
        pondInfo: state.detail.pondInfo,
        selectSwitchInfo: state.detail.selectSwitchItem,
        timingSwitchInfo: state.detail.timingSwitchInfo
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        // 获取池塘信息
        getPondInfo: (poolId)=> {
            dispatch(global.$redux.actions.detail.getPondInfo(poolId))
        },
        // 初始化增氧机信息
        initTimingSwitchInfo: ()=> {
            dispatch(global.$redux.actions.detail.initSelectSwitch())
            dispatch(global.$redux.actions.detail.initTimingSwitchInfo())
        },
        // 开启？关闭增氧机
        changeStatus: (params)=>{
            dispatch(global.$redux.actions.detail.changeStatus(params))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PondDetail)

const styles = StyleSheet.create({
    page: {
        position: 'relative',
        width: '100%',
        height: '100%',
        flexDirection: "column",
        backgroundColor: $config.color.PAGE_BG_COLOR,
    },
    title: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: $config.color.WHITE_COLOR
        
    },
    switchInfoContent: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        flexDirection: 'column',
        alignItems: "center",
        paddingTop: fontSize.scaleSizeW(342),
    },
    switchInfo: {
        width: fontSize.scaleSizeW(640),
        // height: fontSize.scaleSizeW(650),
        backgroundColor: color.WHITE_COLOR,
        borderRadius: fontSize.scaleSizeW(20),
        paddingHorizontal: fontSize.scaleSizeW(40),
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: fontSize.scaleSizeW(30),
        paddingBottom: fontSize.scaleSizeW(50)
    },
    closeInfo: {
        width: fontSize.scaleSizeW(100),
        height: fontSize.scaleSizeW(100),
        marginTop: fontSize.scaleSizeW(50)
    },
    switchTitle:{
        fontSize: fontSize.scaleSizeW(40),
        color: $config.color.TEXT_COLOR
    },
    switchItem: {
        width: '100%',
        height: fontSize.scaleSizeW(48),
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: fontSize.scaleSizeW(10)
    },
    itemLeft: {
        fontWeight: 'bold',
        fontSize: fontSize.scaleSizeW(34),
        width: fontSize.scaleSizeW(210),
        height: fontSize.scaleSizeW(48)
    },
    itemRight: {
        fontSize: fontSize.scaleSizeW(34),
        height: fontSize.scaleSizeW(48)
    },
    action: {
        width: fontSize.scaleSizeW(560),
        height: fontSize.scaleSizeW(100),
        textAlign: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    actionItem: {
        width: fontSize.scaleSizeW(260),
        height: fontSize.scaleSizeW(100),
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: fontSize.scaleSizeW(36),
        // backgroundColor: '#f00',
        lineHeight: fontSize.scaleSizeW(100),
        borderRadius: fontSize.scaleSizeW(90),
    },
    timingItem: {
        width: '100%',
        height: fontSize.scaleSizeW(48),
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: fontSize.scaleSizeW(50)
    },
    timingRight: {
        flexDirection: 'column',
        fontSize: fontSize.scaleSizeW(34),

    },
    warnItem:{
        backgroundColor: $config.color.WARN_COLOR,
        color: $config.color.WHITE_COLOR
    },
    openWarnItem:{
        backgroundColor: $config.color.WHITE_COLOR,
        color: $config.color.WARN_COLOR,
        borderWidth: fontSize.scaleSizeW(4),
        borderColor:$config.color.WARN_COLOR
    },
    openNormalItem: {
        width: '100%',
        borderWidth: fontSize.scaleSizeW(4),
        borderColor: $config.color.APP_MAIN_COLOR
    },
    closeNormalItem: {
        borderWidth: fontSize.scaleSizeW(4),
        borderColor: $config.color.APP_MAIN_COLOR
    },
    actionText: {
        width: '100%',
        height: fontSize.scaleSizeW(100),
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: fontSize.scaleSizeW(36),
        color: $config.color.APP_MAIN_COLOR,
        lineHeight: fontSize.scaleSizeW(100),
    },
    closeText: {
        color: $config.color.YELLOW_COLOR
    },
    pageBottom: {
        width: '100%',
        height: 60,
        position: 'absolute',
        left: 0,
        bottom: 0,
        flexDirection: 'row'
    },
    bottomItem: {
        width: '36%',
        height: 60,
        lineHeight: 60,
        backgroundColor: $config.color.WHITE_COLOR,
        color: $config.color.APP_MAIN_COLOR,
        textAlign: 'center',
    },
    openItem: {
        width: '64%',
        backgroundColor: $config.color.APP_MAIN_COLOR,
        color: $config.color.WHITE_COLOR,
    }
})
