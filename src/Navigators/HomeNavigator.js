import React, { Fragment, useEffect } from 'react';
import {View, Dimensions } from 'react-native';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {getFocusedRouteNameFromRoute} from "@react-navigation/native";
import { connect } from 'react-redux';

import ShazamNav from '../Navigators/Home/ShazamNavigator';
import HomeTabBar from '../Components/HomeTabBar';
import Charts from '../Screens/Charts';
import Library from '../Screens/Library';
import { Styles } from '../Styles';
import EqualizerButton from '../Components/EqualizerButton';

const {width, height} = Dimensions.get("window");

const {container} = Styles;

const Tab = createMaterialTopTabNavigator();

const HomeNavigator = ({listening, playing_song}) => {

    // console.log("listening", listening);

    const onPressEqualizer = () => {
        console.log("Equalizer Pressed");
    }

    return (
        <View style={container}>
            <Tab.Navigator lazy lazyPreloadDistance={1} initialLayout={{width, height}} initialRouteName="Shazam" swipeEnabled={!listening} tabBar={props => <HomeTabBar {...props} />}>
                <Tab.Screen name="Library" component={Library} />
                <Tab.Screen name="Shazam" component={ShazamNav} />
                <Tab.Screen name="Charts" component={Charts} />
            </Tab.Navigator>

            <EqualizerButton playing={!!playing_song} />
        </View>
    );
}

function map_state_to_props({shazam, app}){
    return ({listening: shazam.listening, playing_song: app.playing_song})
}

export default connect(map_state_to_props)(HomeNavigator);