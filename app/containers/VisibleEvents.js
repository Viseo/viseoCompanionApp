/**
 * Created by AAB3605 on 29/03/2017.
 */
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchEvents, registerUser, unregisterUser} from '../actionCreators/events'
import EventList from '../components/events/EventList'

const containsString = (source, search, caseSensitive = false) => {
    if (!source || !search) {
        return false
    }
    let sourceString = caseSensitive ? source.toString() : source.toString().toLowerCase();
    let searchString = caseSensitive ? search.toString() : search.toString().toLowerCase();
    return sourceString.indexOf(searchString) > -1;
};

const getFilteredEvents = (events, filters) => {
    return events.filter(event => {
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
}

const getSearchedEvents = (events, searchWords) => {
    return events.filter(event => {
        let acceptEvent = true;
        searchWords.forEach(word => {
            let foundWordInAtLeastOneProperty = false;
            for (let key in event) {
                if (containsString(event[key], word)) {
                    foundWordInAtLeastOneProperty = true
                }
            }
            if (!foundWordInAtLeastOneProperty) {
                acceptEvent = false
            }
        });
        return acceptEvent
    })
}

const addParticipationInfo = (events, registeredEvents) => {
    return events.map(event => {
        event.participating = registeredEvents.indexOf(event.id) !== -1
        return event
    })
}

const getVisibleEventList = (events,
                             registeredEvents,
                             visibilityFilter,
                             filters,
                             searchWords) => {
    let filteredEvents = getFilteredEvents(events, filters)
    events = filteredEvents.length > 0 ? filteredEvents : events
    events = searchWords.length > 0 ? getSearchedEvents(events, searchWords) : events
    events = addParticipationInfo(events, registeredEvents)
    switch (visibilityFilter) {
        case 'SHOW_ALL':
            return events
        case 'SHOW_GOING':
            return events.filter(event => event.participating)
        case 'SHOW_NOT_GOING':
            return events.filter(event => !event.participating)
        default:
            throw new Error('Unknown filter: ' + visibilityFilter)
    }
}

const mapStateToProps = (state) => ({
    events: getVisibleEventList(
        state.events.items,
        state.events.registered,
        state.visibilityFilter,
        state.filters,
        state.searchWords
    ),
    refreshing: state.events.isFetching,
    searchWords: state.searchWords,
    loading: state.loading,
    user: state.user,
})

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        refresh: fetchEvents,
        toggleParticipation: (event, user) => {
            return event.participating ?
                unregisterUser(event.id, user.id) :
                registerUser(event.id, user.id)
        }
    }, dispatch)
}

const VisibleEventList = connect(
    mapStateToProps,
    mapDispatchToProps
)(EventList)

export default VisibleEventList