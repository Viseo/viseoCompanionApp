/**
 * Created by HEL3666 on 11/05/2017.
 */
import React, {Component} from "react";
import {ListView, Button, RefreshControl, View} from "react-native";
import EventCardExp from "./events/eventCardExp";
import AppText from "../modules/global/components/AppText";
import moment from "moment";
import ActionButton from "./../components/actionButton/ActionButton";
import colors from "../modules/global/colors";
import {defaultNavBarStyle} from "../modules/global/navigatorStyle";

export default class EventListExp extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => {
                if (this.props.searchWords) {
                    return true
                }
                for (let key in r1) {
                    if (!r2.hasOwnProperty(key))
                        return true;
                    if (r1[key] !== r2[key])
                        return true
                }
                return false
            }
        });
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
        const eventListExp = (
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
                renderRow={this.renderEventCardExp}
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
                        eventListExp :
                        nothingToShow
                }
            </View>
        )
    }
    renderEventCardExp = (event) => {
        let [day, time] = this.formatDate(event.date);
        let userId=this.props.user.id;
        let participating = event.participants.filter(function(element) {
                return element.id==userId;
            }).length>0;
        return (
            <EventCardExp
                name={event.name}
                description={event.description}
                location={event.location}
                day={day}
                time={time}
                participating={event.participating}
                categoryId={event.category}
                onPress={() => {
                    this.props.navigator.push({
                        screen: 'events.pastEvent',
                        title: "Détails de l'évènement",
                        navigatorStyle: defaultNavBarStyle,
                        passProps: {
                            id: event.id,
                            hostFirstName: event.host ? event.host.firstName : "Admin",
                            hostLastName: event.host ? event.host.lastName : "",
                            participating: participating
                        }
                    });
                }}
                searchWords={this.props.searchWords}
            />
        );
    };
}

EventListExp.displayName = 'EventList expired';
