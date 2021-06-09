import React, {useRef, useState, useEffect} from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import {set_playing, add_loaded_song, remove_loaded_song} from "../Actions";
import { Styles } from '../Styles';
import Sound from "react-native-sound";
import AntIcons from "react-native-vector-icons/AntDesign";
import IonIcons from "react-native-vector-icons/Ionicons";
import FontistoIcons from "react-native-vector-icons/Fontisto";
import { connect } from 'react-redux';

Sound.setCategory('Playback');

const {container, library_card, library_card_shazam_song_name, apple_music_pill} = Styles;

let s; 

const LibraryShazam = ({shazam={}, index=1, loaded_songs=[], set_playing, add_loaded_song, remove_loaded_song}) => {
    const {song={}} = shazam;
    const [songLoaded, setSongLoaded] = useState(false);
    const [songLoading, setSongLoading] = useState(false);
    const [playing, setPlaying] = useState(false);

    const {name:song_name="Song Name", artist={}, album={}, featuring=[], artwork=index%2?"https://i0.wp.com/creativesfeed.com/wp-content/uploads/2018/08/Art-vs-Science-by-Andrew-Fairclough.jpg?w=8000&ssl=1":"https://2.bp.blogspot.com/_r8S5Fu_ozR0/TUDZiV_ticI/AAAAAAAAARY/1Myw-kkBC7U/s1600/cream.jpg", audio_src="https://gp1.wpc.edgecastcdn.net/802892/http_private_production_west/songs/mp3_files/14269013/original/061_Notorious_B_I_G_-_Big_Poppa_1994_.mp3?e8817609673e6ceae29a01acb2c7efb2c43f83a40621ff51b1b77d5f4a597f9e17c3334ec390f267a59bf6e9fbcc7d1b12fdb28e5c1ac75e713c1c62b1075fe6143d83b035332301c7df2297a06ac44ac9648445726cc16ecf3265927e4f8045fbef895d9fcbc70c510e30efa44db9d7a38d9b29c4539ca3501cbb9e400a1bcec83701771a1f771aced2f0983b80454d47534a05b14b4d4e054d960b540f69bf"} = song;
    const {name:artist_name="Artist Name"} = artist;

    useEffect(() => {

        return () => {if(songLoaded){s.release(); remove_loaded_song({...song, artwork, audio_src});}};
    }, []);

    const onPressPlay = () => {
        
        if(songLoading){
            console.log("Song still loading");
            return;
        }

        s = loaded_songs.find((s) => s.audio_src === audio_src)?.player;

        if(s){
            if(playing){
                s.pause();
                setPlaying(false);
                set_playing(null);
            }else{
                s.play((success) => {
                    if(success){
                        console.log("Success Playing Audio");
                    }else{
                        console.log("Error Playing Audio");
                    }
                    setPlaying(false);
                    set_playing(null);
                });
                setPlaying(true);
                set_playing({...song, artwork, audio_src, player: s});
            }
        }else{
            if(!songLoaded){
                setSongLoading(true);
                s = new Sound(audio_src, null, (error) => {
                    if(error){
                        console.log("Error loading audio", error);
                        // Alert.alert("Audio Error", error);
                        setSongLoading(false);
                        setSongLoaded(false);
                        return;
                    }

                    console.log("Success Loading Audio");
                    console.log('duration in seconds: ' + s.getDuration() + 'number of channels: ' + s.getNumberOfChannels());

                    setSongLoading(false);
                    setSongLoaded(true);
                    add_loaded_song({...song, artwork, audio_src, player: s});
                    s.play((success) => {
                        if(success){
                            console.log("Success Played Audio");
                        }else{
                            console.log("Error Playing Audio");
                        }
                        setPlaying(false);
                        set_playing(null);
                    });
                    setPlaying(true);
                    set_playing({...song, artwork, audio_src, player: s});

                });
            }
        }
    }

    return (
        <View style={container}>
            <Image source={{uri: artwork}} style={{width: library_card.width, height: (library_card.height * 0.6)}} />
            
            <View style={{paddingVertical: 10, paddingHorizontal: 10, flex: 1}}>
                <Text numberOfLines={2} style={library_card_shazam_song_name}>{song_name}</Text>
                <Text numberOfLines={1}>{artist_name}</Text>
                <View style={{position: "absolute", left: 10, bottom: 8}}>
                    <TouchableOpacity><Text style={apple_music_pill}><AntIcons name="apple1" color="white" />Music</Text></TouchableOpacity>
                </View>
            </View>

            <View style={{position: "absolute", top: 0, left:0, width: library_card.width, height: (library_card.height * 0.6), justifyContent: "center", alignItems: "center"}}>
                <View style={{width: 50, height: 50, borderRadius: 50, backgroundColor: "rgba(0,0,0,0.9)", justifyContent: "center", alignItems: "center"}}>
                    <TouchableOpacity onPress={onPressPlay}>
                        <FontistoIcons name={playing?"pause":"play"} color="white" size={20} style={{position: "relative", left: playing?0:2}} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{position: "absolute", right: 15, top: 15}}>
                <TouchableOpacity><IonIcons name="ellipsis-vertical" color="white" size={22} /></TouchableOpacity>
            </View>
        </View>
    );
}

function map_state_to_props({app}){
    return {loaded_songs: app.loaded_songs}
}

export default connect(map_state_to_props, {set_playing, add_loaded_song, remove_loaded_song})(LibraryShazam);