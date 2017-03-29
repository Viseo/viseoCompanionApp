/**
 * Created by AAB3605 on 29/03/2017.
 */
import { connect } from 'react-redux'
import { openEvent } from '../actions'
import EventList from '../components/events/eventList'

const getVisibleEvents = (events, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return events;
        default:
            throw new Error('Unknown filter: ' + filter);
    }
}

const mapStateToProps = (state) => ({
    events: getVisibleEvents(state.events, state.visibilityFilter)
})

const mapDispatchToProps = {
    onEventClick: openEvent
}

const VisibleEventList = connect(
    mapStateToProps,
    mapDispatchToProps
)(EventList)

export default VisibleEventList