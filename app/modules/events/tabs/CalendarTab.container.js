import {connect} from 'react-redux';
import moment from 'moment';
import CalendarTab from './CalendarTab';

function sortByYearAndMonth(events) {
    let result = {};
    events.forEach(event => {
        const {datetime} = event;
        const year = moment(datetime).format('YYYY');
        const month = moment(datetime).format('MMMM');
        if(!result[year]) {
            result[year] = {};
        }
        if(!result[year][month]) {
            result[year][month] = [];
        }
        result[year][month].push(event);
    });
    return result;
}

function convertIntoSections(events) {
    let sections = [];
    Object.keys(events).forEach(year => {
        sections.push({
            data: [],
            title: year,
        });
        Object.keys(events[year]).forEach(month => {
            sections.push({
                data: events[year][month],
                title: month,
            })
        });
    });
    return sections;
}

function breakDownIntoSections(events){
    const sortedEvents = sortByYearAndMonth(events);
    const sections = convertIntoSections(sortedEvents);
    return sections;
}

const mapStateToProps = ({events},ownProps) => ({
    events: breakDownIntoSections(events.items),
    ...ownProps,
});

export default connect(
    mapStateToProps,
)(CalendarTab);