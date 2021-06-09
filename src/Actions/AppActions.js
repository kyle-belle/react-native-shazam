import {SET_PLAYING, ADD_LOADED_SONG, REMOVE_LOADED_SONG} from "./types";

export const set_playing = (song={}) => {
    return ({type: SET_PLAYING, payload: {song}});
}

export const add_loaded_song = (song={}) => {
    return ({type: ADD_LOADED_SONG, payload: {song}});
}

export const remove_loaded_song = (song={}) => {
    return ({type: REMOVE_LOADED_SONG, payload: {song}});
}