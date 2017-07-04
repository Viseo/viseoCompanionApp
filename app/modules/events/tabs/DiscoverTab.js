import React, {Component} from 'react';
import {SectionList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import EventList from '../EventList.container';
import SearchBar from '../../../components/SearchBar';
import ItemSpacer from '../../global/components/ItemSpacer';
import colors from '../../global/colors';
import PushController from '../../global/pushController';
import {connect} from 'react-redux';
import EventCard from '../EventCard';
import AppText from '../../global/components/AppText';
import PropTypes from 'prop-types';
import moment from 'moment';

class DiscoverTab extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        // todo integrate pushController in new architecture
        // todo move searchBar into the navBar
        // todo remove EventList from project
        const oldRender = (
            <View style={styles.mainContainer}>
                <PushController/>
                <View style={styles.body}>
                    <View style={styles.searchBar}>
                        <ItemSpacer/>
                        <SearchBar style={{flex: 22}}/>
                        <ItemSpacer/>
                    </View>
                </View>
                <EventList style={{flex: 22}} navigator={this.props.navigator}/>
            </View>
        );
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
        const seeAll = (
            <View style={styles.seeAllContainer}>
                <Text style={{textAlign: 'center', color: 'white'}}>
                    see all
                </Text>
            </View>
        );
        if (item === 'seeAllCalendar') {
            return (
                <TouchableOpacity onPress={() => this.props.goToTab(1)}>
                    {seeAll}
                </TouchableOpacity>
            );
        } else if (item === 'seeAllFilter') {
            return (
                <TouchableOpacity onPress={() => {
                    console.warn('filtre');
                }}>
                    {seeAll}
                </TouchableOpacity>
            );
        } else {
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
    goToTab: PropTypes.func.isRequired,
};

function breakDownIntoSections(events) {
    let incoming = events.filter(event => event.datetime > moment());
    if (incoming.length > 3) {
        incoming = incoming.slice(0, 3);
        incoming.push('seeAllCalendar');
    }
    let incomingSection = {data: incoming, title: 'Incoming'};

    let bbls = events.filter(event => event.category === 0);
    if (bbls.length > 3) {
        bbls = bbls.slice(0, 3);
        bbls.push('seeAllFilter');
    }
    let bblsSection = {data: bbls, title: 'BBLs'};

    let refreshes = events.filter(event => event.category === 1);
    if (refreshes.length > 3) {
        refreshes = refreshes.slice(0, 3);
        refreshes.push('seeAllFilter');
    }
    let refreshesSection = {data: refreshes, title: 'Refreshes'};

    return [
        incomingSection,
        bblsSection,
        refreshesSection,
    ];
}

const mapStateToProps = ({events}, ownProps) => ({
    events: breakDownIntoSections(events.items),
});

export default connect(mapStateToProps, null)(DiscoverTab);

const borderWidth = 3;
const borderRadius = 8;
const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: 15,
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
        height:30,
        marginTop:20,
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
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