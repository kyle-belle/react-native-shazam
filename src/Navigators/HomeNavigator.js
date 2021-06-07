import React, { Fragment } from 'react';
import { View } from 'react-native';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {getFocusedRouteNameFromRoute} from "@react-navigation/native";
import { connect } from 'react-redux';

import ShazamNav from '../Navigators/Home/ShazamNavigator';
import HomeTabBar from '../Components/HomeTabBar';
import Charts from '../Screens/Charts';
import Library from '../Screens/Library';

const Tab = createMaterialTopTabNavigator();

const HomeNavigator = ({listening}) => {

    // console.log("listening", listening);

    return (
        <Tab.Navigator initialRouteName="Shazam" swipeEnabled={!listening} tabBar={props => <HomeTabBar {...props} />}>
            <Tab.Screen name="Library" component={Library} />
            <Tab.Screen name="Shazam" component={ShazamNav} />
            <Tab.Screen name="Charts" component={Charts} />
        </Tab.Navigator>
    );
}

function map_state_to_props({shazam}){
    return ({listening: shazam.listening})
}

export default connect(map_state_to_props)(HomeNavigator);