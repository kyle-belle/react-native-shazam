import React, {useRef, useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Styles } from '../Styles';
import {Animated, View, Text, TouchableOpacity, Dimensions } from 'react-native';

import { DEFAULT_SONG_SRC } from '../Dev-Data/songs';

const {container} = Styles;

const {width} = Dimensions.get('window');

let lyric_animations = null;

const SongLyrics = ({song, loading_song, playing_song, navigation}) => {
    
    const song_lyrics = {song: DEFAULT_SONG_SRC, lyrics: [
        {start_time: 0, end_time: 1000, lyric_section: "These are the song lyrics"},
        {start_time: 1100, end_time: 2100, lyric_section: "These are more of the song lyrics"},
    ]}

    const {name:song_name="Song Name", audio_src, artist={}, accent_color="#00F0FF"} = song;
    const {name:artist_name="Artist Name"} = artist;
    const song_loading = loading_song?.audio_src === audio_src;
    const playing = playing_song?.audio_src === audio_src;
    const lyric_container_ref = useRef(null);
    const lyric_refs = useRef(song_lyrics.lyrics.map(() => useRef(null)));
    const lyric_translateYs = useRef(song_lyrics.lyrics.map(() => new Animated.Value(0)));
    const [lyricLayouts, setLyricLayouts] = useState(song_lyrics.lyrics.map(() => ({x:0,y:0,width:0,height:0})));

    // if(lyric_animations && history[history.length-1].key === routes[index].key){
    //     lyric_animations?.start();
    // }else{
    //     lyric_animations?.stop();
    //     lyric_animations?.reset();
    // }

    useEffect(() => {
        const m = [];
        lyric_refs.current.forEach((lyric_ref, i, arr) => {
            lyric_ref.current?.measureInWindow((x,y,width,height) => {
                m.push({x,y,width,height});
                // console.log((`x: ${x}, y: ${y}, width: ${width}, height: ${height}`));
                lyric_translateYs.current[i].setValue(height);

                if(i === (arr.length-1)){
                    setLyricLayouts(m);
                }
            })
        });
    }, [])

    useEffect(() => {
        lyric_animations = Animated.loop(Animated.parallel(song_lyrics.lyrics.map(({start_time, end_time, lyric_section}, i) => {
            const delay = start_time;
            const duration = end_time - start_time;
            const translateY = lyric_translateYs.current[i];
            const {height} = lyricLayouts[i];

            return Animated.sequence([Animated.timing(translateY, {toValue: 0, duration: 200, delay, useNativeDriver: true}), Animated.timing(translateY, {toValue: -height, duration: 200, delay: duration, useNativeDriver: true}), Animated.timing(translateY, {toValue: height, duration: 0, delay: 0, useNativeDriver: true})]);
        })));

        lyric_animations?.start();
    }, [lyricLayouts]);

    const max_lyric_height = Math.max(...lyricLayouts.map(({height}) => height));

    return (
        <View style={[container, {justifyContent: "center", alignItems: "center", padding: 15}]}>
            <View ref={lyric_container_ref} style={{marginBottom: 20, width: width * 0.7, height: max_lyric_height}}>
                {song_lyrics.lyrics.map(({start_time, end_time, lyric_section}, i) => {
                    const lyric_ref = lyric_refs.current[i];
                    const translateY = lyric_translateYs.current[i];
                    const {height} = lyricLayouts[i];
                    const opacity = translateY.interpolate({
                        inputRange:  [-height, 0, height],
                        outputRange: [0, height?1:0, 0],
                        extrapolate: "clamp"
                    })

                    return <Animated.View key={i.toString()} ref={lyric_ref} style={{position: "absolute", transform: [{translateY}], opacity}}><Text style={{color: "white", fontSize: 25, fontWeight: "bold"}}>{lyric_section}</Text></Animated.View>
                })}
            </View>
            <TouchableOpacity>
                <Text style={{color: "white", textAlign: "center", fontSize: 16, fontWeight: "bold", paddingHorizontal: 15, paddingVertical: 14, width: width * 0.7, backgroundColor: "rgba(200,200,200,0.3)", borderRadius: 8}}>SEE FULL LYRICS</Text>
            </TouchableOpacity>
        </View>
    );
}

function map_state_to_props({app, songDetails}){
    return {song: songDetails.song, loading_song: app.loading_song, playing_song: app.playing_song}
}
 
export default connect(map_state_to_props)(SongLyrics);