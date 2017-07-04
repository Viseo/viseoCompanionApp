import React, {Component} from 'react';
import {defaultNavBarStyle} from '../global/navigatorStyle';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Calendar from './tabs/CalendarTab.container';
import MyEvents from './tabs/MyEventsTab';
import DiscoverTab from './tabs/DiscoverTab.container';
import {StyleSheet} from 'react-native';

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
                    goToSearchEvents={() => this.goToSearchEvents()}
                />
                <Calendar tabLabel="calendar"/>
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

let styles = StyleSheet.create({
    searchBar: {
        flex: 0,
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: 4,
        borderWidth: 1.75,
        borderColor: 'white',
    },
    searchBarInput: {
        flex: 0,
        flexDirection: 'row',
    },
    searchInput: {
        flex: 9,
        backgroundColor: 'transparent',
    },
    filterToggle: {
        padding: 3,
    },
    filterContainer: {
        flexDirection: 'row',
        flex: 0,
        justifyContent: 'center',
    },
    fitImage: {
        flex: 0,
        width: 20,
        height: 20,
    },
});