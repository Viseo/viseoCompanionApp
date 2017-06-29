import React, {Component} from 'react';
import {defaultNavBarStyle} from '../global/navigatorStyle';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Calendar from './tabs/CalendarTab';
import MyEvents from './tabs/MyEventsTab';
import DiscoverTab from './tabs/DiscoverTab';

export default class Events extends Component {

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    render() {
        return (
            <ScrollableTabView
                ref={(tabView) => { this.tabView = tabView; }}
                tabBarBackgroundColor="#2E9AFE"
                tabBarActiveTextColor="#FFFFFF"
                tabBarInactiveTextColor="#FFFFFF"
            >
                <DiscoverTab
                    tabLabel="discover"
                    navigator={this.props.navigator}
                    goToTab={(tabIndex) => this.goToTab(tabIndex)}
                />
                <Calendar tabLabel="calendar"/>
                <MyEvents tabLabel="myEvents"/>
            </ScrollableTabView>
        );
    }

    goToTab(tabIndex) {
        this.tabView.goToPage(tabIndex);
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