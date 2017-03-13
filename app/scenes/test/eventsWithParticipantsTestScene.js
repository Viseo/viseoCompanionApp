/**
 * Created by AAB3605 on 10/03/2017.
 */
import React, {Component} from 'react';
import {View, ListView, Text, TouchableHighlight, Picker, StyleSheet, AppState} from 'react-native';
import EventCard from '../../components/eventCard';
import db from '../../util/db';

export default class EventsWithParticipantsTestScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: 1,
            filteredEvents: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 = !row2,
            })
        };
    }

    componentDidMount() {
        this.loadEvents();
    }

    loadEvents = async() => {
        let filteredEvents = await db.getEventsWithParticipant(this.state.userId);
        this.setState({
            filteredEvents: this.state.filteredEvents.cloneWithRows(filteredEvents),
        });
    }

    render() {
        return (
            <View>
                {this.renderEventCards()}
            </View>
        );
    }

    renderEventCards = () => {
        return this.state.filteredEvents ?
            (
                <ListView
                    dataSource={this.state.filteredEvents}
                    renderRow={this.renderEventCard}
                />
            ) :
            (
                <View>
                    <Text>{"This user isn't going to any events."}</Text>
                </View>
            );
    }

    renderEventCard = event => {
        return (
            <View>
                <EventCard
                    data={event}
                    toggleParticipation={() => {}}
                />
            </View>
        );
    }
}