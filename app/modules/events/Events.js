import React, {Component} from 'react';
import {defaultNavBarStyle} from '../global/navigatorStyle';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Calendar from './tabs/CalendarTab.container';
import MyEvents from './tabs/MyEventsTab.container';
import Discover from './tabs/DiscoverTab.container';
import MyActions from './tabs/MyActionsTab.container';
import {Navigation} from 'react-native-navigation';

export default class Events extends Component {

    calendarTabIndex = 1;
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.state={
            defaultTab:this.props.tabId?this.props.tabId:0
        }
    }

    render() {
        return (
            <ScrollableTabView
                ref={(ref) => {
                    this.tabView = ref;
                }}
                initialPage={this.state.defaultTab}
                tabBarTextStyle={{fontSize: 13}}
            >
                <Discover
                    tabLabel="Découvrir"
                    navigator={this.props.navigator}
                    goToCalendarTab={() => this.goToCalendarTab()}
                    goToSearchEvents={() => this.goToSearchEvents()}
                />
                <Calendar
                    tabLabel="Calendrier"
                    navigator={this.props.navigator}
                    scrollToCurrentDaySection={false}
                />
                <MyEvents
                    tabLabel="Mes évènements"
                    goToCalendarTab={() => this.goToCalendarTab()}
                    navigator={this.props.navigator}
                />
                <MyActions
                    tabLabel="Mes actions"
                    goToCalendarTab={() => this.goToCalendarTab()}
                    navigator={this.props.navigator}
                />
            </ScrollableTabView>
        );
    }

    goToSearchEvents() {
        Navigation.showModal({
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
        Navigation.showModal({
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