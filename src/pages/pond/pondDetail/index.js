import React, {PureComponent} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import {
    connect
} from 'react-redux'
import * as $config from '../../../config'
import Pond from '../../../component/pond'

class pondDetail extends PureComponent{
    constructor(props) {
        super(props)
        // 监听选择的增氧机
        const store = global.$redux.store()
        console.log(store)
        store.subscribe(()=> {
            console.log('store')
            console.log(store.getState())
        })
    }
    componentDidMount(){
        const vm = this
        const {id} = this.props.navigation.state.params
        vm.props.getPondInfo(id)
    }
    render(){
        const {deviceList, name} = this.props.pondInfo
        // console.log(this.props.selectSwitchInfo)
        return(
            <View style={styles.page}>
                <Pond type="detail"/>
            </View>
        )
    }
}
const mapStateToProps = (state)=> {
    return {
        pondInfo: state.detail.pondInfo,
        selectSwitchInfo: state.detail.selectSwitchItem
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getPondInfo: (poolId)=> {
            dispatch(global.$redux.actions.detail.getPondInfo(poolId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(pondDetail)

const styles = StyleSheet.create({
    page: {
        position: 'relative',
        width: '100%',
        height: '100%',
        flexDirection: "column",
        backgroundColor: $config.color.PAGE_BG_COLOR,
    }
})
