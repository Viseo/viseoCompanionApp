/**
 * Created by AAB3605 on 10/04/2017.
 */
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {
    fetchEventParticipants,
    registerUser,
    unregisterUser,
    updateEvent
} from './../actionCreators/events'
import Event from '../components/EventInfo'

const getEventWithId = (events, id) => {
    return events.find(event => event.id === id)
}

const mapStateToProps = (state, ownProps) => ({
    event: getEventWithId(state.events.items, ownProps.id),
    participants: getEventWithId(state.events.items, ownProps.id).participants,
    user: state.user,
    ...ownProps
})

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            fetchEventParticipants,
            registerUser,
            unregisterUser,
            updateEvent,
        },
        dispatch)
}

const EventInfo = connect(
    mapStateToProps,
    mapDispatchToProps
)(Event)

export default EventInfo