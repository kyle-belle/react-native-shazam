import {combineReducers} from "redux";
import AppReducer from "./AppReducer";
import UserReducer from "./UserReducer";
import ShazamReducer from "./ShazamReducer";
import SongDetailReducer from "./SoundDetailReducer";

export default combineReducers({
    app: AppReducer,
    user: UserReducer,
    shazam: ShazamReducer,
    songDetails: SongDetailReducer
})