import React,{PureComponent} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native'
import * as $config from '../config'
export default class DeviceItem extends PureComponent{
    constructor(props) {
        super(props)
    }
    _renderSigal(){
        const vm = this
        const {signalStrength} = this.props.item
        let sigalArr = []
        // 每个信号的高度
        let height = 14
        let sigal = global.$utils.getSignal(signalStrength)
        // 每个信号的颜色
        let color = $config.color.SIGAL_COLOR
        sigal == 1 && (color = $config.color.WARN_COLOR)
        sigal == 2 && (color = $config.color.YELLOW_COLOR)
        sigal >= 3 && (color = $config.color.MAIN_COLOR)
        for(let i = 0; i < 4; i++) {
            i == 0 && (height = 8)
            i == 1 && (height = 10)
            i == 2 && (height = 12)
            sigalArr.push(<View style={[styles.sigalItem, {height, color: sigal <=i ? color: null}]}></View>)             
        }
        return sigalArr
    }
    render(){
        
        const vm = this
        const {deviceNum,uniqueId, switchList} = this.props.item
        let deviceNumber = switchList.filter((item,index) => {
            return item.bindStatus == 1
        })
        return (
            <View style={styles.deviceItem}>
                <View style={styles.left}>
                    <View style={styles.sigal}>
                        {vm._renderSigal()}
                    </View>
                    <View style={styles.deviceInfo}>
                        <Text>控制器<Text style={{color: $config.color.APP_MAIN_COLOR}}>{deviceNum}</Text>{uniqueId}</Text>
                        <Text>{deviceNumber.length}台增氧机</Text>
                    </View>
                </View>
                <View style={styles.right}>
                    <Image source={require("../assert/images/right.png")} style={styles.icon_Right}></Image>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    deviceItem: {
        width: '100%',
        height: 80,
        backgroundColor: $config.color.WHITE_COLOR,
        alignItems: 'center',
        paddingHorizontal: 15,
        justifyContent: 'space-between'
    },
    left: {
        flexDirection: 'row',
        height: '100%',
        alignItems: 'center'
    },
    sigal: {
        flexDirection: 'row',
        alignItems: "flex-end"
    },
    sigalItem: {
        width: 3,
        height: 14,
        backgroundColor: $config.color.SIGAL_COLOR,
        borderRadius: 15,
        marginLeft: 2,
    },
    deviceInfo: {
        flexDirection: 'column',
        marginLeft: 15,
    },
    right: {
        alignItems: 'center'
    },
    icon_Right: {
        width: 12,
        height: 12
    }
})