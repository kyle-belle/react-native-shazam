import { connect } from 'react-redux';
import React, {Component, createRef, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import { View, FlatList, Text, Image, TouchableOpacity, TouchableHighlight, PanResponder, Animated, Dimensions, StatusBar } from 'react-native';
import IonIcons from "react-native-vector-icons/Ionicons";
import AntIcons from "react-native-vector-icons/AntDesign";
import LinearGradient from 'react-native-linear-gradient';

import PlayButton from '../Components/PlayButton';
import { play_song_from_network } from '../Utils';
import { Styles } from '../Styles';
import { show_options_sheet } from '../Actions';
import AppleMusicPromo from '../Components/AppleMusicPromo';
import SongPlayerListItem from '../Components/SongPlayerListItem';

const {width, height} = Dimensions.get("window");

const {container, song_player_header_container, song_player_list_header} = Styles;

const HEADER_MARGIN_TOP = song_player_header_container.marginTop;
const HEADER_MARGIN_BOTTOM = song_player_header_container.marginBottom;
const PROMO_MARGIN_TOP = 40;
const PROMO_MARGIN_BOTTOM = 10;
const PROGESS_BAR_HEIGHT = 15;

let progress_animation_handle;
let is_seeking = false;

const negative_value = new Animated.Value(-1);

const SongPlayer = ({playing_song={}, loading_song, navigation, show_options_sheet}) => {
    const [song, setSong] = useState(playing_song);
    const [duration, setDuration] = useState(song?.player?.getDuration() || 1);
    // const [isSeeking, setIsSeeking] = useState(false);

    const song_progress = useRef(new Animated.Value(0)).current;
    const header_ref = useRef(null);
    const flatlist_header_ref = useRef(null);
    const controls_ref = useRef(null);
    const promo_ref = useRef(null);

    const [headerMeasures, setHeaderMeasures] = useState({x:0,y:0,width:0,height:0});
    const [controlsMeasures, setControlsMeasures] = useState({x:0,y:0,width:0,height:0});
    const [promoMeasures, setPromoMeasures] = useState({x:0,y:0,width:0,height:0});
    const [flatListHeaderMeasures, setFlatListHeaderMeasures] = useState({x:0,y:0,width:0,height:0});

    const flatlist_height = useRef(new Animated.Value(-20));
    const current_flatlist_height = useRef(-20);

    const max_flatlist_height = height-(headerMeasures.height+controlsMeasures.height+HEADER_MARGIN_TOP+HEADER_MARGIN_BOTTOM+PROMO_MARGIN_BOTTOM+PROGESS_BAR_HEIGHT);

    const show_flatlist = () => {
        Animated.timing(flatlist_height.current, {
            toValue: -(max_flatlist_height),
            duration: 200,
            useNativeDriver: false
        }).start(() => {
            current_flatlist_height.current = -(max_flatlist_height);
            flatlist_header_ref.current?.measureInWindow((x,y,width,height) => {
                // console.log("Flatlist Header MIW", {x,y,width,height});
                if(height){
                    setFlatListHeaderMeasures({x,y,width,height});
                }
            });
        });
    }
    
    const hide_flatlist = () => {
        flatlist_height.current.flattenOffset();
        Animated.timing(flatlist_height.current, {
            toValue: -20,
            duration: 200,
            useNativeDriver: false
        }).start(() => {
            current_flatlist_height.current = -20;
        });
    }

    const progress = (t) => {
        if(playing_song && (song === playing_song) && !is_seeking){
            song.player?.getCurrentTime((seconds, isPlaying) => {
                // console.log("Progress", seconds/duration);
                song_progress.setValue(seconds/duration);
                if(isPlaying){
                    progress_animation_handle = requestAnimationFrame(progress);
                }
            })
        }
    }

    const progress_bar_pan_responder = useMemo(() => PanResponder.create({
        onStartShouldSetPanResponder: (e, {x0, moveX}) => true,
        onMoveShouldSetPanResponder: () => false,

        onPanResponderGrant: (e, {x0}) => {
            // cancelAnimationFrame(progress_animation_handle);
            // if(!isSeeking){
            if(!is_seeking){
                // setIsSeeking(true);
                is_seeking = true;
            }

            song_progress.setValue(x0/width);
        },
        onPanResponderMove: (e, {x0, dx}) => {
            // cancelAnimationFrame(progress_animation_handle);
            song_progress.setValue((x0 + dx)/width);
        },
        onPanResponderRelease: (e, {x0, dx}) => {
            const seek_time = ((x0 + dx)/width) * duration;
            song.player?.setCurrentTime(seek_time);
            // setIsSeeking(false);
            is_seeking = false;
            progress_animation_handle = requestAnimationFrame(progress);
        }
    }), [song]);

    const pan_responder = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => false,
        onPanResponderMove: (e, {dy}) => {
            flatlist_height.current.setOffset(current_flatlist_height.current);
            if(current_flatlist_height.current == -20){
                flatlist_height.current.setValue(Math.min(dy, 0));
            }else{
                flatlist_height.current.setValue(dy);
            }
        },
        onPanResponderRelease: (e, {dy, vy}) => {
            if((dy > 0 && vy >= 1) || (!dy && !vy)){
                hide_flatlist();
                return;
            }

            if((dy > 0 && vy < 1)){
                if((current_flatlist_height.current > (max_flatlist_height)/3) && (dy < (max_flatlist_height)/2)){
                    show_flatlist()
                }else{
                    hide_flatlist();
                }

                return;
            }

            if(-dy > 0 && -vy >= 1){
                show_flatlist();
                return;
            }

            if(-dy > 0 && -vy < 1){
                if((current_flatlist_height.current < -(max_flatlist_height)/3) || (dy < -(max_flatlist_height)/4)){
                    show_flatlist();
                }else{
                    hide_flatlist();
                }
                return;
            }
        }
    })).current

    const {name:song_name="Song Name", artwork, artist={}, audio_src, accent_color="#757575", player} = song || {};
    const {name:artist_name="Artist Name"} = artist;

    const translateX = song_progress.interpolate({
        inputRange: [0, 1],
        outputRange: [-width, 0],
        extrapolate: "clamp"
    })

    useEffect(() => {
        header_ref.current?.measureInWindow((x,y,width,height) => {
            // console.log("Header MIW", {x,y,width,height});
            if(!headerMeasures.height && height){
                setHeaderMeasures({x,y,width,height});
            }
        });

        controls_ref.current?.measureInWindow((x,y,width,height) => {
            // console.log("Controls MIW", {x,y,width,height});
            if(!controlsMeasures.height && height){
                setControlsMeasures({x,y,width,height});
            }
        });

        promo_ref.current?.measureInWindow((x,y,width,height) => {
            // console.log("Promo MIW", {x,y,width,height});
            if(!promoMeasures.height && height){
                setPromoMeasures({x,y,width,height});
            }
        });
        progress_animation_handle = requestAnimationFrame(progress);
    }, []);

    useEffect(() => {
        if(playing_song && (song !== playing_song)){
            setSong(playing_song);
            setDuration(playing_song.player.getDuration());
        }
        progress_animation_handle = requestAnimationFrame(progress);
    }, [playing_song, song, duration]);

    const onPressPlay = () => {
        play_song_from_network(song, (player, already_loaded, paused) => {

        }, (error) => {
            console.log(error)
        }, () => {

        });
    }

    const onPressOptions = () => {
        show_options_sheet(song);
    }

    const onPressItem = (song) => {
        play_song_from_network(song, (player, already_loaded, paused) => {

        }, (error) => {
            console.log(error)
        }, () => {

        });
    }


    const playing = playing_song?.audio_src === audio_src;
    const loading = loading_song?.audio_src === audio_src;
    
    const promo_opacity = flatlist_height.current.interpolate({
        inputRange: [-1 * (height-headerMeasures.height), -20],
        outputRange: [0, 1]
    });

    const promo_height = flatlist_height.current.interpolate({
        inputRange: [-1 * (height-headerMeasures.height), -20],
        outputRange: [0, promoMeasures.height],
        extrapolate: "clamp"
    });

    const promo_margin_top = flatlist_height.current.interpolate({
        inputRange: [-1 * (height-headerMeasures.height), -20],
        outputRange: [0, PROMO_MARGIN_TOP],
        extrapolate: "clamp"
    });

    return (
        <View style={container} {...pan_responder.panHandlers}>
            <Image source={{uri: artwork}} style={{position: "absolute", width, height, backgroundColor: accent_color}} />
            <LinearGradient colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,1)"]} locations={[0, 0.8]} style={{flex: 1, justifyContent: "space-between"}}>
                <View onLayout={()=>{}} ref={header_ref} style={song_player_header_container}>
                    <TouchableOpacity onPress={() => {navigation.goBack()}}><IonIcons name="chevron-down" color="white" size={25} /></TouchableOpacity>

                    <TouchableHighlight onPress={() => {}} style={{borderRadius: 5, overflow: "hidden", flex: 1, marginHorizontal: 20}} underlayColor="rgba(220,220,220,0.3)">
                        <View style={{alignItems: "center", borderRadius: 5}}>
                                <Text style={{color: "white", fontSize: 20, fontWeight: "bold"}}>{song_name}</Text>
                                <Text style={{color: "white", fontWeight: "bold"}}>{artist_name}</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableOpacity onPress={onPressOptions}><IonIcons name="ellipsis-vertical" color="white" size={25} /></TouchableOpacity>
                </View>

                <View>
                    <View>
                        <View onLayout={()=>{}} ref={controls_ref} style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                            <IonIcons name="play-skip-back" color={accent_color} size={50} style={{marginRight: 25}} />
                            <PlayButton playing={playing} song_loading={loading} size={75} backgroundColor={accent_color} onPress={onPressPlay} />
                            <IonIcons name="play-skip-forward" color={accent_color} size={50} style={{marginLeft: 25}} />
                        </View>

                        <Animated.View onLayout={()=>{}} ref={promo_ref} style={{opacity: promo_opacity, height: promoMeasures.height?promo_height:null, marginTop: promo_margin_top}}>
                            <AppleMusicPromo song={song} />
                        </Animated.View>
                    </View>

                    <View {...progress_bar_pan_responder.panHandlers} style={{height: PROGESS_BAR_HEIGHT, width, backgroundColor: accent_color+"88"}}>
                        <Animated.View style={{width, height: "100%", backgroundColor: accent_color, transform: [{translateX: translateX}]}} />
                    </View>

                    <Animated.View style={{height: Animated.multiply(flatlist_height.current, negative_value), backgroundColor: "rgba(255,255,255,0.98)"}}>
                        <View onLayout={()=>{}} ref={flatlist_header_ref} style={song_player_list_header}>
                            <Text style={{fontSize: 18, color: accent_color, fontWeight: "bold", marginRight: 20}}>Playing</Text>

                            <Text style={{fontSize: 18, fontWeight: "bold"}} >Similar to {song_name}</Text>
                        </View>
                        <FlatList data={[1,2,3,4,5,6,7,8,9,10]} keyExtractor={(_, index) => index.toString()} renderItem={({item, index}) => <SongPlayerListItem onPress={onPressItem} index={index} />} style={{maxHeight: (max_flatlist_height - (flatListHeaderMeasures.height + 15))}} contentContainerStyle={{paddingHorizontal: 20, marginTop: 10}} ListHeaderComponent={() => {
                            return (
                                <View style={{flexDirection: "row", flex: 1}}>
                                    <Image source={{uri: artwork}} style={{width: 100, height: 100, borderRadius: 8}} />

                                    <View style={{justifyContent: "space-between", marginLeft: 20, width: width - (20*2) - 100 - 20}}>
                                        <Text style={{fontSize: 16}}>Listen to full tracks, albums and more on Apple Music</Text>
                                        <TouchableOpacity>
                                            <Text style={{color: "white", backgroundColor: "red", paddingVertical: 8, paddingHorizontal: 12, borderRadius: 5, textAlign: "center"}}>Listen on <AntIcons name="apple1" color="white" size={14} />Music</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }} />
                    </Animated.View>
                </View>

            </LinearGradient>
        </View>
    );
}

function map_state_to_props({app}){
    return {playing_song: app.playing_song, loading_song: app.loading_song}
}
 
export default connect(map_state_to_props, {show_options_sheet})(SongPlayer);

