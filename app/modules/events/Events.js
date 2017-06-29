import React, {Component} from 'react';
import {defaultNavBarStyle} from '../global/navigatorStyle';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import CalendarTab from './tabs/CalendarTab.container';
import MyEventsTab from './tabs/MyEventsTab';
import DiscoverTab from './tabs/DiscoverTab';

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
                <DiscoverTab tabLabel="discover" navigator={this.props.navigator}/>
                <CalendarTab
                    ref={(ref) => {this.calendarTab = ref;}}
                    tabLabel="calendar" navigator={this.props.navigator}/>
                <MyEventsTab tabLabel="myEvents"/>
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
};