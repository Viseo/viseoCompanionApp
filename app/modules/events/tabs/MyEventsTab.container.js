import {connect} from 'react-redux';
import moment from 'moment';
import MyEventsTab from './MyEventsTab';

function breakDownIntoSections(events, user) {

    let hosted = events.items.filter(event => event.host.id === user.id);
    if (hosted.length > 3) {
        hosted = hosted.slice(0, 3);
        hosted.push('seeAll');
    }
    let hostedSection = {data: hosted, title: 'Hosted'};

    let going = events.items.filter(event => (event.datetime >= moment()));
    if (going.length > 3) {
        going = going.slice(0, 3);
        going.push('seeAll');
    }
    let goingSection = {data: going, title: 'Going'};

    let went = events.itemsExpired.filter(event => (event.datetime < moment()));
    if (went.length > 3) {
        went = went.slice(0, 3);
        went.push('seeAll');
    }
    let wentSection = {data: went, title: 'Went'};

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

export default connect(mapStateToProps, null)(MyEventsTab);