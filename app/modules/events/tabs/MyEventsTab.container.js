import {connect} from 'react-redux';
import moment from 'moment';
import MyEventsTab from './MyEventsTab';
import {noEventsForThisCategory} from './util';
import {bindActionCreators} from 'redux';
import {fetchEvents} from '../events.actions';

function breakDownIntoSections(events, user) {
    console.warn(Object.values(user));
    let hosted = events.items.filter(event => event.host.id === user.id);
    if (hosted.length > 3) {
        hosted = hosted.slice(0, 3);
        hosted.push('seeAll');
    } else if (hosted.length == 0) {
        hosted.push(noEventsForThisCategory)
    }
    let hostedSection = {data: hosted, title: "J'organise"};

    const isParticipant = (event) => event.participants.find(participant => participant.id === user.id);
    let going = events.items.filter(event => (event.datetime >= moment() && isParticipant(event)));
    if (going.length > 3) {
        going = going.slice(0, 3);
        going.push('seeAll');
    } else if (going.length == 0) {
        going.push(noEventsForThisCategory)
    }
    let goingSection = {data: going, title: "J'y vais"};

    let went = events.itemsExpired.filter(event => (event.datetime < moment() && isParticipant(event)));
    if (went.length > 3) {
        went = went.slice(0, 3);
        went.push('seeAll');
    } else if (went.length == 0) {
        went.push(noEventsForThisCategory)
    }
    let wentSection = {data: went, title: "J'y suis allé"};

    return [
        hostedSection,
        goingSection,
        wentSection,
    ];
}

const mapStateToProps = ({events, user}, ownProps) => ({
    events: breakDownIntoSections(events, user),
    user,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            refresh: fetchEvents,
        },
        dispatch,
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(MyEventsTab);