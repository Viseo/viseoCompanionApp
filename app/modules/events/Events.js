import React, {Component} from 'react';
import {defaultNavBarStyle} from '../global/navigatorStyle';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Calendar from './tabs/CalendarTab.container';
import MyEvents from './tabs/MyEventsTab';
import DiscoverTab from './tabs/DiscoverTab.container';

export default class Events extends Component {

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    render() {
        return (
            <ScrollableTabView
                onChangeTab={({i, ref}) => this._onChangeTab(i, ref)}
            >
                <DiscoverTab
                    tabLabel="discover"
                    navigator={this.props.navigator}
                    goToTab={(tabIndex) => this.goToTab(tabIndex)}
                    goToSearchEvents={() => this.goToSearchEvents()}
                />
                <Calendar
                    ref={(ref) => {this.calendarTab = ref;}}
                    tabLabel="calendar"
                    navigator={this.props.navigator}
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

    goToTab(tabIndex) {
        this.tabView.goToPage(tabIndex);
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

    _onChangeTab(tabIndex, tabRef) {
        const calendarTabIndex = 1;
        if(tabIndex === calendarTabIndex) {
            console.warn('here');
            this.calendarTab.getWrappedInstance().scrollToEvent();
        }
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
        }
    ],
};