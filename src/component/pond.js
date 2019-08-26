import React, {PureComponent} from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions

} from 'react-native'
import {connect} from 'react-redux'
import * as $config from '../config'
import SwitchItem from './switchItem'

const {width, height} = Dimensions.get('window')

class Pond extends PureComponent{
    constructor(props){
        super(props)

    }
    
    render(){
        const vm = this
        const {switchList, type} = vm.props

        return(
            <View style={styles.pond}>
               {
                    switchList && switchList.length && switchList.map((item, index) => {
                        return (
                            <SwitchItem item={item} key={index} type={type}></SwitchItem>
                        )
                    })

                }
            </View>
        )
    }
}
const mapStateToProps = (state)=> {
    return {
        switchList: state.detail.switchList
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Pond)
const styles = StyleSheet.create({
    pond: {
        width: '100%',
        height: 345,
        backgroundColor: $config.color.POND_BG_COLOR,
        // flex: 1,
        flexWrap: 'wrap',
        paddingVertical: 12,
        paddingTop: 20,
        paddingBottom: 10,
        justifyContent: 'space-between',
        

    }
})