import React, {Component} from 'react';
import {defaultNavBarStyle} from '../global/navigatorStyle';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Calendar from './tabs/CalendarTab.container';
import MyEvents from './tabs/MyEventsTab';
import DiscoverTab from './tabs/DiscoverTab.container';

export default class Events extends Component {

    calendarTabIndex = 1;

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    render() {
        return (
            <ScrollableTabView
                ref={(ref) => {
                    this.tabView = ref;
                }}
            >
                <DiscoverTab
                    tabLabel="discover"
                    navigator={this.props.navigator}
                    goToCalendarTab={() => this.goToCalendarTab()}
                    goToSearchEvents={() => this.goToSearchEvents()}
                />
                <Calendar
                    tabLabel="calendar"
                    navigator={this.props.navigator}
                    scrollToCurrentDaySection={false}
                />
                <MyEvents
                    tabLabel="myEvents"
                    navigator={this.props.navigator}
                />
            </ScrollableTabView>
        );
    }

    goToSearchEvents() {
        this.props.navigator.push({
            screen: 'events.searchEvents',
            navigatorStyle: {
                navBarHidden: true,
            },
            animated: true,
            animationType: 'slide-horizontal',
        });
    }

    goToCalendarTab() {
        this.tabView.goToPage(this.calendarTabIndex);
    }

    onNavigatorEvent(event) {
        if (event.id === 'addEvent') {
            this._goToAddEvent();
        } else if (event.id === 'searchBarVisible') {
            this.goToSearchEvents();
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
    rightButtons: [
        {
            icon: require('../../images/search-icon.png'),
            id: 'searchBarVisible',
        },
    ],
};