import React, {useEffect} from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity, Animated, Vibration } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import FontistoIcons from "react-native-vector-icons/Fontisto";
import AntIcons from "react-native-vector-icons/AntDesign";
import { SharedElement } from 'react-navigation-shared-element';
import { connect } from 'react-redux';
import {Styles} from "../Styles";
import {set_listening, set_song_for_details} from "../Actions";
import { DEFAULT_SONG_SRC } from '../Dev-Data/songs';
import { play_song_from_network } from '../Utils';

const {container, shazam_button_container, shazam_button_background, listening_shazam_button_background, search_button_container, search_button_background, scroll_container, home_gradient, home_text, action_text} = Styles;

const circles = new Array(4).fill(null);

const circle_scales = circles.map(() => new Animated.Value(0));
const circle_opacities = circles.map(() => new Animated.Value(1));

const circle_animations = Animated.loop(Animated.parallel(circles.map((_, i) => {
    const circle_scale = circle_scales[i];
    const circle_opacity = circle_opacities[i];
    const delay = i * 200;

    return Animated.parallel([Animated.sequence([Animated.timing(circle_opacity, {toValue: 0, duration: 1000, delay: 2000 + delay, useNativeDriver: true}), Animated.timing(circle_opacity, {toValue: 1, duration: 0, delay: 10, useNativeDriver: true})]), Animated.sequence([Animated.timing(circle_scale, {toValue: 1.2, duration: 2000, delay, useNativeDriver: true}), Animated.timing(circle_scale, {toValue: 1, duration: 1000, delay: 0, useNativeDriver: true}), Animated.timing(circle_scale, {toValue: 0, duration: 0, delay: 0, useNativeDriver: true})])]);
})));

const big_circles = new Array(2).fill(null);
const big_circle_scales = big_circles.map(() => new Animated.Value(1));
const big_circle_opacities = big_circles.map(() => new Animated.Value(0));

const big_circle_animations = Animated.loop(Animated.parallel(big_circles.map((_, i) => {
    const circle_scale = big_circle_scales[i];
    const circle_opacity = big_circle_opacities[i];
    const delay = i * 300;

    return Animated.parallel([Animated.sequence([Animated.timing(circle_opacity, {toValue: 1, duration: 200, delay: delay, useNativeDriver: true}), Animated.timing(circle_opacity, {toValue: 0, duration: 200, delay: 1000, useNativeDriver: true})]), Animated.sequence([Animated.timing(circle_scale, {toValue: 1.75, duration: 1000, delay, useNativeDriver: true}), Animated.timing(circle_scale, {toValue: 1.7, duration: 500, delay: 0, useNativeDriver: true}), Animated.timing(circle_scale, {toValue: 1, duration: 0, delay: 0, useNativeDriver: true})])]);
})));

const reset_animation_values = () => {
    circles.forEach((_, i) => {
        circle_scales[i].setValue(0);
        circle_opacities[i].setValue(1);
    });

    big_circles.forEach((_, i) => {
        big_circle_scales[i].setValue(1);
        big_circle_opacities[i].setValue(0);
    });
}

const {width, height} = Dimensions.get("window");

const SHAZAM_BUTTON_SIZE = width * 0.5;
const LISTENING_SHAZAM_BUTTON_SIZE = SHAZAM_BUTTON_SIZE * 0.6;
const NAV_BUTTONS_SIZE = 20;

const AnimatedFontistoIcons = Animated.createAnimatedComponent(FontistoIcons);

const Listening = ({navigation, set_listening, set_song_for_details}) => {

    useEffect(() => {
        circle_animations.start();
        big_circle_animations.start();

        const song = {name: "Song Name", artist: {}, album: {}, featuring: [], artwork: "https://cdn.dribbble.com/users/2113371/screenshots/6521709/drake_final_2x.jpg", audio_src: DEFAULT_SONG_SRC, accent_color: "#00A0FF"}

        setTimeout(() => {set_listening(false); set_song_for_details(song); Vibration.vibrate([0, 500, 100, 300]); navigation.navigate("Main"); navigation.navigate("SongDetails", {discover: true});}, 3000);

        return () => {circle_animations.stop(); big_circle_animations.stop(); big_circle_animations.reset(); circle_animations.reset(); reset_animation_values();}
    }, [])

    const onPressShazam = () => {
        console.log("Shazam Pressed");
        // navigation.navigate("Main");
        // set_listening(false);
    }

    const onPressClose = () => {
        navigation.navigate("Main");
        set_listening(false);
    }

    return (
        <ScrollView style={[container]} contentContainerStyle={scroll_container}>
            <LinearGradient style={[container, home_gradient]} /* colors={["white", "white"]} */ colors={["rgba(60, 180, 255, 1)", "rgba(0, 100, 255, 1)"]}>
                <Text style={[home_text, action_text]}>Listening</Text>

                <View style={[shazam_button_container, {marginTop: 100}]}>
                    <TouchableOpacity activeOpacity={1} style={{justifyContent: "center", alignItems: "center"}} onPress={onPressShazam}>
                        {circles.map((_, i, arr) => {
                            const scale = circle_scales[i];
                            const opacity = circle_opacities[i];
                            const size = LISTENING_SHAZAM_BUTTON_SIZE * (1 + ((arr.length - i) * 0.25));
                            return (<Animated.View style={[{position: "absolute", backgroundColor: "rgba(255, 255, 255, 0.1)", width: size, height: size, borderRadius: size, opacity, transform: [{scale}]}]} key={i.toString()} />);
                        })}

                        {big_circles.map((_, i, arr) => {
                            const scale = big_circle_scales[i];
                            const opacity = big_circle_opacities[i];
                            const size = (height * 0.5) * (1 + ((arr.length - i) * 0.25));
                            return (<Animated.View style={[{position: "absolute", backgroundColor: "rgba(0,0,0,0)", borderWidth: 5, borderColor: "rgba(255, 255, 255, 0.2)", width: size, height: size, borderRadius: size, opacity, transform: [{scale}]}]} key={i.toString()} />);
                        })}
                        {/* <SharedElement id="shazam-button-background" style={{justifyContent: "center", alignItems: "center"}}> */}
                            <Animated.View style={[shazam_button_background, listening_shazam_button_background]} />
                        {/* </SharedElement> */}
                        {/* <SharedElement id="shazam-button" ><View style={{width: LISTENING_SHAZAM_BUTTON_SIZE, height: LISTENING_SHAZAM_BUTTON_SIZE, backgroundColor: "rgba(0,0,0,1)"}} /></SharedElement> */}
                        {/* <SharedElement id="shazam-button" > */}
                            <AnimatedFontistoIcons name="shazam" color="rgb(75, 180, 255)" size={LISTENING_SHAZAM_BUTTON_SIZE} />
                        {/* </SharedElement> */}
                    </TouchableOpacity>
                </View>

                <View style={{position: "absolute", top: 75, left: 25}}>
                    <TouchableOpacity onPress={onPressClose}>
                        <AntIcons name="close" color="white" size={NAV_BUTTONS_SIZE} />
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </ScrollView>
    );
}

Listening.sharedElements = (route, otherRoute, showing) => {
    // const {} = route.params;
    return ["shazam-button", "shazam-button-background"];
}

export default connect(null, {set_listening, set_song_for_details})(Listening)