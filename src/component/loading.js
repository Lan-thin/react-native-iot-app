import React, {PureComponent} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ActivityIndicator
} from 'react-native'

const {width, height} = Dimensions.get('window')
import * as $config from '../config'
import {connect} from 'react-redux'
class Loading extends PureComponent {
    constructor(props) {
        super(props)
    }
    render(){
        const vm = this
        const {loading} = vm.props
        if (loading) {
            return (
                <View style={styles.loadingPage}>
                    <View style={styles.loadingContent}>
                        <ActivityIndicator size="large" color={$config.color.WHITE_COLOR}/>
                        <Text style={styles.loadingText}>加载中...</Text>
                    </View>
                </View>
            )
        } else {
            return (<View />)
        }
        
    }
}
const mapStateToProps = (state) => {
    console.log(state)
    return {
        loading: state.common.loading
    }
}
mapDispatchToProps = (dispatch) => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Loading)
const styles = StyleSheet.create({
    loadingPage: {
        width,
        height,
        position: 'absolute',
        left: 0,
        top: 0
    },
    loadingContent: {
        width: 160,
        height: 100,
        position: 'absolute',
        top: (height - 100)/2 - 50,
        left: width/2 - 80,
        backgroundColor: 'rgba(31,31,31,0.45)',
        color: $config.color.WHITE_COLOR,
        borderRadius: 7,
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        paddingVertical: 10
    },
    loadingText:{
        color: $config.color.WHITE_COLOR,
        marginTop: 10
    }
})