import {SET_SONG_FOR_DETAILS} from "../Actions/types";

const INITIAL_STATE = {song: {}, lyrics: {}, artist_songs: []};

export default (state=INITIAL_STATE, action) => {
    const {type, payload} = action;

    const new_state = {...state};

    switch(type){
        case SET_SONG_FOR_DETAILS:
            new_state.song = payload.song;
        break;

        default:
            return state;
    }

    return new_state;
}