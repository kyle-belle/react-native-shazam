import React from 'react';
import { View, Text, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import { DEFAULT_SONG_SRC } from '../Dev-Data/songs';
import { Styles } from '../Styles';

const {chart_entry, chart_entry_song_name} = Styles;

const ChartEntry = ({entry={}, index=1, onPress}) => {
    const {song={}} = entry
    const {name:song_name="Song Name", artist={}, album={}, featuring=[], artwork=index%2?"https://i0.wp.com/creativesfeed.com/wp-content/uploads/2018/08/Art-vs-Science-by-Andrew-Fairclough.jpg?w=8000&ssl=1":"https://cdn.dribbble.com/users/2113371/screenshots/6521709/drake_final_2x.jpg", audio_src=DEFAULT_SONG_SRC, accent_color=index%2?"#FF5555":"#00A0FF"} = song;
    const {name:artist_name="Artist Name"} = artist;

    const onPressEntry = () => {
        if(typeof(onPress) === "function"){
            onPress({...song, artwork, audio_src, accent_color})
        }
    }

    return (
        <TouchableOpacity onPress={onPressEntry}>
            <View style={chart_entry}>
                <Image source={{uri: artwork}} style={{width: chart_entry.width, height: chart_entry.width}} />
                <Text numberOfLines={1} style={chart_entry_song_name}>{song_name}</Text>
                <Text numberOfLines={1} style={{width: chart_entry.width, color: chart_entry.color, fontSize: chart_entry.fontSize, fontWeight: chart_entry.fontWeight}}>{artist_name}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default ChartEntry;