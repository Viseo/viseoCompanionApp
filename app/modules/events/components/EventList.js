import React, {Component} from 'react';
import {ListView, RefreshControl, View} from 'react-native';
import EventCard from './EventCard';
import AppText from '../../global/AppText';
import moment from 'moment';
import colors from '../../global/colors';
import {defaultNavBarStyle} from '../../global/navigatorStyle';

export default class EventList extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => {
                if (this.props.searchWords) {
                    return true;
                }
                for (let key in r1) {
                    if (!r2.hasOwnProperty(key))
                        return true;
                    if (r1[key] !== r2[key])
                        return true;
                }
                return false;
            },
        });
        this.state = {
            dataSource: ds.cloneWithRows(this.props.events),
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.events),
        });
    }

    componentWillMount() {
        this.props.refresh(this.props.user);
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
                            this.props.refresh(this.props.user);
                        }}
                    />
                }
                scrollEventThrottle={200}
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                renderRow={this.renderEventCard}
            />
        );
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
        );
        return (
            <View style={[{flex: 1, flexDirection: 'column'}, this.props.style]}>
                {
                    this.state.dataSource.getRowCount() > 0 || this.props.refreshing ?
                        eventList :
                        nothingToShow
                }
            </View>
        );
    }

    renderEventCard = (event) => {
        let [day, time] = this.formatDate(event.date);
        let {user} = this.props;
        let edited = user.id === event.host.id;
        return (
            <EventCard
                name={event.name}
                description={event.description}
                location={event.location}
                day={day}
                time={time}
                date={event.date}
                participating={event.participating}
                categoryId={event.category}
                onParticipationChange={() => {
                    this.props.toggleParticipation(event, user);
                }}
                onPress={() => this._showEventDetails(event)}
                searchWords={this.props.searchWords}
                navigator={this.props.navigator}
            />
        );
    };

    _showEventDetails(event) {
        this.props.navigator.push({
            title: 'Détails de l\'évènement',
            screen: 'events.event',
            navigatorStyle: defaultNavBarStyle,
            passProps: {
                hostFirstName: 'nom',
                hostLastName: 'prénom',
                id: event.id,
                location: event.location,
                name: event.name,
                numberOfParticipants: -1,
                description: event.description,
                imageUrl: event.images,
            },
        });
    }
}

EventList.displayName = 'EventList';