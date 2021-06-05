import React, {useEffect} from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity, Animated } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import FontistoIcons from "react-native-vector-icons/Fontisto";
import IonIcons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {Styles} from "../Styles";
import {set_listening} from "../Actions";
import { connect } from 'react-redux';

const {container, shazam_button_container, shazam_button_background, search_button_container, search_button_background, scroll_container, home_gradient, home_text, action_text} = Styles;

const {width, height} = Dimensions.get("window");

const SHAZAM_BUTTON_SIZE = width * 0.5;
const SEARCH_BUTTON_SIZE = width * 0.175;
const NAV_BUTTONS_SIZE = 30;

const AnimatedFontistoIcons = Animated.createAnimatedComponent(FontistoIcons);

const scale = new Animated.Value(1);
const pusle_animation = Animated.loop(Animated.sequence([Animated.timing(scale, {toValue: 1.1, duration: 1000, useNativeDriver: true}), Animated.timing(scale, {toValue: 1, duration: 1000, useNativeDriver: true})]));

const Home = ({navigation, set_listening}) => {

    useEffect(() => {
        pusle_animation.start();
    }, [])

    const onPressShazam = () => {
        navigation.navigate("Listening");
        set_listening(true);
    }

    return (
        <ScrollView style={[container]} contentContainerStyle={scroll_container}>
            <LinearGradient style={[container, home_gradient]} colors={["rgba(60, 180, 255, 1)", "rgba(0, 100, 255, 1)"]}>
                <Text style={[home_text, action_text]}>Tap to Shazam</Text>

                <View style={shazam_button_container}>
                    <TouchableOpacity activeOpacity={1} onPress={() => {console.log("Shazam Pressed"); onPressShazam()}} onPressIn={() => {console.log("Shazam Pressed In")}} onPressOut={() => {console.log("Shazam Pressed Out")}}>
                        <View style={[shazam_button_background]} />
                        <AnimatedFontistoIcons name="shazam" color="rgb(75, 180, 255)" size={SHAZAM_BUTTON_SIZE} style={{transform: [{scale}]}} />
                    </TouchableOpacity>
                </View>

                <View style={search_button_container}>
                    <View style={[search_button_background]} />
                    <TouchableOpacity activeOpacity={1} onPress={() => {console.log("Search Pressed")}}>
                        <IonIcons name="ios-search-circle" color="rgb(20, 150, 255)" size={SEARCH_BUTTON_SIZE} />
                    </TouchableOpacity>
                </View>

                <View style={{position: "absolute", top: 75, left: 25}}>
                    <TouchableOpacity onPress={() => {navigation.navigate("Library")}}>
                        <MaterialCommunityIcons name="account-music" color="white" size={NAV_BUTTONS_SIZE} />
                    </TouchableOpacity>
                </View>

                <View style={{position: "absolute", top: 75, right: 25, backgroundColor: "white", borderRadius: NAV_BUTTONS_SIZE, width: NAV_BUTTONS_SIZE, height: NAV_BUTTONS_SIZE, justifyContent: "center", alignItems: "center"}}>
                    <TouchableOpacity onPress={() => {navigation.navigate("Charts")}}>
                        <MaterialIcons name="insights" color="rgba(60, 180, 255, 1)" size={NAV_BUTTONS_SIZE-5} />
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </ScrollView>
    );
}

export default connect(null, {set_listening})(Home)