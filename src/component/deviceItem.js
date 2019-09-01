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
    render(){
        let sigalArr = []
        for(let i = 0; i < 4; i++) {
            sigalArr.push(<View style={[styles.sigalItem]}></View>)             
        }
        const {deviceNum,uniqueId, switchList} = this.props.item
        let deviceNumber = switchList.filter((item,index) => {
            return item.bindStatus == 1
        })
        return (
            <View style={styles.deviceItem}>
                <View style={styles.left}>
                    <View style={styles.sigal}>
                        {sigalArr}
                    </View>
                    <View style={styles.deviceInfo}>
                        <Text>控制器<Text style={{color: $config.color.APP_MAIN_COLOR}}>{deviceNum}</Text>{uniqueId}</Text>
                        <Text>{deviceNumber}台增氧机</Text>
                    </View>

                </View>
                <View style={styles.right}>
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
        
        height: '100%',
        alignItems: 'center'
    },
    sigal: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    sigalItem: {
        width: 3,
        height: 14,
        backgroundColor: '#D8D8D8',
        borderRadius: 15,
        marginLeft: 2,
    },
    deviceInfo: {
        flexDirection: 'column',
        marginLeft: 15,
    }
})