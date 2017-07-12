import {SectionList, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AppText from '../../global/components/AppText';
import EventCard from '../EventCard';
import colors from '../../global/colors';

export default class CalendarTab extends Component {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps({scrollToCurrentDaySection}) {
        if (scrollToCurrentDaySection) {
            this.scrollToCurrentDaySection();
        }
    }

    _renderEmptyEventList() {
        return (
            <View style={styles.emptyEventList}>
                <AppText>Aucun évènement.</AppText>
            </View>
        );
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
                        navigator={this.props.navigator}
                        eventId={item.id}
                        showImage={!!item.imageUrl}
                    />
                }
                renderSectionHeader={({section}) => this._renderSectionHeader(section)}
                sections={this.props.events}
                getItemLayout={(data, index) => (
                    {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
                )}
                ListEmptyComponent={this._renderEmptyEventList()}
            />
        );
        return <View style={styles.mainContainer}>{eventList}</View>;
    }

    scrollToCurrentDaySection() {
      //  console.warn('scroll to current day section');
        this.sectionList.scrollToLocation({sectionIndex: this.props.currentDaySectionIndex, itemIndex: 0});
    }

    _renderSectionHeader = (section) => {
        const today = <AppText style={styles.headerToday}>{section.title}</AppText>;
        const year = <AppText style={styles.headerYear}>{section.title}</AppText>;
        const month = (
            <AppText
                style={styles.headerMonth}>{section.title.substring(0, 1).toUpperCase()}{section.title.substring(1, section.title.length)}</AppText>
        );
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

CalendarTab.defaultProps = {
    scrollToCurrentDaySection: false,
};

CalendarTab.propTypes = {
    events: PropTypes.array.isRequired,
    eventId: PropTypes.number,
    scrollToCurrentDaySection: PropTypes.bool,
    currentDaySectionIndex: PropTypes.number.isRequired,
};

styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.lighterBlue,
    },
    emptyEventList: {
        height: 40,
        paddingLeft: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
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
        paddingLeft: 10,
    },
    headerMonth: {
        backgroundColor: colors.lightgray,
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        paddingLeft: 10,
    },

});
