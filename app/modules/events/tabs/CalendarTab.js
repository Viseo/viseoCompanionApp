import {View, StyleSheet, SectionList} from 'react-native';
import React, {Component} from 'react';
import EventCard from '../EventCardOld';
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

function breakDownIntoSections(events){
    let sections = [];
    for(let month = 0; month < 12; month++) {
        sections.push({
            data: [],
            title: moment().month(month).format('MMMM'),
        })
    }
    events.forEach(event => {
        const month = moment(event.datetime).get('month');
        sections[month].data.push(event);
    });
    sections = sections.filter(section => section.data.length > 0);
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