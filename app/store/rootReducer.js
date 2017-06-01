import {combineReducers} from "redux";
import authentication from '../modules/user/authentication.reducers';
import visibilityFilter from "./../reducers/visibilityFilter";
import filters from "./../reducers/filters";
import events from "./../reducers/events";
import searchWords from "./../reducers/searchWords";
import user from "./../reducers/user";
import comments from "./../reducers/comments";

export default combineReducers({
    authentication,
    events,
    filters,
    searchWords,
    visibilityFilter,
    user,
    comments,
});