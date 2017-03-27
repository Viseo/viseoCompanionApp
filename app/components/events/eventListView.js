/**
 * Created by AAB3605 on 17/03/2017.
 */
import React, {Component} from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    ListView,
    Keyboard
} from 'react-native';
import EventCard from './eventCard';

export default class EventListView extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state = {
            dataSource: this.ds.cloneWithRows(this.props.events)
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: this.ds.cloneWithRows(nextProps.events)
        });
    }

    render() {
        return (
            <ListView
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                renderRow={this.renderEventCard}
                renderHeader={() => {return this.props.header}}
            />
        );
    }

    renderEventCard = event => {
        let fullDate = event.getDateToString();
        let [day, time] = fullDate.split(' ');
        return (
            <EventCard
                name={event.name}
                description={event.description}
                location={event.location}
                day={day}
                time={time}
                participating={event.participating}
                categoryId={event.category}
                onParticipationChange={async () => { await this.props.onParticipationChange(event)}}
                onPress={() => {this.props.onPressEventCard(event)}}
                searchWords={event.searchWords}
            />
        );
    }

}