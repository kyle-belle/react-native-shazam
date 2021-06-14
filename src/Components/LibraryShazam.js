import React, {useRef, useState, useEffect} from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import {set_playing, add_loaded_song, set_loading_song, remove_loaded_song, show_options_sheet} from "../Actions";
import { Styles } from '../Styles';
import Sound from "react-native-sound";
import AntIcons from "react-native-vector-icons/AntDesign";
import IonIcons from "react-native-vector-icons/Ionicons";
import FontistoIcons from "react-native-vector-icons/Fontisto";
import { connect } from 'react-redux';
import {DEFAULT_SONG_SRC} from "../Dev-Data/songs";
import PlayButton from './PlayButton';
import { play_song_from_network } from '../Utils';

Sound.setCategory('Playback', true);

const {container, library_card, library_card_shazam_song_name, apple_music_pill} = Styles;

let s; 

const LibraryShazam = ({shazam={}, index=1, loaded_songs=[], loading_song, set_playing, add_loaded_song, set_loading_song, remove_loaded_song, show_options_sheet}) => {
    const {song={}} = shazam;
    const [songLoaded, setSongLoaded] = useState(false);
    const [playing, setPlaying] = useState(false);

    const {name:song_name="Song Name", artist={}, album={}, featuring=[], artwork=index%2?"https://i0.wp.com/creativesfeed.com/wp-content/uploads/2018/08/Art-vs-Science-by-Andrew-Fairclough.jpg?w=8000&ssl=1":"https://cdn.dribbble.com/users/2113371/screenshots/6521709/drake_final_2x.jpg", audio_src=DEFAULT_SONG_SRC, accent_color=index%2?"#FF5555":"#00A0FF"} = song;
    const {name:artist_name="Artist Name"} = artist;

    const song_loading = loading_song?.audio_src === audio_src;

    useEffect(() => {

        return () => {if(s){s.release(); remove_loaded_song({...song, artwork, audio_src, accent_color});}};
    }, []);

    const onPressPlay = () => {

        s = play_song_from_network({...song, name: song_name, artwork, audio_src, accent_color}, (s, already_loaded, paused) => {setPlaying(!paused);}, (e) => {console.log(e);}, () => {setPlaying(false)});
    }

    const onPressOptions = () => {
        show_options_sheet({...song, name: song_name, artwork, audio_src});
    }

    return (
        <View style={container}>
            <Image source={{uri: artwork}} style={{width: library_card.width, height: (library_card.height * 0.6)}} />
            
            <View style={{paddingVertical: 10, paddingHorizontal: 10, flex: 1}}>
                <Text numberOfLines={2} style={library_card_shazam_song_name}>{song_name}</Text>
                <Text numberOfLines={1} style={{fontSize: library_card.fontSize}}>{artist_name}</Text>
                <View style={{position: "absolute", left: 10, bottom: 8}}>
                    <TouchableOpacity><Text style={apple_music_pill}><AntIcons name="apple1" color="white" />Music</Text></TouchableOpacity>
                </View>
            </View>

            <View style={{position: "absolute", top: 0, left:0, width: library_card.width, height: (library_card.height * 0.6), justifyContent: "center", alignItems: "center"}}>
                <PlayButton song_loading={song_loading} size={60} backgroundColor="rgba(0,0,0,0.8)" foregroundColor="white" onPress={onPressPlay} playing={playing} />
            </View>

            <View style={{position: "absolute", right: 15, top: 15}}>
                <TouchableOpacity onPress={onPressOptions}><IonIcons name="ellipsis-vertical" color="white" size={22} /></TouchableOpacity>
            </View>
        </View>
    );
}

function map_state_to_props({app}){
    return {loaded_songs: app.loaded_songs, loading_song: app.loading_song}
}

export default connect(map_state_to_props, {set_playing, add_loaded_song, set_loading_song, remove_loaded_song, show_options_sheet})(LibraryShazam);