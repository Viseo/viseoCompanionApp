import moment from 'moment';
import {connect} from 'react-redux';
import DiscoverTab from './DiscoverTab';
import {bindActionCreators} from 'redux';
import {setWords} from '../search/search.actions';

const categories = [
    {title: 'BBLs', keywords: ['bbl', 'rex']},
    {title: 'Formations', keywords: ['formation', 'training']},
];

function getIncomingEventsSection(events) {
    let incoming = events.filter(event => event.datetime > moment());
    if (incoming.length > 3) {
        incoming = incoming.slice(0, 3);
        incoming.push('seeAllCalendar');
    }
    return {data: incoming, title: 'Incoming'};
}

function getSectionsFromCategories(events) {
    let sections = [];
    categories.forEach(category => {
        category.keywords.map(keyword => keyword.toLowerCase().trim());
        let section = {data: [], title: category.title};
        section.data = events.filter(event => {
            let didMatch = false;
            category.keywords.forEach(categoryKeyword => {
                event.keywords.forEach(eventKeyword => {
                    if (categoryKeyword === eventKeyword) {
                        didMatch = true;
                    }
                });
            });
            return didMatch;
        });
        sections.push(section);
    });
    return sections;
}

function setMaxNumberOfEventsPerSections(sections, maxNumberOfEvents) {
    sections.forEach(section => {
        let {data} = section;
        if (data.length > maxNumberOfEvents) {
            data = data.slice(0, maxNumberOfEvents);
            data.push('seeAllFilter');
        }
    });
}

function breakDownIntoSections(events) {
    const incomingSection = getIncomingEventsSection(events);
    let otherSections = getSectionsFromCategories(events);
    let sections = [
        incomingSection,
        ...otherSections,
    ];
    setMaxNumberOfEventsPerSections(sections, 3);
    return sections;
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