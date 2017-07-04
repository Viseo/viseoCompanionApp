import {SectionList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import colors from '../../global/colors';
import AppText from '../../global/components/AppText';
import EventCard from '../EventCard';
import moment from 'moment';

class MyEventsTab extends Component {

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
                <TouchableOpacity onPress={() => this.props.goToTab(1)}>
                    <View style={styles.seeAllContainer}>
                        <Text style={{textAlign: 'center', color: 'white'}}>
                            see all
                        </Text>
                    </View>
                </TouchableOpacity>
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

MyEventsTab.propTypes = {};

function breakDownIntoSections(events, user) {

    let hosted = events.items.filter(event => event.host.id === user.id);
    if (hosted.length > 3) {
        hosted = hosted.slice(0, 3);
        hosted.push('seeAll');
    }
    let hostedSection = {data: hosted, title: 'Hosted'};

    let going = events.items.filter(event => (event.datetime >= moment()));
    if (going.length > 3) {
        going = going.slice(0, 3);
        going.push('seeAll');
    }
    let goingSection = {data: going, title: 'Going'};

    let went = events.itemsExpired.filter(event => (event.datetime < moment()));
    if (went.length > 3) {
        went = went.slice(0, 3);
        went.push('seeAll');
    }
    let wentSection = {data: went, title: 'Went'};

    return [
        hostedSection,
        goingSection,
        wentSection,
    ];
}

const mapStateToProps = ({events, user}, ownProps) => ({
    events: breakDownIntoSections(events, user),
    user,
});

export default connect(mapStateToProps, null)(MyEventsTab);

const borderWidth = 3;
const borderRadius = 8;
const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: 15,
        backgroundColor: colors.lightGray,
    },
    eventCardContainer: {
        borderLeftWidth: borderWidth,
        borderRightWidth: borderWidth,
        borderColor: colors.red,
    },
    seeAllContainer: {
        backgroundColor: colors.red,
        borderBottomLeftRadius: borderRadius,
        borderBottomRightRadius: borderRadius,
    },
    sectionContainer: {
        backgroundColor: colors.red,
        height: 30,
        marginTop: 20,
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