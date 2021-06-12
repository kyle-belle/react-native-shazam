import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { DEFAULT_SONG_SRC } from '../Dev-Data/songs';
import { Styles } from '../Styles';
import { play_song_from_network } from '../Utils';
import PlayButton from './PlayButton';

const {} = Styles;

const SongListItem = ({song={}, index, loading=false, playing=false}) => {
    const {name:song_name="Song Name", artist={}, album={}, featuring=[], artwork=index%2?"https://i0.wp.com/creativesfeed.com/wp-content/uploads/2018/08/Art-vs-Science-by-Andrew-Fairclough.jpg?w=8000&ssl=1":"https://cdn.dribbble.com/users/2113371/screenshots/6521709/drake_final_2x.jpg", audio_src=DEFAULT_SONG_SRC, accent_color=index%2?"#FF5555":"#00A0FF"} = song;
    const {name:artist_name="Artist Name"} = artist;

    const onPressPlay = () => {
        play_song_from_network({...song, audio_src});
    }

    return (
        <TouchableOpacity>
            <View style={{paddingVertical: 12, alignItems: "center", flexDirection: "row", borderTopColor: "rgba(200,200,200,0.1)", borderTopWidth: index && 1}}>
                <View style={{marginRight: 20}}>
                    <Image source={{uri: artwork}} style={{width: 50, height: 50, borderRadius: 5}} />
                    <View style={[StyleSheet.absoluteFill, {justifyContent: "center", alignItems: "center"}]}>
                        <PlayButton playing={playing} song_loading={loading} onPress={onPressPlay} size={25} />
                    </View>
                </View>
                <View>
                    <Text style={{color: "white", fontSize: 18, fontWeight: "bold"}}>{song_name}</Text>
                    <Text style={{color: "rgba(200,200,200,1)", fontSize: 12}}>{artist_name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}
 
export default SongListItem;