import {combineReducers} from 'redux';
import authentication from '../modules/user/authentication/authentication.reducers';
import visibilityFilter from './../reducers/visibilityFilter';
import filters from './../reducers/filters';
import events from '../modules/events/events.reducers';
import searchWords from './../reducers/searchWords';
import user from '../modules/user/user.reducer';
import comments from '../modules/events/comments/comments.reducers';
import live from './../modules/live/live.reducer';
import review from './../modules/events/reviews/review.reducer';

export default combineReducers({
    authentication,
    live,
    events,
    filters,
    searchWords,
    visibilityFilter,
    user,
    comments,
    review,
});