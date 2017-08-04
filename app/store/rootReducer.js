import {combineReducers} from 'redux';
import authentication from '../modules/user/authentication/authentication.reducers';
import events from '../modules/events/events.reducer';
import user from '../modules/user/user.reducer';
import comments from '../modules/events/comments/comments.reducers';
import live from './../modules/live/live.reducer';
import review from './../modules/events/reviews/review.reducer';
import searchWords from '../modules/events/search/search.reducer';
import actions from '../modules/actions/actions.reducers';

export default combineReducers({
    authentication,
    live,
    events,
    searchWords,
    user,
    comments,
    review,
    actions,
});