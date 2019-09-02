import React, {PureComponent} from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity

} from 'react-native'
import {connect} from 'react-redux'
import * as $config from '../config'
import SwitchItem from './switchItem'

const {width, height} = Dimensions.get('window')

class Pond extends PureComponent{
    constructor(props){
        super(props)
        // 监听选择增氧机

    }
    componentDidMount(){
    }
    
    render(){
        const vm = this
        const {switchList, type, selectSwitch} = vm.props
        return(
            <View style={[styles.pond, {height: $config.fontSize.scaleSizeW(690)}]}>
                {
                    switchList.map((item, index) => {
                        return (
                            <TouchableOpacity 
                                onPress={selectSwitch.bind(this, item)}
                                key= {index}
                                >
                                <SwitchItem item={item} key={index} type={type}/>
                            </TouchableOpacity>
                            
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
        selectSwitch: (switchInfo)=> {
            const {id} = switchInfo
            if(!id){
                return
            }
            dispatch(global.$redux.actions.detail.selectSwitch(switchInfo))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Pond)
const styles = StyleSheet.create({
    pond: {
        width: '100%',
        // height: 345,
        backgroundColor: $config.color.POND_BG_COLOR,
        // flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        paddingVertical: 12,
        paddingTop: 20,
        paddingBottom: 10,

    }
})