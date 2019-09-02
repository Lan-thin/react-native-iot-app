import React,{PureComponent} from 'react'
import {
    View,
    Text,
    Image,
    Animated,
    StyleSheet,
    Easing
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
            duration: 2000,
            // easing: Easing.linear
        }).start(()=>{vm.spin()})
    }
    componentDidMount(){
        // this.spin()
    }
    // 获取增氧机的图片和颜色
    getSwitchImage(warningLevel){
        let url = '../assert/images/icon_normal.png'
        let imageUrl = require('../assert/images/icon_normal.png')
        let color = $config.color.APP_MAIN_COLOR
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
        return {
            url: imageUrl,
            color
        }
    }
    render(){
        const vm = this
        const {item, type} = this.props
        const {warningLevel, open, id, switchName, latestCurrent} = item
        open && vm.spin()
        // vm.spin()
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
          })
        return (
            <View style={[styles.switch, {height: type == 'detail' ? $config.fontSize.scaleSizeW(140): $config.fontSize.scaleSizeW(50)}]}>
                {
                    !id ? (null) : 
                    // 如果不给宽高 不会继承父级的宽高
                        <View style={ {width: $config.fontSize.scaleSizeW(100),height: type == 'detail' ? $config.fontSize.scaleSizeW(140): $config.fontSize.scaleSizeW(50)}}>
                            <View style={styles.switchContent}>
                                <Animated.Image style={[styles.switchImage, {transform: [{rotate: spin}]}]} source={vm.getSwitchImage(warningLevel).url}/>
                                <Text style={[styles.switchName, {color: vm.getSwitchImage(warningLevel).color} ]}>{switchName}</Text>
                            </View>
                            <View style={styles.electric}>
                                <Text style={styles.electricText}>{global.$utils.getOneDecimal(latestCurrent)}</Text>
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
        position: 'relative',
        marginLeft: $config.fontSize.scaleSizeW(20),
        marginBottom: $config.fontSize.scaleSizeW(20)
    },
    switchContent: {
        width: $config.fontSize.scaleSizeW(100),
        height: $config.fontSize.scaleSizeW(100),
        backgroundColor: $config.color.WHITE_COLOR,
        borderRadius: $config.fontSize.scaleSizeW(50),
        zIndex: 20
    },
    switchImage: {
        width: $config.fontSize.scaleSizeW(100),
        height: $config.fontSize.scaleSizeW(100),
        position: 'absolute',
        zIndex: 10
    },
    switchName: {
        fontSize: $config.fontSize.scaleSizeW(24),
        color: $config.color.APP_MAIN_COLOR,
        position: 'absolute',
        top: $config.fontSize.scaleSizeW(32),
        left: $config.fontSize.scaleSizeW(35),
        zIndex: 10,
        fontWeight: 'bold'
    },
    electric: {
        width: $config.fontSize.scaleSizeW(100),
        height: $config.fontSize.scaleSizeW(100),
        // backgroundColor: '#f00',
        backgroundColor: $config.color.ELECTRIC_BG_COLOR,
        borderRadius: 10,
        position: 'absolute',
        left: 0,
        bottom: 0,
        textAlign: 'center',
        color: $config.color.TEXT_COLOR
    },
    electricText:{
        textAlign: 'center',
        paddingTop:  $config.fontSize.scaleSizeW(60)
    }
})