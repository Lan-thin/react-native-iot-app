/*
 * @Descripttion: 
 * @version: 
 * @Author: tao.pan
 * @Date: 2019-08-14 11:52:33
 */
import React from 'react'
import {View, Image} from 'react-native'
import {createBottomTabNavigator, getActiveChildNavigationOptions} from 'react-navigation'
import PondList from '../pages/pond/pondList'
import User from '../pages/user/index'
import * as $config from '../config'
const Tabbar = createBottomTabNavigator({
    PondList: {
        screen: PondList,
        navigationOptions: {
            taBarLabel: '首页',
            tabBarIcon: ({focused, tintColor}) => {
                let icon = focused ? require('../assert/images/home_active.png') : require('../assert/images/home.png')
                return <View>
                    <Image source={icon} style={{width:22,height:22}}></Image>
                </View>
            },
            title: '池塘列表'
        }
    },
    User: {
        screen: User,
        navigationOptions: {
            taBarLabel: '功能设置',
            tabBarIcon: ({focused, tintColor}) => {
                let icon = focused ? require('../assert/images/setting_active.png') : require('../assert/images/setting.png')
                return <View>
                    <Image source={icon} style={{width:22,height:22}}></Image>
                </View>
            },
            title: '功能设置'
        }
    }
},{
    tabBarOptions:{
        activeTintColor: $config.color.SELECT_COLOR,
        inactiveTintColor: $config.color.UNSELECT_COLOR,
        allowFontScaling: false
    },
    swipeEnabled: true,
	animationEnabled: true,
	initialRouteName: 'PondList',
})
Tabbar.navigationOptions = ({ navigation, screenProps }) => {
    const childOptions = getActiveChildNavigationOptions(navigation, screenProps);
    return {
        title: childOptions.title,
    };
};
export default Tabbar