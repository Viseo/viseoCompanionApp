import {connect} from 'react-redux';
import SearchResults from './SearchResults';

const containsString = (source, search, caseSensitive = false) => {
    if (!source || !search) {
        return false;
    }
    let sourceString = caseSensitive ? source.toString() : source.toString().toLowerCase();
    let searchString = caseSensitive ? search.toString() : search.toString().toLowerCase();
    return sourceString.indexOf(searchString) > -1;
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
        event.participating = event.participants.findIndex(user =>
            parseInt(user.id) === parseInt(userId)) !== -1;
        return event;
    });
};

const getVisibleEventList = (events,
                             searchWords,
                             user) => {
    events = searchWords.length > 0 ? getSearchedEvents(events, searchWords) : events;
    events = addParticipationInfo(events, user.id);
    return events;
};

const mapStateToProps = (state, ownProps) => ({
    events: getVisibleEventList(
        state.events.items,
        state.searchWords,
        state.user,
    ),
    ...ownProps,
});

export default connect(
    mapStateToProps,
)(SearchResults);