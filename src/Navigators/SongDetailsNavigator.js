import { connect } from 'react-redux';
import Animated from "react-native-reanimated"
import React, { useEffect, useRef } from 'react';
import {View, Dimensions, Text, Image } from 'react-native';
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

const {width, height} = Dimensions.get("window");

const {container} = Styles;

const Tab = createMaterialTopTabNavigator();

const AnimatedImage = Animated.createAnimatedComponent(Image);

const SongDetailsNavigator = ({song={}, playing_song=null, loading_song=null}) => {

    // console.log("listening", listening);
    const scale = useRef(new Animated.Value(1));
    const opacity = useRef(new Animated.Value(1));
    const left = useRef(new Animated.Value(0));
    const image_ref = useRef(null);
    const promotion_ref = useRef(null);
    const promotion_height = useRef(null);

    const {artwork=""} = song;

    const onPressEqualizer = () => {
        console.log("Equalizer Pressed");
    }

    return (
        <View style={[container, {backgroundColor: "grey"}]}>
            <Animated.Image blurRadius={5} ref={image_ref} style={{width, height, position: "absolute", transform: [{scale: scale.current}]}} source={{uri: artwork}} />

            {/* need to replicate image because blurRadius animation doesn't work nicely (flickers) */}
            <Animated.Image ref={image_ref} style={{width, height, position: "absolute", opacity: opacity.current}} source={{uri: artwork}} />
            <LinearGradient colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]} locations={[0, 0.9]} style={container}>
                
                <Tab.Navigator backBehavior="initialRoute" sceneContainerStyle={{backgroundColor: "transparent"}} lazy lazyPreloadDistance={1} initialLayout={{width, height}} initialRouteName="Song" tabBar={(props) => {
                    const {position, state} = props;

                    scale.current = Animated.interpolateNode(position, {
                        inputRange: [0, 1],
                        outputRange: [1, 1.1],
                        extrapolate: "clamp"
                    });

                    opacity.current = Animated.interpolateNode(position, {
                        inputRange: [0, 0.1],
                        outputRange: [1, 0],
                        extrapolate: "clamp"
                    });

                    left.current = Animated.interpolateNode(position, {
                        inputRange: state.routeNames.map((_, i) => i),
                        outputRange: state.routeNames.map((_, i) => (Math.max(0, i-2) * width) * -1),
                        extrapolate: "clamp"
                    });

                    if(state.index > 2){promotion_ref.current?.setNativeProps({style: {height: 0}})}else{promotion_ref.current?.setNativeProps({style: {height: null}})}

                    return <SongDetailsTabBar song={song} {...props} />
                }}>
                    <Tab.Screen name="Song" component={Song} />
                    <Tab.Screen name="Lyrics" component={SongLyrics} />
                    <Tab.Screen name="Video" component={SongVideo} />
                    <Tab.Screen name="Artist" component={SongArtist} />
                    <Tab.Screen name="Related" component={RelatedSongs} />
                </Tab.Navigator>

                <Animated.View ref={promotion_ref} style={{transform: [{translateX: left.current}], overflow: "hidden"}}>
                    <View style={{flexDirection: "row", alignSelf: "center", alignItems: "center", marginBottom: 20}}>
                        <View style={{flexDirection: "row", alignItems: "center", backgroundColor: "rgba(200,200,200,0.3)", paddingVertical: 8, paddingHorizontal: 12, borderRadius: 40}}>
                            <View style={{backgroundColor: "rgba(255, 50, 50, 1)", width: 30, height: 30, borderRadius: 30, justifyContent: "center", alignItems: "center", marginRight: 10}}><MaterialCommunityIcons name="music" color="white" size={20} /></View>
                            <Text style={{color: "white", fontSize: 14, fontWeight: "bold"}}>PLAY FULL SONG</Text>
                        </View>

                        <View style={{width: 46, height: 46, borderRadius: 46, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(200,200,200,0.3)", marginLeft: 10}}>
                            <IonIcons name="ellipsis-vertical" color="white" size={20} />
                        </View>
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

export default connect(map_state_to_props)(SongDetailsNavigator);