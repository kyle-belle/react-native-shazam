import React, { Fragment } from 'react';
import { View } from 'react-native';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {getFocusedRouteNameFromRoute} from "@react-navigation/native";
import { connect } from 'react-redux';

import ShazamNav from '../Navigators/Home/ShazamNavigator';
import HomeTabBar from '../Components/HomeTabBar';
import Home from '../Screens/Home';

const Tab = createMaterialTopTabNavigator();

const HomeNavigator = ({listening}) => {

    // console.log("listening", listening);

    return (
        <Tab.Navigator initialRouteName="Shazam" swipeEnabled={!listening} tabBar={props => <HomeTabBar {...props} />}>
            <Tab.Screen name="Library" component={Home} />
            <Tab.Screen name="Shazam" component={ShazamNav} />
            <Tab.Screen name="Charts" component={Home} />
        </Tab.Navigator>
    );
}

function map_state_to_props({shazam}){
    return ({listening: shazam.listening})
}

export default connect(map_state_to_props)(HomeNavigator);