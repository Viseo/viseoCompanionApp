/**
 * Created by AAB3605 on 29/03/2017.
 */
import { combineReducers } from 'redux'
import visibilityFilter from './visibilityFilter'
import filters from './filters'
import events from './events'
import searchWords from './searchWords'

const viseoCompanionApp = combineReducers({
    events,
    visibilityFilter,
    filters,
    searchWords
})

export default viseoCompanionApp;