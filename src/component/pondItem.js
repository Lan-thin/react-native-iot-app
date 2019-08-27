import React, {PureComponent} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image
} from 'react-native';
const {width, height} = Dimensions.get('window');
import * as $config from '../config'
export default class PondItem extends PureComponent{
    constructor(props) {
        super(props)
    }
    clickItem() {
        const { item, nav} = this.props

        // this.props.navigation.navigate('D', {key: params.key})
        nav('PondDetail', { id: item.id });
    }
    render(){
        const {activitySwitchCount, fishTypeName, id, name, warningLevel} = this.props.item
        let imageUrl = warningLevel ? require('../assert/images/pool_icon_warn.png') : require('../assert/images/home_active.png')

        let statusText = warningLevel ? '有异常' : activitySwitchCount ? '增氧中' : '空闲中'
        let activeText = activitySwitchCount ? `${activitySwitchCount}台增氧机开启中` : `无运行中的增氧机`
        return (
            <TouchableOpacity
                onPress={this.clickItem.bind(this)}>
                <View style={styles.pondContent}>
                    <View style={styles.pond}>
                        <View style={styles.itemLine}>
                            <View style={styles.item}>
                                <Image style={styles.pondImage} source={imageUrl}></Image>
                                <Text style={styles.pondName}>{name}</Text>
                            </View>
                            <View style={[styles.item]}>
                                <View style={[styles.pondRadius, warningLevel ? styles.warn: '']}></View>
                                <Text style={[styles.statusText, warningLevel ? styles.warnText: '']}>{statusText}</Text>
                            </View>

                        </View>
                        <View style={styles.itemLine}>
                            <Text>{fishTypeName}</Text>
                            <Text>{activeText}</Text>
                        </View>
                    </View>
                </View>

            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    pondContent:{
        width,
        marginTop: 15,
        backgroundColor: $config.color.PAGE_BG_COLOR,
        paddingHorizontal: 15,
    },
    pond:{
        height: 90,
        backgroundColor: $config.color.WHITE_COLOR,
        flexDirection: 'column',
        paddingVertical: 15,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        borderRadius: 7
    },
    item:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    statusText:{
        fontWeight: 'bold'
    },
    pondImage: {
        width: 22,
        height: 22,
        marginRight: 5
    },
    pondName: {
        fontWeight: 'bold',
        fontSize: 15,
        color: $config.color.TEXT_COLOR
    },
    warn:{
        backgroundColor: $config.color.WARN_COLOR,
    },
    warnText: {
        color: $config.color.WARN_COLOR
    },
    pondRadius: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6,
        backgroundColor: $config.color.DISABLE_COLOR
    },
    itemLine:{
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection:'row'
    }
})
