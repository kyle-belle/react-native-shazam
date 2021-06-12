import React from 'react';
import { connect } from 'react-redux';
import { Styles } from '../Styles';
import { View, Text, Alert } from 'react-native';
import FontistoIcons from "react-native-vector-icons/Fontisto";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import IonIcons from "react-native-vector-icons/Ionicons";

import {play_song_from_network} from '../Utils';
import PlayButton from '../Components/PlayButton';
import Animated from 'react-native-reanimated';

const {container} = Styles;

const Song = ({song, loading_song, playing_song}) => {

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
        <View style={[container, {justifyContent: "flex-end", padding: 15}]}>
            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start"}}>
                <View>
                    <Text numberOfLines={1} style={{color: "white", fontSize: 35, fontWeight: "bold"}}>{song_name}</Text>
                    <Text style={{fontSize: 18, color: "rgba(180,180,180,1)", marginBottom: 25}}>{artist_name}</Text>
                    <Text style={{fontSize: 11, color: "rgba(180,180,180,1)", marginBottom: 25}}><FontistoIcons name="shazam" color="grey" /> 1,129,283 Shazams</Text>
                </View>

                <View>
                    <PlayButton backgroundColor={accent_color} size={70} song_loading={song_loading} playing={playing} onPress={onPressPlay} />
                </View>
            </View>
        </View>
    );
}

function map_state_to_props({app, songDetails}){
    return {song: songDetails.song, loading_song: app.loading_song, playing_song: app.playing_song}
}
 
export default connect(map_state_to_props)(Song);