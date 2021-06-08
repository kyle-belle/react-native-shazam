import {} from "../Actions/types";

const INITIAL_STATE = {logged_in: false};

export default (state=INITIAL_STATE, action) => {
    const {type, payload} = action;

    const new_state = {...state};

    switch(type){

        default:
            return state;
    }

    return new_state;
}