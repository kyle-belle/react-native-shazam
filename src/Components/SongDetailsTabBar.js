import React, { useState, useEffect, useRef, createRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import {getFocusedRouteNameFromRoute} from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Animated from 'react-native-reanimated';
import {Styles} from "../Styles";

const {width, height} = Dimensions.get("window");

const {song_details_tab_bar_container, song_details_tab_indicators_container, song_details_tab, song_details_tab_indicator_background, song_details_tab_bar_side_button_container} = Styles;

const scrollX = new Animated.Value(0);

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);

const TAB_INDICATOR_BACKGROUND_HORIZONTAL_PADDING = 30;
const TAB_INDICATOR_BACKGROUND_VERTICAL_PADDING = 16;

export default ({ state, descriptors, navigation, position }) => {
    
    const flatlist_ref = useRef(null);
    const tab_container_ref = useRef(null);
    const tab_refs = useRef(state.routes.map(() => createRef())).current;
    const [tabMeasurements, setTabMeasurements] = useState(state.routes.map(() => ({x: 0, y: 0, width: 0, height: 0})));

    useEffect(() => {
        const tms = [];
        tab_refs.forEach((tr, i, arr) => {
            tr.current.measureLayout(tab_container_ref.current, (x, y, width, height) => {
                // console.log(`x: ${x}, y: ${y}, width: ${width}, height: ${height}`);
                tms.push({x, y, width, height});
                
                if(i === (arr.length-1)){
                    setTabMeasurements(tms);
                }
            }
        )});
    }, []);
    
    const inputRange = state.routes.map((_, i) => i);

    const width = Animated.interpolateNode(position, {
        inputRange,
        outputRange: tabMeasurements.map(({width}) => width)
    });

    const translateX = Animated.interpolateNode(position, {
        inputRange,
        outputRange: tabMeasurements.map(({x}) => x)
    });

    const left = Animated.multiply(scrollX, new Animated.Value(-1));

    flatlist_ref.current?.scrollToOffset({offset: state.index?tabMeasurements[state.index].x-50:0, animated: true})

    return (
        <View style={song_details_tab_bar_container}>
            <View ref={tab_container_ref} style={song_details_tab_indicators_container}>

                <Animated.View style={[song_details_tab_indicator_background, {width: Animated.add(width, new Animated.Value(TAB_INDICATOR_BACKGROUND_HORIZONTAL_PADDING)), transform: [{translateX: Animated.sub(translateX, new Animated.Value(TAB_INDICATOR_BACKGROUND_HORIZONTAL_PADDING/2))}, {translateY: -(TAB_INDICATOR_BACKGROUND_VERTICAL_PADDING/2)}], height: tabMeasurements[0].height + TAB_INDICATOR_BACKGROUND_VERTICAL_PADDING, left}]} />
                
                <AnimatedFlatlist ref={flatlist_ref} data={state.routes} bounces={false} showsHorizontalScrollIndicator={false} horizontal onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}])} renderItem={({item:route, index}) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                    const isFocused = state.index === index;

                    const tab_ref = tab_refs[index];
                    const tab_measurement = tabMeasurements[index];

                    const onPress = () => {
                        const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                        }
                    };

                    // const onLongPress = () => {
                    //     navigation.emit({
                    //     type: 'tabLongPress',
                    //     target: route.key,
                    //     });
                    // };

                    return (
                        <Animated.View ref={tab_ref} key={route.key} style={song_details_tab}>
                            <TouchableOpacity onPress={onPress}>
                                <Text style={{color: song_details_tab.color, fontSize: song_details_tab.fontSize}}>{label.toUpperCase()}</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    );
                }} />
            </View>

            <View style={[song_details_tab_bar_side_button_container, {left: 0}]}>
                <TouchableOpacity onPress={() => {navigation.navigate("Home")}}>
                    <MaterialIcons name="arrow-back" color="white" size={25} />
                </TouchableOpacity>
            </View>

            <View style={[song_details_tab_bar_side_button_container, {right: 0}]}>
                <TouchableOpacity onPress={() => {}}>
                    <MaterialIcons name="share" color="white" size={25} />
                </TouchableOpacity>
            </View>
        </View>
    );
}