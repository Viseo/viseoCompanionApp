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
    filters,
    searchWords,
    visibilityFilter,
    user: (state = {id:1}) => { return state}
})

export default viseoCompanionApp;