import {combineReducers} from "redux";
import ShazamReducer from "./ShazamReducer";
import UserReducer from "./UserReducer";
import AppReducer from "./AppReducer";

export default combineReducers({
    app: AppReducer,
    user: UserReducer,
    shazam: ShazamReducer
})