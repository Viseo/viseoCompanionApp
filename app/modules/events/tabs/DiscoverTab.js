import React, {Component} from 'react';
import {SectionList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../../global/colors';
import EventCard from '../EventCard';
import AppText from '../../global/components/AppText';
import PropTypes from 'prop-types';
import {noEventsForThisCategory} from './util';

export default class DiscoverTab extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SectionList
                style={styles.mainContainer}
                renderItem={(info) => this._renderEventCard(info)}
                renderSectionHeader={({section}) => this._renderSectionHeader(section)}
                keyExtractor={(item, index) => item.id}
                sections={this.props.events}
            />
        );
    }

    _renderEventCard({item, section}) {
        const seeAll = (
            <View style={styles.seeAllContainer}>
                <Text style={{textAlign: 'center', color: 'white'}}>
                    Voir plus...
                </Text>
            </View>
        );
        if (item === 'seeAllFilter') {
            const showCurrentDaySectionInCalendar = () => {
                this.props.showCurrentDaySection();
                this.props.goToCalendarTab();
            };
            const goToSearchEventsWithSelectedSection = () => {
                this.props.setWords(section.categoryMainKeyword);
                this.props.goToSearchEvents();
            };
            const onPress = section.title === 'Incoming' ?
                showCurrentDaySectionInCalendar :
                goToSearchEventsWithSelectedSection;
            return (
                <TouchableOpacity onPress={onPress}>
                    {seeAll}
                </TouchableOpacity>
            );
        } else if (item === noEventsForThisCategory) {
            return (
                <View style={styles.noEventsContainer}>
                    <AppText>Aucun évènement.</AppText>
                </View>
            );
        }
        else {
            return (
                <View style={styles.eventCardContainer}>
                    <EventCard
                        eventId={item.id}
                        navigator={this.props.navigator}
                    />
                </View>
            );
        }
    }

    _renderSectionHeader(section) {
        return (
            <View style={styles.sectionContainer}>
                <AppText style={styles.sectionText}>{section.title}</AppText>
            </View>
        );
    }
}

DiscoverTab.propTypes = {
    goToCalendarTab: PropTypes.func.isRequired,
    goToSearchEvents: PropTypes.func.isRequired,
    showCurrentDaySection: PropTypes.func.isRequired,
};

const borderWidth = 3;
const borderRadius = 8;
const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: 10,
        backgroundColor: colors.lighterBlue,
    },
    eventCardContainer: {
        borderLeftWidth: borderWidth,
        borderRightWidth: borderWidth,
        borderColor: colors.blue,
    },
    noEventsContainer: {
        height: 40,
        paddingLeft: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noEventsText: {},
    seeAllContainer: {
        backgroundColor: colors.blue,
        borderBottomLeftRadius: borderRadius,
        borderBottomRightRadius: borderRadius,
    },
    sectionContainer: {
        backgroundColor: colors.blue,
        height: 30,
        marginTop: 10,
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
        justifyContent: 'center',
    },
    sectionText: {
        color: 'white',
        paddingLeft: 20,
        fontSize: 20,
    },
    body: {
        flex: 0,
        flexDirection: 'column',
        paddingBottom: 10,
        marginTop: 20,
    },
    searchBar: {
        flex: 0,
        flexDirection: 'row',
    },
    icon: {
        fontSize: 24,
        height: 22,
        color: 'white',
    },
});