import Sound from "react-native-sound";
import { add_loaded_song, set_loading_song, set_playing } from "../Actions";
import { store } from "../Reducers";

const {dispatch} = store;

export const play_song_from_network = (song, onSuccess, onError, onPlaybackFinished) => {
    const {audio_src, artwork} = song;
    
    if(!audio_src) return;


    const {app={}} = store.getState();

    const {loaded_songs=[], loading_song=null, playing_song=null} = app;

    const playing = playing_song?.audio_src === audio_src;
    const song_loading = loading_song?.audio_src === audio_src;

    if(song_loading){
        console.log("Song still loading");
        return;
    }

    let s = loaded_songs.find((s) => s.audio_src === audio_src)?.player;

    if(s){
        if(playing){
            s.pause();
            dispatch(set_playing(null));
            typeof(onSuccess) === "function" && onSuccess(s, true, true);
        }else{
            s.play((success) => {
                if(success){
                    typeof(onPlaybackFinished) === "function" && onPlaybackFinished();
                }else{
                    typeof(onError) === "function" && onError("Error Playing Audio");
                }
                dispatch(set_playing(null));
            });
            dispatch(set_playing({...song, artwork, audio_src, player: s}));
            typeof(onSuccess) === "function" && onSuccess(s, true);
        }
    }else{
        dispatch(set_loading_song({...song, artwork, audio_src}));
        s = new Sound(audio_src, null, (error) => {
            if(error){
                dispatch(set_loading_song(null));
                typeof(onError) === "function" && onError(error);
                return;
            }
            
            dispatch(set_loading_song(null));
            dispatch(add_loaded_song({...song, artwork, audio_src, player: s}));

            s.play((success) => {
                if(success){
                    typeof(onPlaybackFinished) === "function" && onPlaybackFinished();
                }else{
                    typeof(onError) === "function" && onError("Error Playing Audio");
                }
                dispatch(set_playing(null));
            });

            dispatch(set_playing({...song, artwork, audio_src, player: s}));
            typeof(onSuccess) === "function" && onSuccess(s, false);
        });
    }

    return s;
}