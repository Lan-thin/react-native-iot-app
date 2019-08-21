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
    render(){
        return (
            <TouchableOpacity>
                <View style={styles.pondContent}>
                    <View style={styles.pond}>
                        <View style={styles.itemLine}>
                            <View style={styles.item}>
                                <Image style={styles.pondImage} source={require('../assert/images/home_active.png')}></Image>
                                <Text style={styles.pondName}>12号塘</Text>
                            </View>
                            <View style={styles.item}>
                                <View style={styles.pondRadius}></View>
                                <Text>空闲中</Text>
                            </View>

                        </View>
                        <View style={styles.itemLine}>
                            <Text>黑鱼</Text>
                            <Text>无运行中的增氧机</Text>
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
        justifyContent: 'space-between'
    },
    item:{
        flexDirection: 'row',
        alignItems: 'center'
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
