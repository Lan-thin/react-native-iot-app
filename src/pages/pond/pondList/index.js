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
    StyleSheet,
    FlatList
} from 'react-native'

import PondItem from '../../../component/pondItem'
import * as $config from '../../../config'
import {connect} from 'react-redux'
class PondList extends PureComponent{
    constructor(props){
        super(props)
    }
    componentWillMount(){
        const vm = this
        vm.props.getPoolList()
    }
    render(){
        const {userPondInfo, navigation} = this.props
        // console.log(this.props)
        return (
            <View style={styles.page}>
                {
                    (userPondInfo && userPondInfo.userPoolList&& userPondInfo.userPoolList.length) && userPondInfo.userPoolList.map((item, index) => {
                        return (
                            <PondItem item={item} key={index} nav={navigation.navigate}></PondItem>
                        )
                    })
                }
                
            </View>
        )
    }
    _renderItem(item) {
        return (<PondItem item={item} />)
    }
}
const mapStatToProps = (state) => {
    return {
        userPondInfo: state.home.userPondInfo
    }
    
}
const mapDispatchToProps = (dispatch) => {
    return {
        getPoolList: () => {
            dispatch(global.$redux.actions.home.getPondList())  
        }
    }
    
}
export default connect(mapStatToProps, mapDispatchToProps)(PondList)

const styles = StyleSheet.create({
    page: {
        position: 'relative',
        width: '100%',
        height: '100%',
        flexDirection: "column",
        backgroundColor: $config.color.PAGE_BG_COLOR,
        

    }
})