import {SET_PLAYING, ADD_LOADED_SONG, REMOVE_LOADED_SONG} from "../Actions/types";

const INITIAL_STATE = {playing_song: null, loaded_songs: []};

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

        default:
            return state;
    }

    return new_state;
}