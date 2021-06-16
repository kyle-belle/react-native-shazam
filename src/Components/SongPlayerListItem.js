import React from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import IonIcons from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux';
import { show_options_sheet } from '../Actions';
import { DEFAULT_SONG_SRC } from '../Dev-Data/songs';



const SongPlayerListItem = ({song={}, index, onPress, show_options_sheet}) => {
    const {name:song_name="Song Name", artist={}, album={}, featuring=[], artwork=index%2?"https://i0.wp.com/creativesfeed.com/wp-content/uploads/2018/08/Art-vs-Science-by-Andrew-Fairclough.jpg?w=8000&ssl=1":"https://cdn.dribbble.com/users/2113371/screenshots/6521709/drake_final_2x.jpg", audio_src=DEFAULT_SONG_SRC, accent_color=index%2?"#FF5555":"#00A0FF"} = song;
    const {name:artist_name="Artist Name"} = artist;

    const onPressItem = () => {
        if(typeof(onPress) === "function"){
            onPress({...song, name: song_name, artwork, audio_src, accent_color});
        }else{
            console.log("Song Player Item Pressed");
        }
    }

    const onPressOptions = () => {
        show_options_sheet({...song, name: song_name, artwork, audio_src, artwork, accent_color});
    }

    return (
        <TouchableHighlight onPress={onPressItem} underlayColor={accent_color+"11"} style={{flex: 1, height: null}}>
            <View style={{flex: 1, height: null, paddingVertical: 15, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <View>
                    <Text style={{fontSize: 20, fontWeight: "bold", marginBottom: 5}}>{song_name}</Text>
                    <Text>{artist_name}</Text>
                </View>

                <TouchableOpacity onPress={onPressOptions}><IonIcons name="ellipsis-vertical" color="rgba(180,180,180,1)" size={20} /></TouchableOpacity>
            </View>
        </TouchableHighlight>
    );
}
 
export default connect(null, {show_options_sheet})(SongPlayerListItem);