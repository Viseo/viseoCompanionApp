import {View, StyleSheet, SectionList} from 'react-native';
import React, {Component} from 'react';
import EventCard from '../EventCard';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import AppText from '../../global/components/AppText';
import moment from 'moment';


class CalendarTab extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const eventList = (

            <SectionList
                keyExtractor={(item, index) => item.id}
                renderItem={({item}) =>
                    <EventCard
                        imageUrl = {item.imageUrl}
                        navigator={this.props.navigator}
                        eventId={item.id}
                    />
                }
                renderSectionHeader={({section}) => <AppText>{section.title}</AppText>}
                sections={this.props.events}
            />
        );
        return <View style={styles.mainContainer}>{eventList}</View>;
    }
}

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
})

export default connect(
    mapStateToProps,
)(CalendarTab);

CalendarTab.propTypes = {
    events: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
    },
});