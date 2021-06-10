import React, { useEffect } from 'react';
import {View, Dimensions, Image } from 'react-native';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {getFocusedRouteNameFromRoute} from "@react-navigation/native";
import { connect } from 'react-redux';

import { Styles } from '../Styles';
import EqualizerButton from '../Components/EqualizerButton';
import SongDetailsTabBar from '../Components/SongDetailsTabBar';

const {width, height} = Dimensions.get("window");

const {container} = Styles;

const Tab = createMaterialTopTabNavigator();

const SongDetailsNavigator = ({song={}, playing_song}) => {

    // console.log("listening", listening);

    const {artwork=""} = song;

    const onPressEqualizer = () => {
        console.log("Equalizer Pressed");
    }

    return (
        <View style={[container, {backgroundColor: "black"}]}>
            <Image style={{width, height, position: "absolute"}} source={{uri: artwork}} />
            <Tab.Navigator sceneContainerStyle={{backgroundColor: "transparent"}} lazy lazyPreloadDistance={1} initialLayout={{width, height}} initialRouteName="Song" /* swipeEnabled={!listening} */ tabBar={props => <SongDetailsTabBar {...props} />}>
                <Tab.Screen name="Song" component={View} />
                <Tab.Screen name="Lyrics" component={View} />
                <Tab.Screen name="Video" component={View} />
                <Tab.Screen name="Artist" component={View} />
                <Tab.Screen name="Related" component={View} />
            </Tab.Navigator>

            <EqualizerButton playing={!!playing_song} />
        </View>
    );
}

function map_state_to_props({songDetails, app}){
    return ({song: songDetails.song, playing_song: app.playing_song})
}

export default connect(map_state_to_props)(SongDetailsNavigator);