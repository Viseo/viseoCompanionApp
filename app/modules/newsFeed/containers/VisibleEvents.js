import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchEvents, registerUser, unregisterUser} from '../../../actionCreators/events';
import EventList from '../../events/components/EventList';
import moment from 'moment';

const containsString = (source, search, caseSensitive = false) => {
    if (!source || !search) {
        return false;
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
                    acceptEvent = true;
                }
            }
        });
        return acceptEvent;
    });
};

const getSearchedEvents = (events, searchWords) => {
    return events.filter(event => {
        let acceptEvent = true;
        searchWords.forEach(word => {
            let foundWordInAtLeastOneProperty = false;
            for (let key in event) {
                if (containsString(event[key], word)) {
                    foundWordInAtLeastOneProperty = true;
                }
            }
            if (!foundWordInAtLeastOneProperty) {
                acceptEvent = false;
            }
        });
        return acceptEvent;
    });
};

const addParticipationInfo = (events, userId) => {
    return events.map(event => {
        event.participating = event.participants.indexOf(userId) !== -1;
        return event;
    });
};

const getVisibleEventList = (events,
                             visibilityFilter,
                             filters,
                             searchWords,
                             user) => {
    let filteredEvents = getFilteredEvents(events, filters);
    events = filteredEvents.length > 0 ? filteredEvents : events;
    events = searchWords.length > 0 ? getSearchedEvents(events, searchWords) : events;
    events = addParticipationInfo(events, user.id);
    switch (visibilityFilter) {
        case 'SHOW_ALL':
            return events;
        case 'SHOW_GOING':
            return events.filter(event => event.participating);
        case 'SHOW_NOT_GOING':
            return events.filter(event => !event.participating);
        case 'SHOW_PAST':
            return events.filter(event => {
                return moment(event.date).isBefore(moment());
            });
        case 'SHOW_UPCOMING':
            return events.filter(event => {
                return moment(event.date).isAfter(moment());
            });
        default:
            throw new Error('Unknown filter: ' + visibilityFilter);
    }
};

const mapStateToProps = (state, ownProps) => ({
    events: getVisibleEventList(
        state.events.items,
        state.visibilityFilter,
        state.filters,
        state.searchWords,
        state.user,
    ),
    refreshing: state.events.isFetching,
    searchWords: state.searchWords,
    loading: state.loading,
    user: state.user,
    ...ownProps,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        refresh: fetchEvents,
        toggleParticipation: (event, user) => {
            return event.participating ?
                unregisterUser(event, user.id) :
                registerUser(event, user.id);
        },

    }, dispatch);
};

const VisibleEventList = connect(
    mapStateToProps,
    mapDispatchToProps,
)(EventList);

export default VisibleEventList;