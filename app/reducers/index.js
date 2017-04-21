/**
 * Created by AAB3605 on 29/03/2017.
 */
import { combineReducers } from 'redux'
import visibilityFilter from './visibilityFilter'
import filters from './filters'
import events from './events'
import searchWords from './searchWords'
import user from './user'

const viseoCompanionApp = combineReducers({
    events,
    filters,
    searchWords,
    visibilityFilter,
    user,
})

export default viseoCompanionApp;