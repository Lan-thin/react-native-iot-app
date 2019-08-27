import React,{PureComponent} from 'react'
import {
    View,
    Text,
    Image,
    Animated,
    StyleSheet
} from 'react-native'
import * as $config from '../config'
export default class SwitchItem extends PureComponent{
    constructor(props){
        super(props)
        this.spinValue = new Animated.Value(0)
    }
    // 旋转动画
    spin = () => {
        const vm = this
        vm.spinValue.setValue(0)
        Animated.timing(vm.spinValue , {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear
        }).start((vm.spin()))
    }
    // 获取增氧机的图片和颜色
    getSwitchImage(warningLevel){
        let url = '../assert/images/icon_normal.png'
        let imageUrl = require('../assert/images/icon_normal.png')
        let color = $config.color.APP_MAIN_COLOR
        console.log(warningLevel)
        if(warningLevel) {
            if(warningLevel == 1 || warningLevel == 3) {
                url = '../assert/images/icon_disable.png'
                imageUrl = require('../assert/images/icon_disable.png')
                color = $config.color.SWITCH_DISABLE_COLOR
            } else {
                url = '../assert/images/icon_err.png'
                imageUrl = require('../assert/images/icon_err.png')
                color = $config.color.WARN_COLOR
            }
        }
        console.log(url)
        return {
            url: imageUrl,
            color
        }
    }
    render(){
        const vm = this
        const {item, type} = this.props
        console.log(item)
        const {warningLevel, open, id, switchName, latestCurrent} = item
        open && vm.spin()
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
          })
        return (
            <View style={[styles.switch, {height: type == 'detail' ? 70: 50}]}>
                {
                    !id ? (null) : 
                        <View>
                            <View style={styles.switchContent}>
                                <Animated.Image style={[styles.switchImage, {transform: [{rotate: spin}]}]} source={vm.getSwitchImage(warningLevel).url}/>
                                <Text style={[styles.switchName, {color: vm.getSwitchImage(warningLevel).color} ]}>{switchName}</Text>
                                </View>
                            <View style={styles.electric}>
                                <Text>{global.$utils.getOneDecimal(latestCurrent)}</Text>
                            </View>
                        </View>
                }
                
            </View>
        )
    }
}
const styles = StyleSheet.create({
    switch: {
        width: $config.fontSize.scaleSizeW(100),
        height: $config.fontSize.scaleSizeW(100),
        borderWidth: 1,
        borderColor: $config.color.WHITE_COLOR,
        position: 'relative',
        marginLeft: 10,
        marginBottom: 10
    },
    switchContent: {
        width: $config.fontSize.scaleSizeW(100),
        height: $config.fontSize.scaleSizeW(100),
        backgroundColor: $config.color.WHITE_COLOR,
        borderRadius: 25,
    },
    switchImage: {
        width: $config.fontSize.scaleSizeW(100),
        height: $config.fontSize.scaleSizeW(100),
        position: 'absolute'
    },
    switchName: {
        fontSize: 12,
        color: $config.color.APP_MAIN_COLOR,
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 10
    },
    electric: {
        width: $config.fontSize.scaleSizeW(100),
        height: $config.fontSize.scaleSizeW(100),
        borderColor: $config.color.ELECTRIC_BG_COLOR,
        borderRadius: 10,
        position: 'absolute',
        left: 0,
        bottom: 0,
        textAlign: 'center',
        lineHeight: 70,
        color: $config.color.TEXT_COLOR
    }
})