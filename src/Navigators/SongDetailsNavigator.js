import { connect } from 'react-redux';
import Animated, {Clock, block, cond, clockRunning, set, startClock, stopClock, Easing, EasingNode} from "react-native-reanimated"
import React, { useEffect, useState, useRef, memo } from 'react';
import {View, Dimensions, Text, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import IonIcons from "react-native-vector-icons/Ionicons";

import { Styles } from '../Styles';
import EqualizerButton from '../Components/EqualizerButton';
import SongDetailsTabBar from '../Components/SongDetailsTabBar';
import Song from '../Screens/Song';
import SongLyrics from '../Screens/SongLyrics';
import SongVideo from '../Screens/SongVideo';
import SongArtist from '../Screens/SongArtist';
import RelatedSongs from '../Screens/RelatedSongs';
import { show_options_sheet } from '../Actions';

const {width, height} = Dimensions.get("window");

const {container} = Styles;

const Tab = createMaterialTopTabNavigator();

const AnimatedImage = Animated.createAnimatedComponent(Image);

const MemoizedSong = memo(Song);
const MemoizedSongArtist = memo(SongArtist);
const MemoizedRelatedSongs = memo(RelatedSongs);

// const runTiming = (clock, value, dest) => {
//     const state = {
//         finished: new Value(0),
//         position: new Value(0),
//         time: new Value(0),
//         frameTime: new Value(0),
//     };

//     const config = {
//         duration: 5000,
//         toValue: new Value(0),
//         easing: Easing.inOut(Easing.ease),
//     };
// }

const SongDetailsNavigator = ({song={}, playing_song=null, loading_song=null, show_options_sheet, route}) => {
    const {accent_color} = song;

    const {discover=false} = route.params;
    const scale = useRef(new Animated.Value(1));
    const opacity = useRef(new Animated.Value(discover?0:1));
    const left = useRef(new Animated.Value(0));
    const image_ref = useRef(null);
    const promotion_ref = useRef(null);
    const [, setState] = useState();
    const [gradientColor, setGradientColor] = useState("rgba(0,0,0,0.1)");
    const position = useRef(new Animated.Value(0)).current;

    const global_opacity = useRef(new Animated.Value(discover?0:1)).current;
    const name_translateY = useRef(new Animated.Value(discover?height:0)).current;

    const forceUpdate = () => {setState({})};

    const {artwork=""} = song;

    const onPressEqualizer = () => {
        console.log("Equalizer Pressed");
    }

    const onPressOptions = () => {
        show_options_sheet(song);
    }

    useEffect(() => {
        Animated.timing(name_translateY, {
            toValue: 0,
            duration: 800,
            easing: EasingNode.ease
        }).start(() => {
            setTimeout(() => {
                Animated.timing(global_opacity, {
                    toValue: 1,
                    duration: 800,
                    easing: EasingNode.linear
                }).start();
            }, 500)
        })
        // This is done so the latest animation values from tab bar can be used instead of the initial values declared here. comment out this useEffect to see what i mean when swiping to lyrics screen initially
        forceUpdate();
    }, []);

    return (
        <View style={[container, {backgroundColor: accent_color}]}>
            <Animated.Image blurRadius={5} ref={image_ref} style={{width, height, position: "absolute", transform: [{scale: scale.current}], opacity: global_opacity}} source={{uri: artwork}} />

            {/* need to replicate image because blurRadius animation doesn't work nicely (flickers) */}
            <Animated.View style={{width, height, position: "absolute", opacity: global_opacity}}>
                <Animated.Image ref={image_ref} style={{width, height, position: "absolute", opacity: opacity.current}} source={{uri: artwork}} />
            </Animated.View>
            <LinearGradient colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,1)"]} locations={[0, 0.8]} style={container}>
                
                <Tab.Navigator position={position} backBehavior="initialRoute" sceneContainerStyle={{backgroundColor: "transparent", overflow: "visible"}} style={{overflow: "visible"}} lazy lazyPreloadDistance={1} initialLayout={{width, height}} initialRouteName="Song" tabBar={(props) => {
                    const {position, state} = props;

                    scale.current = Animated.interpolateNode(position, {
                        inputRange: [0, 1],
                        outputRange: [1, 1.1],
                        extrapolate: "clamp"
                    });

                    opacity.current = Animated.interpolateNode(position, {
                        inputRange: [0, 0.2],
                        outputRange: [1, 0],
                        extrapolate: "clamp"
                    })

                    left.current = Animated.interpolateNode(position, {
                        inputRange: state.routeNames.map((_, i) => i),
                        outputRange: state.routeNames.map((_, i) => (Math.max(0, i-2) * width) * -1),
                        extrapolate: "clamp"
                    });

                    if(state.index > 2){promotion_ref.current?.setNativeProps({style: {position: "absolute"}})}else{promotion_ref.current?.setNativeProps({style: {position: "relative"}})}

                    return <SongDetailsTabBar song={song} {...props} discover={discover} global_opacity={global_opacity} />
                }}>
                    <Tab.Screen name="Song">
                        {props => <MemoizedSong {...props} discover={discover} global_opacity={global_opacity} translateY={name_translateY} />}
                    </Tab.Screen>
                    <Tab.Screen name="Lyrics" component={SongLyrics} />
                    <Tab.Screen name="Video" component={SongVideo} />
                    <Tab.Screen name="Artist" /* component={SongArtist} */>
                        {(props) => <MemoizedSongArtist {...props} position={position} />}
                    </Tab.Screen>
                    <Tab.Screen name="Related" /* component={RelatedSongs} */>
                        {(props) => <MemoizedRelatedSongs {...props} position={position} />}
                    </Tab.Screen>
                </Tab.Navigator>

                <Animated.View ref={promotion_ref} style={{transform: [{translateX: left.current}], bottom: 0, width, marginBottom: 20, opacity: global_opacity}}>
                    <View style={{flexDirection: "row", alignSelf: "center", alignItems: "center", marginBottom: 20}}>
                        <TouchableOpacity>
                            <View style={{flexDirection: "row", alignItems: "center", backgroundColor: "rgba(200,200,200,0.3)", paddingVertical: 8, paddingHorizontal: 12, borderRadius: 40}}>
                                <View style={{backgroundColor: "rgba(255, 50, 50, 1)", width: 30, height: 30, borderRadius: 30, justifyContent: "center", alignItems: "center", marginRight: 10}}><MaterialCommunityIcons name="music" color="white" size={20} /></View>
                                <Text style={{color: "white", fontSize: 14, fontWeight: "bold"}}>PLAY FULL SONG</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={onPressOptions}>
                            <View style={{width: 46, height: 46, borderRadius: 46, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(200,200,200,0.3)", marginLeft: 10}}>
                                <IonIcons name="ellipsis-vertical" color="white" size={20} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text style={{color: "white", textAlign: "center", fontWeight: "700", fontSize: 14}}>Get up to 3 months free of Apple Music</Text>
                </Animated.View>

                <EqualizerButton playing={!!playing_song} loading_song={loading_song} onPress={onPressEqualizer} />
            </LinearGradient>
        </View>
    );
}

function map_state_to_props({songDetails, app}){
    return ({song: songDetails.song, playing_song: app.playing_song, loading_song: app.loading_song})
}

export default connect(map_state_to_props, {show_options_sheet})(SongDetailsNavigator);