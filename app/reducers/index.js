/**
 * Created by AAB3605 on 29/03/2017.
 */
import { combineReducers } from 'redux'
import visibilityFilter from './visibilityFilter'
import filters from './filters'
import events from './events'

const viseoCompanionApp = combineReducers({
    events,
    visibilityFilter,
    filters,
})

export default viseoCompanionApp;