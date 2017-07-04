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
                renderItem={({item}) => this._renderEventCard(item)}
                renderSectionHeader={({section}) => <AppText>{section.title}</AppText>}
                SectionSeparatorComponent={() => <View style={{height: 20}}/>}
                keyExtractor={(item, index) => item.id}
                sections={this.props.events}
            />
        );
    }

    _renderEventCard(item) {
        if (item === 'seeAll') {
            return (
                <TouchableOpacity onPress={() => this.props.goToTab(1)}>
                    <Text style={{textAlign: 'center'}}>
                        see all
                    </Text>
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
}

MyEventsTab.propTypes = {
}

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
        wentSection
    ];
}

const mapStateToProps = ({events, user}, ownProps) => ({
    events: breakDownIntoSections(events, user),
    user,
});

export default connect(mapStateToProps, null)(MyEventsTab);