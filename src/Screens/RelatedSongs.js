import { connect } from 'react-redux';
import Animated from "react-native-reanimated";
import React, {useRef} from 'react';
import { View, Text, FlatList, TouchableOpacity, Dimensions } from 'react-native';

import { Styles } from '../Styles';

import SongListItem from '../Components/SongListItem';
import { useNavigationState } from '@react-navigation/native';

const {width, height} = Dimensions.get("window");

const {container, scroll_container, song_artist_image_container, song_artist_name} = Styles;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const RelatedSongs = ({song, loading_song, playing_song, route, position}) => {
    const state = useNavigationState((s) => s);
    const songs = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    const {name:song_name="Song Name", audio_src, artist={}, accent_color="#00F0FF"} = song;
    const {name:artist_name="Artist Name", image="https://www.britishlgbtawards.com/wp-content/uploads/2019/02/Kehlani-Music-Artist-British-LGBT-Awards-500x500.jpg"} = artist;
    const song_loading = loading_song?.audio_src === audio_src;
    const playing = playing_song?.audio_src === audio_src;

    const nav_index = state.routeNames.indexOf(route.name);

    // console.log("Nav State", state);
    // console.log("Route Params", route.params);
    // console.log("Nav Index", nav_index);

    const scrollY = useRef(new Animated.Value(0)).current;
    
    const backgroundColor = Animated.interpolateColors(scrollY, {
        inputRange: [0, 20],
        outputColorRange: ["rgba(0,0,0,0)", "rgba(0,0,0,0.9)"],
        extrapolate: "clamp"
    });

    const translateX = Animated.interpolateNode(position, {
        inputRange: state.routeNames.map((_, i) => i),
        outputRange: state.routeNames.map((_, i) => (i-nav_index) * width),
        extrapolate: "clamp"
    });

    const opacity = Animated.interpolateNode(position, {
        inputRange: [nav_index - 0.8, nav_index, nav_index + 0.8],
        outputRange: [0, 1, 0],
        extrapolate: "clamp"
    })

    return (
        <>
        <AnimatedFlatList style={{minHeight: height}} onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}])} ListHeaderComponent={() => {
            return (
                <>
                <View style={{marginBottom: 25, marginTop: 110}}>
                    {/* <View style={{justifyContent: "center", alignItems: "center"}}>
                        <View style={song_artist_image_container}>
                            <Image source={{uri: image}} style={{width: song_artist_image_container.width, height: song_artist_image_container.height}} />
                        </View>
                        
                        <Text style={song_artist_name}>{artist_name}</Text>
                    </View>

                    <Text style={{color: "white", fontSize: 20, marginBottom: 15, fontWeight: "bold"}}>In Your Library</Text>
                    <SongListItem loading={song_loading} playing={playing} index={0} />
                    <SongListItem loading={song_loading} playing={playing} index={1} />

                    <Text style={{color: "white", fontSize: 20, marginBottom: 15, fontWeight: "bold"}}>Top Songs</Text> */}

                    <TouchableOpacity style={{alignSelf: "center"}}>
                        <Text style={{color: "white", textAlign: "center", fontSize: 16, fontWeight: "bold", paddingHorizontal: 15, paddingVertical: 14, width: width * 0.7, backgroundColor: "rgba(200,200,200,0.3)", borderRadius: 8}}> PLAY ALL</Text>
                    </TouchableOpacity>
                </View>
                </>
            );
        }} data={songs} keyExtractor={(item, index) => index.toString()} renderItem={({item, index}) => <SongListItem index={index} playing={playing} loading={song_loading} />} contentContainerStyle={{paddingHorizontal: 20}} />
        
        <Animated.View style={{height: 95, width, /* left: -20, */ position: "absolute", backgroundColor, transform: [{translateX}], opacity}} />
        </>
    );
}

function map_state_to_props({app, songDetails}){
    return {song: songDetails.song, loading_song: app.loading_song, playing_song: app.playing_song}
}
 
export default connect(map_state_to_props)(RelatedSongs);