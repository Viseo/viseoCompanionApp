/**
 * Created by AAB3605 on 10/04/2017.
 */
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    addEvent,
    deleteEvent,
    fetchEventParticipants,
    registerUser,
    unregisterUser,
    updateEvent
} from "./../actionCreators/events";
import Event from "../components/EventInfo";

const getEventWithId = (events, id) => {
    return events.find(event => event.id === id)
}

const getEventParticipantsFromId = (events, id) => {
    let event = events.find(event => event.id === id)
    if (!event)
        event = {
            name: '',
            description: '',
            date: '',
            location: '',
            keywords: ''
        }
    return event.hasOwnProperty('participants') ?
        event.participants :
        []
}

const mapStateToProps = (state, ownProps) => ({
    event: getEventWithId(state.events.items, ownProps.id),
    participants: getEventParticipantsFromId(state.events.items, ownProps.id),
    user: state.user,
    ...ownProps,
})

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            fetchEventParticipants,
            registerUser,
            unregisterUser,
            deleteEvent,
            updateEvent,
            addEvent
        },
        dispatch)
}

const EventInfo = connect(
    mapStateToProps,
    mapDispatchToProps
)(Event)

export default EventInfo