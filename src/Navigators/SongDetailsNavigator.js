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
import AnimatedLinearGradient from '../Components/AnimatedLinearGradient';
import AppleMusicPromo from '../Components/AppleMusicPromo';

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

const SongDetailsNavigator = ({song={}, playing_song=null, loading_song=null, show_options_sheet, navigation, route}) => {
    const {accent_color} = song;

    const {discover=false} = route.params;
    const scale = useRef(new Animated.Value(1));
    const opacity = useRef(new Animated.Value(discover?0:1));
    const left = useRef(new Animated.Value(0));
    const image_ref = useRef(null);
    const promotion_ref = useRef(null);
    const [, setState] = useState();
    const [gradientColor, setGradientColor] = useState(discover?"rgba(0,0,0,0.1)":"rgba(0,0,0,1)");
    const position = useRef(new Animated.Value(0)).current;

    const global_opacity = useRef(new Animated.Value(discover?0:1)).current;
    const name_translateY = useRef(new Animated.Value(discover?height:0)).current;

    const forceUpdate = () => {setState({})};

    const {artwork=""} = song;

    const onPressEqualizer = () => {
        navigation.navigate("SongPlayer");
    }

    useEffect(() => {
        Animated.timing(name_translateY, {
            toValue: 0,
            duration: 800,
            easing: EasingNode.sin
        }).start(() => {
            setTimeout(() => {
                setGradientColor("rgba(0,0,0,1)");
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
            <AnimatedLinearGradient colors={["rgba(0,0,0,0.1)", gradientColor]} locations={[0, 0.8]} duration={500} style={container}>
                
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

                <AppleMusicPromo promotion_ref={promotion_ref} global_opacity={global_opacity} translateX={left} song={song} />

                <EqualizerButton playing={!!playing_song} loading_song={loading_song} onPress={onPressEqualizer} />
            </AnimatedLinearGradient>
        </View>
    );
}

function map_state_to_props({songDetails, app}){
    return ({song: songDetails.song, playing_song: app.playing_song, loading_song: app.loading_song})
}

export default connect(map_state_to_props, {show_options_sheet})(SongDetailsNavigator);