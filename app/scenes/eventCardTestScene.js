/**
 * Created by AAB3605 on 10/03/2017.
 */
import React, {Component} from 'react';
import {View, Text, TouchableHighlight, Picker, StyleSheet, AppState} from 'react-native';
import EventCard from './../components/eventCard';
import Event from './../util/event';

export default class EventCardTestScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            participating: false
        };
    }

    toggleParticipation = () => {
        this.setState({
            participationg: !this.state.participating
        });
        return this.state.participating;
    }

    render() {
        let event = new Event(
            0,
            'name',
            'description',
            'date',
            'location'
        );

        return (
            <View>
                <EventCard
                    data={event}
                    toggleParticipation={this.toggleParticipation}
                />
            </View>
        );
    }
}