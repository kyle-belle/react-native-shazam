import {SET_SONG_FOR_DETAILS} from "./types";

export const set_song_for_details = (song) => {
    return ({type: SET_SONG_FOR_DETAILS, payload: {song}});
}