import {combineReducers} from "redux";
import ShazamReducer from "./ShazamReducer";

export default combineReducers({
    shazam: ShazamReducer
})