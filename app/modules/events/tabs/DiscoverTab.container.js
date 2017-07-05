import moment from 'moment';
import {connect} from 'react-redux';
import DiscoverTab from './DiscoverTab';
import {bindActionCreators} from 'redux';
import {setWords} from '../search/search.actions';

function breakDownIntoSections(events) {
    let incoming = events.filter(event => event.datetime > moment());
    if (incoming.length > 3) {
        incoming = incoming.slice(0, 3);
        incoming.push('seeAllCalendar');
    }
    let incomingSection = {data: incoming, title: 'Incoming'};

    let bbls = events.filter(event => (event.category === 1 && event.datetime > moment()));
    if (bbls.length > 3) {
        bbls = bbls.slice(0, 3);
        bbls.push('seeAllFilterBbl');
    }
    let bblsSection = {data: bbls, title: 'BBLs'};

    let refreshes = events.filter(event => (event.category === 0 && event.datetime > moment()));
    if (refreshes.length > 3) {
        refreshes = refreshes.slice(0, 3);
        refreshes.push('seeAllFilterRefresh');
    }
    let refreshesSection = {data: refreshes, title: 'Refreshes'};

    return [
        incomingSection,
        bblsSection,
        refreshesSection,
    ];
}

const mapStateToProps = ({events}, ownProps) => ({
    events: breakDownIntoSections(events.items),
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            setWords,
        },
        dispatch,
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)(DiscoverTab);