import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import VisibleEventList from '../../modules/newsFeed/containers/VisibleEvents';
import SearchBar from './../../components/SearchBar';
import ItemSpacer from '../global/components/ItemSpacer';
import colors from '../../modules/global/colors';
import PushController from '../global/pushController';
import {defaultNavBarStyle} from '../global/navigatorStyle';

export default class Events extends Component {

    static defaultProps = {
        user: {id: 1},
    };

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <PushController/>
                <View style={styles.body}>
                    <View style={styles.searchBar}>
                        <ItemSpacer/>
                        <SearchBar style={{flex: 22}}/>
                        <ItemSpacer/>
                    </View>
                </View>
                <VisibleEventList style={{flex: 22}} navigator={this.props.navigator}/>
            </View>
        );
    }

    onNavigatorEvent(event) {
        if (event.id === 'addEvent') {
            this._goToAddEvent();
        } else if (event.id === 'pastEvents') {
            this._goToPastEvents();
        }
    }

    _goToAddEvent() {
        this.props.navigator.push({
            screen: 'events.createEvent',
            title: 'Nouvel évènement',
            navigatorStyle: defaultNavBarStyle,
        });
    }

    _goToPastEvents() {
        this.props.navigator.push({
            screen: 'events.pastEvents',
            title: 'Evènements passés',
            navigatorStyle: defaultNavBarStyle,
        });
    }
}

Events.navigatorButtons = {
    rightButtons: [
        {
            icon: require('../../images/navigation/history.png'),
            id: 'pastEvents',
        },
        {
            icon: require('../../images/navigation/add.png'),
            id: 'addEvent',
        },
    ],
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.blue,
        padding: 8,
        paddingBottom: 0,
        paddingTop: 0,
    },
    body: {
        flex: 0,
        flexDirection: 'column',
        paddingBottom: 10,
        marginTop: 20,
    },
    searchBar: {
        flex: 0,
        flexDirection: 'row',
    },
    icon: {
        fontSize: 24,
        height: 22,
        color: 'white',
    },
});