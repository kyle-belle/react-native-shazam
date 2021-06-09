import React, { Fragment, useEffect } from 'react';
import {Animated, View, TouchableHighlight, Dimensions } from 'react-native';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {getFocusedRouteNameFromRoute} from "@react-navigation/native";
import { connect } from 'react-redux';

import ShazamNav from '../Navigators/Home/ShazamNavigator';
import HomeTabBar from '../Components/HomeTabBar';
import Charts from '../Screens/Charts';
import Library from '../Screens/Library';
import { Styles } from '../Styles';

const {width, height} = Dimensions.get("window");

const {container, equalizer_line, equalizer_overlay} = Styles;

const equalizer_lines = new Array(4).fill(null);

const equalizer_heights = equalizer_lines.map(() => new Animated.Value(equalizer_line.height * 0.3));

const equalizer_scale = new Animated.Value(0);

const equalizer_animations = Animated.loop(Animated.parallel(equalizer_heights.map((height, i) => {
  const delay = 50 * ((i%2)*2);
  const duration = 200;
  return Animated.sequence([Animated.timing(height, {toValue: equalizer_line.height, duration, delay, useNativeDriver: false}), Animated.timing(height, {toValue: equalizer_line.height * 0.3, duration, delay: 0, useNativeDriver: false})]);
})));

const equalizer_show_animation = Animated.timing(equalizer_scale, {toValue: 1, duration: 200, useNativeDriver: true});

const equalizer_hide_animation = Animated.timing(equalizer_scale, {toValue: 0, duration: 200, useNativeDriver: true});

const Tab = createMaterialTopTabNavigator();

const HomeNavigator = ({listening, playing_song}) => {

    // console.log("listening", listening);

    const show_equalizer = () => {
        equalizer_show_animation.start();
    }

    const hide_equalizer = () => {
        equalizer_hide_animation.start();
    }

    const onPressEqualizer = () => {
        console.log("Equalizer Pressed");
    }

    useEffect(() => {
        if(playing_song){
            show_equalizer();
            equalizer_animations.start();
        }else{
            hide_equalizer();
            equalizer_animations.stop();
            equalizer_animations.reset();
        }
    }, [playing_song]);

    return (
        <View style={container}>
            <Tab.Navigator initialLayout={{width, height}} initialRouteName="Shazam" swipeEnabled={!listening} tabBar={props => <HomeTabBar {...props} />}>
                <Tab.Screen name="Library" component={Library} />
                <Tab.Screen name="Shazam" component={ShazamNav} />
                <Tab.Screen name="Charts" component={Charts} />
            </Tab.Navigator>

            <Animated.View style={[equalizer_overlay, {transform: [{scale: equalizer_scale}]}]}>
                <TouchableHighlight onPress={onPressEqualizer}>
                    <View style={{width: equalizer_overlay.width, height: equalizer_overlay.height, backgroundColor: "white", flexDirection: "row", justifyContent: "center"}}>
                        {equalizer_lines.map((_, i) => {
                        const height = equalizer_heights[i];

                        return <Animated.View key={i.toString()} style={[equalizer_line, {height: height}]} />
                        })}
                    </View>
                </TouchableHighlight>
            </Animated.View>
        </View>
    );
}

function map_state_to_props({shazam, app}){
    return ({listening: shazam.listening, playing_song: app.playing_song})
}

export default connect(map_state_to_props)(HomeNavigator);