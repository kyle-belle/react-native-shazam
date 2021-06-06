import React, { Fragment } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {getFocusedRouteNameFromRoute} from "@react-navigation/native";
import Animated from 'react-native-reanimated';
import {Styles} from "../Styles";

const {tab_indicator, home_tab_indicator} = Styles;

export default ({ state, descriptors, navigation, position }) => {

    const focused_route = state.routes[state.index];

    return (
        <View style={{position: "absolute", zIndex: 2, justifyContent: "center", width: "100%", marginTop: 90, flexDirection: "row"}}>
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
            const opacity = Animated.interpolateNode(position, {
                inputRange,
                outputRange: inputRange.map(i => (i === index ? 1 : 0)),
            });

            if(focused_route.name === "Shazam"){
                const routeName = getFocusedRouteNameFromRoute(focused_route);

                if(routeName === "Listening"){
                    return <Fragment key={route.key} />;
                }
            }

            return (
                <View key={route.key} style={[tab_indicator, home_tab_indicator, {backgroundColor: isFocused?"white":home_tab_indicator.backgroundColor}]}/>
            );
            })}
        </View>
    );
}