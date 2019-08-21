/*
 * @Descripttion: 
 * @version: 
 * @Author: tao.pan
 * @Date: 2019-08-13 17:54:42
 */
import React, {PureComponent} from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'

import PondItem from '../../../component/pondItem'
import * as $config from '../../../config'
class PondList extends PureComponent{
    constructor(props){
        super(props)
    }
    componentWillMount(){
        console.log(global.$config)
    }
    render(){
        return (
            <View style={styles.page}>
                <PondItem />
            </View>
        )
    }
}

export default PondList

const styles = StyleSheet.create({
    page: {
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: $config.color.PAGE_BG_COLOR

    }
})