import React from 'react';
import { View, Text, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Styles } from '../Styles';

const {chart_entry, chart_entry_song_name} = Styles;

const ChartEntry = ({entry={}, index=1}) => {
    const {song={}} = entry
    const {name:song_name="Song Name", artist={}, album={}, featuring=[], artwork=index%2?"https://i0.wp.com/creativesfeed.com/wp-content/uploads/2018/08/Art-vs-Science-by-Andrew-Fairclough.jpg?w=8000&ssl=1":"https://2.bp.blogspot.com/_r8S5Fu_ozR0/TUDZiV_ticI/AAAAAAAAARY/1Myw-kkBC7U/s1600/cream.jpg"} = song;
    const {name:artist_name="Artist Name"} = artist;

    return (
        <View style={chart_entry}>
            <Image source={{uri: artwork}} style={{width: chart_entry.width, height: chart_entry.width}} />
            <Text numberOfLines={1} style={chart_entry_song_name}>{song_name}</Text>
            <Text numberOfLines={1} style={{width: chart_entry.width, color: chart_entry.color, fontSize: chart_entry.fontSize, fontWeight: chart_entry.fontWeight}}>{artist_name}</Text>
        </View>
    );
}

export default ChartEntry;