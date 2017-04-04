/**
 * Created by AAB3605 on 29/03/2017.
 */
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as eventActionCreators from '../actionCreators/events'
import * as filterActionCreators from '../actionCreators/filters'
import EventList from '../components/events/eventList'

const getVisibleEventList = (events, visibilityFilter, filters) => {
    let filteredEvents = events.filter(event => {
        let acceptEvent = false;
        filters.forEach(filter => {
            for (let key in filter) {
                let value = filter[key];
                if (event.hasOwnProperty(key) && event[key] === value) {
                    acceptEvent = true
                }
            }
        })
        return acceptEvent
    })
    events = filteredEvents.length > 0 ? filteredEvents : events
    switch (visibilityFilter) {
        case 'SHOW_ALL':
            return events
        case 'SHOW_GOING':
            return events.filter(event => event.participating)
        case 'SHOW_NOT_GOING':
            return events.filter(event => !event.participating)
        default:
            throw new Error('Unknown filter: ' + visibilityFilter);
    }
}

const mapStateToProps = (state) => ({
    events: getVisibleEventList(state.events, state.visibilityFilter, state.filters)
})

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            ...eventActionCreators,
            ...filterActionCreators
        },
        dispatch)
}

const VisibleEventList = connect(
    mapStateToProps,
    mapDispatchToProps
)(EventList)

export default VisibleEventList