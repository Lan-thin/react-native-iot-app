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
    }
    render(){
        const {type} = this.props
        return (
            <View style={[styles.switch, {height: type == 'detail' ? 70: 50}]}>
                <View style={styles.switchContent}>
                    {/* <Animated.Image /> */}
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    switch: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: $config.color.WHITE_COLOR
    },
    switchContent: {
        width: 50,
        height: 50,
        backgroundColor: $config.color.WHITE_COLOR,
        borderRadius: 25,

    }
})