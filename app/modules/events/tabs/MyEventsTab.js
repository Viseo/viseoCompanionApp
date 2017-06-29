import {SectionList, StyleSheet, View} from 'react-native';
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
                renderItem={({item}) => (
                    <EventCard
                        eventId={item.id}
                        navigator={this.props.navigator}
                    />
                )}
                renderSectionHeader={({section}) => <AppText>{section.title}</AppText>}
                SectionSeparatorComponent={() => <View style={{height: 20}}/>}
                keyExtractor={(item, index) => item.id}
                sections={this.props.events}
            />
        );
    }
}

MyEventsTab.propTypes = {
}

function breakDownIntoSections(events, user) {
    let hosted = events.filter(event => event.host.id === user.id);
    let hostedSection = {data: hosted, title: 'Hosted'};

    let going = events.filter(
        event => (event.datetime >= moment())
    );
    let goingSection = {data: going, title: 'Going'};

    let went = events.filter(
        event => (event.datetime < moment())
    );
    let wentSection = {data: went, title: 'Went'};
    return [
        hostedSection,
        goingSection,
        wentSection
    ];
}

const mapStateToProps = ({events, user}, ownProps) => ({
    events: breakDownIntoSections(events.items, user),
    user,
});

export default connect(mapStateToProps, null)(MyEventsTab);