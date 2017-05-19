import React, {Component} from 'react';
import {Text, View} from "react-native";
import VisibleEventList from "./containers/VisibleEvents";

export default class NewsFeed extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text>All the great stuff in one place!</Text>
                <VisibleEventList style={{flex: 1}} navigator={this.props.navigator}/>
            </View>
        );
    }
}