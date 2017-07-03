import React, {Component} from 'react';
import SearchBar from './SearchBar';
import {View} from 'react-native';
import EventList from './EventList.container';

export default class SearchEvents extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <SearchBar/>
                <EventList/>
            </View>
        );
    }
}