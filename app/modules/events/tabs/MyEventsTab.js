import {SectionList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';
import colors from '../../global/colors';
import AppText from '../../global/components/AppText';
import EventCard from '../EventCard';
import PropTypes from 'prop-types';
import {noEventsForThisCategory} from './util';

export default class MyEventsTab extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SectionList
                style={styles.mainContainer}
                renderItem={({item}) => this._renderEventCard(item)}
                renderSectionHeader={({section}) => this._renderSectionHeader(section)}
                keyExtractor={(item, index) => item.id}
                sections={this.props.events}
            />
        );
    }

    _renderEventCard(item) {
        if (item === 'seeAll') {
            return (
                <TouchableOpacity onPress={() => this.props.goToCalendarTab()}>
                    <View style={styles.seeAllContainer}>
                        <Text style={{textAlign: 'center', color: 'white'}}>
                            Voir plus...
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        } else if (item === noEventsForThisCategory) {
            return (
                <View style={styles.noEventsContainer}>
                    <AppText>Aucun évènement.</AppText>
                </View>
            );
        } else {
            return (
                <EventCard
                    eventId={item.id}
                    navigator={this.props.navigator}
                />
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

MyEventsTab.propTypes = {
    events: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
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
    },
    sectionText: {
        color: 'white',
        paddingLeft: 20,
        fontSize: 20,
    },
    noEventsContainer: {
        height: 40,
        paddingLeft: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    body: {
        flex: 0,
        flexDirection: 'column',
        paddingBottom: 10,
        marginTop: 20,
        marginBottom: 20,
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