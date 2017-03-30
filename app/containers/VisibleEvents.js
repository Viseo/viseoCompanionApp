/**
 * Created by AAB3605 on 29/03/2017.
 */
import { connect } from 'react-redux'
import { addEvent, removeEvent } from '../actions'
import EventList from '../components/events/eventList'

const getVisibleEventList = (events, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return events;
        default:
            throw new Error('Unknown filter: ' + filter);
    }
}

const mapStateToProps = (state) => ({
    events: getVisibleEventList(state.events, state.visibilityFilter)
})

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        addEvent: (event) => {
            dispatch(addEvent(event))
        },
        removeEvent: (id) => {
            dispatch(removeEvent(id))
        }
    }
}

const VisibleEventList = connect(
    mapStateToProps,
    mapDispatchToProps
)(EventList)

export default VisibleEventList