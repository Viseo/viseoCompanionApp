import {connect} from 'react-redux';
import moment from 'moment';
import CalendarTab from './CalendarTab';
import {bindActionCreators} from 'redux';
import {fetchEvents} from '../events.actions';
import {fetchActions} from '../../actions/actions.actions';

let currentDaySectionIndex = 0;

function sortByYearAndMonth(events) {
    let result = {};
    events.forEach(event => {
        const {datetime} = event;
        const year = moment(datetime).format('YYYY');
        const month = moment(datetime).format('MMMM');
        const today = moment().format('DD/MM/YYYY');
        if (!result[year]) {
            result[year] = {};
        }
        if (!result[year][month]) {
            result[year][month] = [];
        }
        if (today !== moment(datetime).format('DD/MM/YYYY'))
            result[year][month].push(event);
    });
    return result;
}

function getEventsByCurrentDay(events) {
    const today = moment().format('DD/MM/YYYY');
    return events.filter(event => {
        const {datetime} = event;
        return moment(datetime).format('DD/MM/YYYY') === today;
    });
}

function convertIntoSections(events, eventsByDay) {
    let sections = [];

    const currentMonth = moment().format('MMMM');
    const currentYear = moment().format('YYYY');
    Object.keys(events).forEach(year => {
        sections.push({
            data: [],
            title: year,
            type: 'year',
        });
        Object.keys(events[year]).forEach(month => {

            sections.push({
                data: events[year][month],
                title: month,
                type: 'month',
            });
            if (eventsByDay.length > 0
                && month === currentMonth
                && currentYear === year) {
                sections.push({
                    data: eventsByDay,
                    title: 'Aujourd\'hui',
                    type: 'today',
                });
                currentDaySectionIndex = sections.length - 1;
            }
        });

    });
    return sections;
}

function breakDownIntoSections(events, actions) {
//TODO : trouver une solution sur comment injecter l'élément dans le tableau

    actions.map((e) => {
        events.push(e);
    });
    const sortedEvents = sortByYearAndMonth(events);
    const eventsByDay = getEventsByCurrentDay(events);
    const sections = convertIntoSections(sortedEvents, eventsByDay);
    return sections;
}

const mapStateToProps = ({events, actions}, ownProps) => ({
    events: breakDownIntoSections(events.items, actions.items),
    selectedEvent: events.selectedItem,
    currentDaySectionIndex,
    scrollToCurrentDaySection: events.showCurrentDaySection,
    ...ownProps,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            refresh: fetchEvents,
            refreshActions: fetchActions,
        },
        dispatch,
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CalendarTab);