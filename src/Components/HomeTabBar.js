import React, { Fragment } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {getFocusedRouteNameFromRoute} from "@react-navigation/native";
import Animated from 'react-native-reanimated';
import {Styles} from "../Styles";

const {tab_indicator_container, tab_indicator, home_tab_indicator} = Styles;

export default ({ state, descriptors, navigation, position }) => {

    const focused_route = state.routes[state.index];

    return (
        <View style={tab_indicator_container}>
            {state.routes.map((route, index) => {
            // const { options } = descriptors[route.key];
            // const label =
            //     options.tabBarLabel !== undefined
            //     ? options.tabBarLabel
            //     : options.title !== undefined
            //     ? options.title
            //     : route.name;

            const isFocused = state.index === index;

            // const onPress = () => {
            //     const event = navigation.emit({
            //     type: 'tabPress',
            //     target: route.key,
            //     canPreventDefault: true,
            //     });

            //     if (!isFocused && !event.defaultPrevented) {
            //     navigation.navigate(route.name);
            //     }
            // };

            // const onLongPress = () => {
            //     navigation.emit({
            //     type: 'tabLongPress',
            //     target: route.key,
            //     });
            // };

            const inputRange = state.routes.map((_, i) => i);
            const active_color = Animated.interpolateColors(position, {
                inputRange,
                outputColorRange: ["rgba(0, 150, 255, 1)", "rgba(255, 255, 255, 1)", "rgba(0, 150, 255, 1)"],
            });

            const inactive_color = Animated.interpolateColors(position, {
                inputRange,
                outputColorRange: ["rgba(200, 200, 200, 1)", home_tab_indicator.backgroundColor, "rgba(200, 200, 200, 1)"],
            });

            if(focused_route.name === "Shazam"){
                const routeName = getFocusedRouteNameFromRoute(focused_route);

                if(routeName === "Listening"){
                    return <Fragment key={route.key} />;
                }
            }

            return (
                <Animated.View key={route.key} style={[tab_indicator, home_tab_indicator, {backgroundColor: isFocused?active_color:inactive_color}]}/>
            );
            })}
        </View>
    );
}