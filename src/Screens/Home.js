import React, {useEffect} from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity, Animated } from 'react-native';
import {SharedElement} from "react-navigation-shared-element";
import LinearGradient from "react-native-linear-gradient";
import FontistoIcons from "react-native-vector-icons/Fontisto";
import IonIcons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {Styles} from "../Styles";
import {set_listening} from "../Actions";
import { connect } from 'react-redux';

const {container, shazam_button_container, shazam_button_hole, shazam_button_background, search_button_container, search_button_background, scroll_container, home_gradient, home_text, action_text} = Styles;

const {width, height} = Dimensions.get("window");

const SHAZAM_BUTTON_SIZE = width * 0.5;
const SEARCH_BUTTON_SIZE = width * 0.175;
const NAV_BUTTONS_SIZE = 30;

const AnimatedFontistoIcons = Animated.createAnimatedComponent(FontistoIcons);

const scale = new Animated.Value(1);

const pusle_animation = Animated.loop(Animated.sequence([Animated.timing(scale, {toValue: 1.05, duration: 1000, useNativeDriver: true}), Animated.timing(scale, {toValue: 1, duration: 1000, useNativeDriver: true})]));

const press_in_animation = Animated.loop(Animated.sequence([Animated.timing(scale, {toValue: 0.8, duration: 1000, useNativeDriver: true}), Animated.timing(scale, {toValue: 0.75, duration: 1000, useNativeDriver: true})]))

const Home = ({navigation, set_listening}) => {

    useEffect(() => {
        pusle_animation.start();
    }, [])

    const onPressShazam = () => {
        console.log("Shazam Pressed"); 
        navigation.navigate("Listening");
        set_listening(true);
    }

    const onPressInShazam = () => {
        console.log("Shazam Pressed In")
        pusle_animation.stop();
        press_in_animation.reset();
        press_in_animation.start();
    }

    const onPressOutShazam = () => {
        console.log("Shazam Pressed Out")
        press_in_animation.stop();
        pusle_animation.reset();
        pusle_animation.start();
    }

    return (
        <ScrollView style={[container]} contentContainerStyle={scroll_container}>
            <LinearGradient style={[container, home_gradient]} /* colors={["white", "white"]} */ colors={["rgba(60, 180, 255, 1)", "rgba(0, 100, 255, 1)"]}>
                <Text style={[home_text, action_text]}>Tap to Shazam</Text>

                <View style={shazam_button_container}>
                    <TouchableOpacity style={{justifyContent: 'center', alignItems: "center"}} activeOpacity={1} onPress={onPressShazam} onPressIn={onPressInShazam} onPressOut={onPressOutShazam}>
                        <LinearGradient colors={["rgba(0,0,0,1)", "rgba(0,0,0, 0.3)", "rgba(0,0,0, 0.15)"]} locations={[0, 0.001, .5]} style={shazam_button_hole} />
                        {/* <SharedElement style={{justifyContent: "center", alignItems: "center"}} id="shazam-button-background"> */}
                            <Animated.View style={[shazam_button_background, {transform: [{scale}]}]} />
                        {/* </SharedElement> */}
                        {/* <SharedElement id="shazam-button" ><View style={{width: SHAZAM_BUTTON_SIZE, height: SHAZAM_BUTTON_SIZE, backgroundColor: "rgba(0,0,0,1)"}} /></SharedElement> */}
                        {/* <SharedElement id="shazam-button" > */}
                            <AnimatedFontistoIcons name="shazam" color="rgb(75, 180, 255)" size={SHAZAM_BUTTON_SIZE} style={{transform: [{scale}]}} />
                        {/* </SharedElement> */}
                    </TouchableOpacity>
                </View>

                <View style={search_button_container}>
                    <View style={[search_button_background]} />
                    <TouchableOpacity activeOpacity={1} onPress={() => {console.log("Search Pressed")}}>
                        <IonIcons name="ios-search-circle" color="rgb(20, 150, 255)" size={SEARCH_BUTTON_SIZE} />
                    </TouchableOpacity>
                </View>

                <View style={{position: "absolute", top: 60, left: 25, alignItems: "center"}}>
                    <TouchableOpacity onPress={() => {navigation.navigate("Library")}}>
                        <MaterialCommunityIcons name="account-music" color="white" size={NAV_BUTTONS_SIZE} />
                    </TouchableOpacity>
                    <Text style={{color: "white"}}>Library</Text>
                </View>

                <View style={{position: "absolute", top: 60, right: 25, alignItems: "center"}}>
                    <View style={{backgroundColor: "white", borderRadius: NAV_BUTTONS_SIZE, width: NAV_BUTTONS_SIZE, height: NAV_BUTTONS_SIZE, justifyContent: "center", alignItems: "center"}}>
                        <TouchableOpacity onPress={() => {navigation.navigate("Charts")}}>
                            <MaterialIcons name="insights" color="rgba(60, 180, 255, 1)" size={NAV_BUTTONS_SIZE-5} />
                        </TouchableOpacity>
                    </View>
                    
                    <Text style={{color: "white"}}>Charts</Text>
                </View>
            </LinearGradient>
        </ScrollView>
    );
}

export default connect(null, {set_listening})(Home)