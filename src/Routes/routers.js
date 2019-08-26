/*
 * @Descripttion: 
 * @version: 
 * @Author: tao.pan
 * @Date: 2019-08-13 18:36:39
 */
import {createStackNavigator, createAppContainer} from 'react-navigation'

import React from 'react'
import {
    View
} from 'react-native'
import * as $config from '../config' 
import PondList from '../pages/pond/pondList'
import TabBar from './tabBar'
import User from '../pages/user/index'
import PondDetail from '../pages/pond/pondDetail'
const Routers = createStackNavigator({
        PondList: {
            screen: TabBar,
            navigationOptions: {
                headerBackTitle: '',
				headerTruncatedBackTitle: '',
				headerTitleStyle: {
					flex: 1,
                    textAlign: 'center', 
                    fontWeight: 'bold'
                },
                headerTintColor: $config.color.WHITE_COLOR,
                headerStyle:{
                    backgroundColor: $config.color.MAIN_COLOR
                },
				headerRight: <View />,
				headerLeft: <View />
            }
        },
        PondDetail: {
            screen: PondDetail,
            navigationOptions: {
                title: '鱼塘详情',
                headerBackTitle: '返回',
				headerTruncatedBackTitle: '',
				headerTitleStyle: {
					flex: 1,
                    textAlign: 'center', 
                    fontWeight: 'bold'
                },
                headerTintColor: $config.color.WHITE_COLOR,
                headerStyle:{
                    backgroundColor: $config.color.MAIN_COLOR
                },
				headerRight: <View />,
				// headerLeft: <View />
            }
        }
    },{
        initialRouteName: 'PondList',
        navigationOptions: {
            // title: '',
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center', 
                // color: $config.color.WHITE_COLOR,
                fontWeight: 'bold'
            },
            headerTintColor: $config.color.WHITE_COLOR,
            headerStyle:{
                background: $config.color.MAIN_COLOR
            },
        },
    }
    
)
export default Routers