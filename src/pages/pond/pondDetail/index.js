import React, {PureComponent} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Image
} from 'react-native'
import {
    connect
} from 'react-redux'
import * as $config from '../../../config'
import Pond from '../../../component/pond'
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
        const {switchName, warningLevel, deviceUniqueId, workType, switchTiming} = timingSwitchInfo

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
                        <Text style={[styles.actionItem, warningLevel ? styles.openWarnItem : styles.openNormalItem]}>立即开启</Text>
                    </View>
                </View>
                <Image style={styles.closeInfo} source={require('../../../assert/images/icon_close.png')}/>  

            </View>
        )
    }
    render(){
        const {deviceList, name} = this.props.pondInfo
        const {warningLevel} = this.props.selectSwitchInfo
        // console.log(this.props.selectSwitchInfo)
        return(
            <View style={styles.page}>
                {/* <View></View> */}
                <Pond type="detail"/>
                { this._renderSwitchInfo()}
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
        getPondInfo: (poolId)=> {
            dispatch(global.$redux.actions.detail.getPondInfo(poolId))
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
    }
})
