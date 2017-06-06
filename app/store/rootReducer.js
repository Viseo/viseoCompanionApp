import {combineReducers} from "redux";
import authentication from '../modules/user/authentication/authentication.reducers';
import visibilityFilter from "./../reducers/visibilityFilter";
import filters from "./../reducers/filters";
import events from "./../reducers/events";
import searchWords from "./../reducers/searchWords";
import user from "./../reducers/user";
import comments from "./../reducers/comments";
import live from './../modules/live/live.reducer';

export default combineReducers({
    authentication,
    live,
    events,
    filters,
    searchWords,
    visibilityFilter,
    user,
    comments,
});