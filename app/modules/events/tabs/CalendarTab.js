import {View, StyleSheet, SectionList} from 'react-native';
import React, {Component} from 'react';
import EventCard from '../EventCard';
import PropTypes from 'prop-types';
import AppText from '../../global/components/AppText';

export default class CalendarTab extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this._scrollToEvent();
    }

    render() {
        const ITEM_HEIGHT = 100;
        const eventList = (
            <SectionList
                ref={(ref) => {
                    this.sectionList = ref;
                }}
                keyExtractor={(item, index) => item.id}
                renderItem={({item}) =>
                    <EventCard
                        imageUrl={item.imageUrl}
                        navigator={this.props.navigator}
                        eventId={item.id}
                    />
                }
                renderSectionHeader={({section}) => this._renderSectionHeader(section)}
                sections={this.props.events}
                getItemLayout={(data, index) => (
                    {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
                )}
            />
        );
        return <View style={styles.mainContainer}>{eventList}</View>;
    }

    _scrollToEvent() {
        this.sectionList.scrollToLocation({sectionIndex: 6, itemIndex: 0});
    }

    _renderSectionHeader = (section) => {
        const today = <AppText style={styles.headerToday}>{section.title}</AppText>;
        const year = <AppText style={styles.headerYear}>{section.title}</AppText>;
        const month = <AppText style={styles.headerMonth}>{section.title}</AppText>;
        switch (section.type) {
            case 'today':
                return today;
            case 'month':
                return month;
            case 'year':
                return year;
            default :
                return null;
        }
    };
};

propTypes = {
    events: PropTypes.array.isRequired,
    eventId: PropTypes.number,
};

styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    headerYear: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    headerToday: {
        borderWidth: 1,
        borderColor: 'red',
        color: 'red',
        fontSize: 20,
        fontWeight: 'bold',
    },
    headerMonth: {
        backgroundColor:'lightgray',
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
