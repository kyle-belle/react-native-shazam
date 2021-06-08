import {SET_LISTENING, SET_PLAYING} from "./types";

export const set_listening = (listening=false) => {
    return ({type: SET_LISTENING, payload: {listening}})
}