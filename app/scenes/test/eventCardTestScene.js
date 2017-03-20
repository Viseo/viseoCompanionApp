/**
 * Created by AAB3605 on 10/03/2017.
 */
import React, {Component} from 'react';
import {View, Text, TouchableHighlight, Picker, StyleSheet, AppState} from 'react-native';
import EventCard from '../../components/eventView/eventCard';
import Event from '../../util/event';
import db from '../../util/db';

export default class EventCardTestScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            participating: false,
            userId: 1,
            eventId: 2,
        };
    }

    toggleParticipation = async () => {
        await !this.state.participating ?
            db.addEventParticipant(this.state.eventId, this.state.userId) :
            db.removeEventParticipant(this.state.eventId, this.state.userId);
        this.setState({
            participating: !this.state.participating
        });
        return this.state.participating;
    }

    render() {
        let event = new Event(
            0,
            'my awesome event',
            'is about having fun tonight',
            'on Jan 19th',
            'my place'
        );

        return (
            <View>
                <EventCard
                    data={event}
                    participating={true}
                    toggleParticipation={this.toggleParticipation}
                />
            </View>
        );
    }
}