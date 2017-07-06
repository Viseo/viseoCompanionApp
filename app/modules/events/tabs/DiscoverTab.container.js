import moment from 'moment';
import {connect} from 'react-redux';
import DiscoverTab from './DiscoverTab';
import {bindActionCreators} from 'redux';
import {setWords} from '../search/search.actions';

const categories = [
    {title: 'BBLs', keywords: ['bbl', 'rex']},
    {title: 'Formations', keywords: ['formation', 'training']},
    {title: 'Refresh', keywords: ['refresh', 'afterwork']},
];

export const noEventsForThisCategory = 'noEventsForThisCategory';

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
        if(section.data.length === 0) {
            section.data.push(noEventsForThisCategory);
        }
        sections.push(section);
    });
    return sections;
}

function setMaxNumberOfEventsPerSections(sections, maxNumberOfEvents) {
    sections.forEach(section => {
        if (section.data.length > maxNumberOfEvents) {
            section.data = section.data.slice(0, maxNumberOfEvents);
            section.data.push('seeAllFilter');
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