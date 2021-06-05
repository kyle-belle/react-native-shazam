import React, {useEffect} from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity, Animated } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import FontistoIcons from "react-native-vector-icons/Fontisto";
import IonIcons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { connect } from 'react-redux';
import {Styles} from "../Styles";
import {set_listening} from "../Actions";

const {container, shazam_button_container, shazam_button_background, search_button_container, search_button_background, scroll_container, home_gradient, home_text, action_text} = Styles;

const {width, height} = Dimensions.get("window");

const SHAZAM_BUTTON_SIZE = width * 0.5;
const SEARCH_BUTTON_SIZE = width * 0.175;
const NAV_BUTTONS_SIZE = 30;

const AnimatedFontistoIcons = Animated.createAnimatedComponent(FontistoIcons);

const scale = new Animated.Value(1);
const pusle_animation = Animated.loop(Animated.sequence([Animated.timing(scale, {toValue: 1.1, duration: 1000, useNativeDriver: true}), Animated.timing(scale, {toValue: 1, duration: 1000, useNativeDriver: true})]));

const Listening = ({navigation, set_listening}) => {

    useEffect(() => {
        pusle_animation.start();
    }, [])

    const onPressShazam = () => {
        navigation.navigate("Main");
        set_listening(false);
    }

    return (
        <ScrollView style={[container]} contentContainerStyle={scroll_container}>
            <LinearGradient style={[container, home_gradient]} colors={["rgba(60, 180, 255, 1)", "rgba(0, 100, 255, 1)"]}>
                <Text style={[home_text, action_text]}>Listening</Text>

                <View style={shazam_button_container}>
                    <TouchableOpacity activeOpacity={1} onPress={() => {console.log("Shazam Pressed"); onPressShazam()}} onPressIn={() => {console.log("Shazam Pressed In")}} onPressOut={() => {console.log("Shazam Pressed Out")}}>
                        <View style={[shazam_button_background]} />
                        <AnimatedFontistoIcons name="shazam" color="rgb(75, 180, 255)" size={SHAZAM_BUTTON_SIZE} style={{transform: [{scale}]}} />
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </ScrollView>
    );
}

export default connect(null, {set_listening})(Listening)