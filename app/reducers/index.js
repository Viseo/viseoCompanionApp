import {combineReducers} from "redux";
import visibilityFilter from "./visibilityFilter";
import filters from "./filters";
import events from "./events";
import searchWords from "./searchWords";
import user from "../modules/user/user.reducer";
import comments from "../modules/events/comments/comments.reducers";

const viseoCompanionApp = combineReducers({
    events,
    filters,
    searchWords,
    visibilityFilter,
    user,
    comments,
});

export default viseoCompanionApp;