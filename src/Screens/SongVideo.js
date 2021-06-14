import React from 'react';
import { connect } from 'react-redux';
import { Styles } from '../Styles';
import { View, Text, Alert, Dimensions } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";

import {play_song_from_network} from '../Utils';

const {width} = Dimensions.get('window');

const {container} = Styles;

const SongVideo = ({song, loading_song, playing_song}) => {
    const {name:song_name="Song Name", audio_src, artist={}, accent_color="#00F0FF"} = song;
    const {name:artist_name="Artist Name"} = artist;
    const song_loading = loading_song?.audio_src === audio_src;
    const playing = playing_song?.audio_src === audio_src;

    const onPressPlay = () => {
        play_song_from_network(song, (s, already_loaded) => {
            if(!already_loaded){console.log("played successfully")}
        }, (error) => {
            console.log(error);
            Alert.alert("Audio Error", JSON.stringify(error) || error);
        }, () => {
            console.log("Playback Finished");
        });
    }

    return (
        <View style={[container, {justifyContent: "center", alignItems: "center", padding: 15}]}>
            <View style={{marginBottom: 20, width: width * 0.9, borderRadius: 20, overflow: "hidden"}}>
                <YoutubePlayer webViewStyle={{opacity: 0.99, overflow: "hidden"}} onError={(error) => {console.log(error)}} mute forceAndroidAutoplay={false} height={(width*0.9)/1.77} videoId="phaJXp_zMYM" />
            </View>
                
            <Text style={{color: "white", textAlign: "center", fontSize: 16, fontWeight: "bold", width: width * 0.9}}>{song_name}</Text>
        </View>
    );
}

function map_state_to_props({app, songDetails}){
    return {song: songDetails.song, loading_song: app.loading_song, playing_song: app.playing_song}
}
 
export default connect(map_state_to_props)(SongVideo);