/**
 * Created by AAB3605 on 29/03/2017.
 */
import React, {Component} from 'react'
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    ListView,
    Keyboard,
    TextInput,
    RefreshControl
} from 'react-native'
import EventCard from './eventCard'
import moment from 'moment'

export default class EventList extends Component {

    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => {
                if (this.props.searchWords) {
                    return true
                }
                for (let key in r1) {
                    if (!r2.hasOwnProperty(key))
                        return true
                    if (r1[key] !== r2[key])
                        return true
                }
                return false
            }
        })
        this.state = {
            dataSource: ds.cloneWithRows(this.props.events),
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.events)
        });
    }

    formatDate(date) {
        if (date)
            return null;
        let dateTime = moment(date);
        return dateTime.calendar();
    }

    render() {
        return (
            <View style={{flex:1, flexDirection:'column'}}>
                <ListView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.refreshing}
                            onRefresh={() => {this.props.refresh(this.props.user)}}
                        />
                    }
                    scrollEventThrottle={200}
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderEventCard}
                />
            </View>
        )
    }

    renderEventCard = (event) => {
        let fullDate = this.formatDate();
        let [day, time] = fullDate.split(' ');
        let {user} = this.props;
        return (
            <EventCard
                name={event.name}
                description={event.description}
                location={event.location}
                day={day}
                time={time}
                participating={event.participating}
                categoryId={event.category}
                onParticipationChange={() => {this.props.toggleParticipation(event, user)}}
                onPress={() => {
                    this.props.navigator.push({
                        title: 'EventDetails',
                        passProps: {
                            event,
                            onParticipationChange: () => {this.props.toggleParticipation(event, user)}
                        }
                    });
                }}
                searchWords={this.props.searchWords}
            />
        );
    }
}