import {SET_PLAYING, ADD_LOADED_SONG, SHOW_OPTIONS_SHEET, SET_LOADING_SONG, REMOVE_LOADED_SONG} from "../Actions/types";

const INITIAL_STATE = {playing_song: null, loading_song: null, loaded_songs: [], options_song: false};

export default (state=INITIAL_STATE, action) => {
    const {type, payload} = action;

    const new_state = {...state};

    switch(type){

        case SET_PLAYING:
            new_state.playing_song = payload.song;
            if(payload.song){
                // payload.song.player.pause();
            }
        break;

        case SET_LOADING_SONG:
            new_state.loading_song = payload.song;
        break;

        case ADD_LOADED_SONG:
            if(payload.song){
                const existing_index = new_state.loaded_songs.findIndex(({audio_src}) => audio_src === payload.song.audio_src);

                if(existing_index === -1){
                    new_state.loaded_songs = [...new_state.loaded_songs, payload.song];
                }else{
                    return state;
                }
            }
        break;

        case REMOVE_LOADED_SONG:
            if(payload.song){
                const existing_index = new_state.loaded_songs.findIndex(({audio_src}) => audio_src === payload.song.audio_src);

                if(existing_index !== -1){
                    new_state.loaded_songs.splice(existing_index, 1);
                    new_state.loaded_songs = [...new_state.loaded_songs];
                }
            }
        break;

        case SHOW_OPTIONS_SHEET:
            new_state.options_song = payload.song;
        break;

        default:
            return state;
    }

    return new_state;
}