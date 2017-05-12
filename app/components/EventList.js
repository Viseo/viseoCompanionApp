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
import EventCard from './events/eventCard'
import AppText from './appText'
import moment from 'moment'
import colors from './colors'

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

    componentWillMount() {
        this.props.refresh(this.props.user)
    }

    formatDate(date) {
        if (!date)
            return [];
        let dateTime = moment(date);
        return dateTime.calendar().split('/');
    }

    render() {
        const eventList = (
            <ListView
                refreshControl={
                    <RefreshControl
                        refreshing={this.props.refreshing}
                        onRefresh={() => {
                            this.props.refresh(this.props.user)
                        }}
                    />
                }
                scrollEventThrottle={200}
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                renderRow={this.renderEventCard}
            />
        )
        const nothingToShow = (
            <AppText
                style={{
                    textAlign: 'center',
                    color: colors.mediumGray,
                    backgroundColor: 'white',
                    height: 50,
                    borderRadius: 4,
                    textAlignVertical: 'center',
                    fontSize: 18,
                }}
            >
                Aucun évènement.
            </AppText>
        )
        return (
            <View style={[{flex: 1, flexDirection: 'column'}, this.props.style]}>
                {
                    this.state.dataSource.getRowCount() > 0 || this.props.refreshing ?
                        eventList :
                        nothingToShow
                }
            </View>
        )
    }

    renderEventCard = (event) => {
        let [day, time] = this.formatDate(event.date);
        let {user} = this.props;
        let edited = user.id === event.host.id ? true : false;
        let participating = user.id === event.host.id ? true : false;
        return (
            <EventCard
                name={event.name}
                description={event.description}
                location={event.location}
                day={day}
                time={time}
                participating={event.participating}
                categoryId={event.category}
                onParticipationChange={() => {
                    this.props.toggleParticipation(event, user)
                }}
                onPress={() => {
                    this.props.navigator.push({
                        title: 'Event',
                        passProps: {
                            id: event.id,
                            edit: edited,
                            participate: participating,
                            onParticipationChange: () => {
                                this.props.toggleParticipation(event, user)
                            }
                        }
                    });
                }}
                searchWords={this.props.searchWords}
            />
        );
    }
}

EventList.displayName = 'EventList'