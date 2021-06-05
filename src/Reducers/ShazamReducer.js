import {SET_LISTENING} from "../Actions/types";

const INITIAL_STATE = {listening: false};

export default (state=INITIAL_STATE, action) => {
    const {type, payload} = action;

    const new_state = {...state};

    switch(type){

        case SET_LISTENING:
            new_state.listening = payload.listening;
        break;

        default:
            return state;
    }

    return new_state;
}