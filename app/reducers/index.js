import {combineReducers} from "redux";
import visibilityFilter from "./visibilityFilter";
import filters from "./filters";
import events from "./events";
import searchWords from "./searchWords";
import user from "./user";
import comments from "./comments";

const viseoCompanionApp = combineReducers({
    events,
    filters,
    searchWords,
    visibilityFilter,
    user,
    comments,
})

export default viseoCompanionApp;