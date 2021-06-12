import React from 'react';
import { connect } from 'react-redux';
import { Styles } from '../Styles';
import { View, Text, Image, Alert, ScrollView, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import FontistoIcons from "react-native-vector-icons/Fontisto";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import IonIcons from "react-native-vector-icons/Ionicons";

import {play_song_from_network} from '../Utils';
import PlayButton from '../Components/PlayButton';
import SongListItem from '../Components/SongListItem';

const {width, height} = Dimensions.get("window");

const {container, scroll_container, song_artist_image_container, song_artist_name} = Styles;

const SongArtist = ({song, loading_song, playing_song}) => {
    const songs = [1,2,3,4,5,6,7,8,9,10];
    const {name:song_name="Song Name", audio_src, artist={}, accent_color="#00F0FF"} = song;
    const {name:artist_name="Artist Name", image="https://www.britishlgbtawards.com/wp-content/uploads/2019/02/Kehlani-Music-Artist-British-LGBT-Awards-500x500.jpg"} = artist;
    const song_loading = loading_song?.audio_src === audio_src;
    const playing = playing_song?.audio_src === audio_src;

    return (
        <FlatList ListHeaderComponent={() => {
            return (
                <View style={{marginBottom: 25, marginTop: 100}}>
                    <View style={{justifyContent: "center", alignItems: "center"}}>
                        <View style={song_artist_image_container}>
                            <Image source={{uri: image}} style={{width: song_artist_image_container.width, height: song_artist_image_container.height}} />
                        </View>
                        
                        <Text style={song_artist_name}>{artist_name}</Text>
                    </View>

                    <Text style={{color: "white", fontSize: 20, marginBottom: 15, fontWeight: "bold"}}>In Your Library</Text>
                    <SongListItem loading={song_loading} playing={playing} index={0} />
                    <SongListItem loading={song_loading} playing={playing} index={1} />

                    <Text style={{color: "white", fontSize: 20, marginBottom: 15, fontWeight: "bold"}}>Top Songs</Text>

                    <TouchableOpacity style={{alignSelf: "center"}}>
                        <Text style={{color: "white", textAlign: "center", fontSize: 16, fontWeight: "bold", paddingHorizontal: 15, paddingVertical: 14, width: width * 0.7, backgroundColor: "rgba(200,200,200,0.3)", borderRadius: 8}}> PLAY ALL</Text>
                    </TouchableOpacity>
                </View>
            );
        }} data={songs} keyExtractor={(item, index) => index.toString()} renderItem={({item, index}) => <SongListItem index={index} />} contentContainerStyle={{paddingHorizontal: 20}} />
    );
}

function map_state_to_props({app, songDetails}){
    return {song: songDetails.song, loading_song: app.loading_song, playing_song: app.playing_song}
}
 
export default connect(map_state_to_props)(SongArtist);