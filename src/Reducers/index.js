import {combineReducers, createStore} from "redux";
import AppReducer from "./AppReducer";
import UserReducer from "./UserReducer";
import ShazamReducer from "./ShazamReducer";
import SongDetailReducer from "./SoundDetailReducer";

export const Reducers = combineReducers({
    app: AppReducer,
    user: UserReducer,
    shazam: ShazamReducer,
    songDetails: SongDetailReducer
})

export const store = createStore(Reducers, {});
