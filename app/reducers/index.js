/**
 * Created by AAB3605 on 29/03/2017.
 */
import { combineReducers } from 'redux'
import visibilityFilter from './visibilityFilter'

const defaultState = {
    events: [
        {id:'0', name:'firstEvent'},
        {id:'1', name:'secondEvent'},
    ],
    visibilityFilter: 'SHOW_ALL',
}

const viseoCompanionApp = combineReducers({
    visibilityFilter
})

export default viseoCompanionApp;