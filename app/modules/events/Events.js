import React, {Component} from 'react';
import {defaultNavBarStyle} from '../global/navigatorStyle';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Calendar from './tabs/CalendarTab.container';
import MyEvents from './tabs/MyEventsTab';
import DiscoverTab from './tabs/DiscoverTab';

export default class Events extends Component {

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    render() {
        return (
            <ScrollableTabView>
                <DiscoverTab tabLabel="discover" navigator={this.props.navigator}/>
                <Calendar tabLabel="calendar" navigator={this.props.navigator}/>
                <MyEvents tabLabel="myEvents"/>
            </ScrollableTabView>
        );
    }

    onNavigatorEvent(event) {
        if (event.id === 'addEvent') {
            this._goToAddEvent();
        }
    }

    _goToAddEvent() {
        this.props.navigator.push({
            screen: 'events.createEvent',
            title: 'Nouvel évènement',
            navigatorStyle: defaultNavBarStyle,
        });
    }
}

Events.navigatorButtons = {
    leftButtons: [
        {
            icon: require('../../images/navigation/add.png'),
            id: 'addEvent',
        },
    ],
};