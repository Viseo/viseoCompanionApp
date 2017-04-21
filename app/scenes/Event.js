/**
 * Created by AAB3605 on 10/04/2017.
 */
import React, {Component} from "react";
import {View, Stylesheet, Platform} from "react-native";
import EventInfo from "./../containers/EventInfo";

export default class Event extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return(
            <View style={{flex:1, flexDirection:'column', marginTop: (Platform.OS === 'ios') ? 20 : 0}}>
                <EventInfo navigator={this.props.navigator} id={this.props.id}/>
            </View>
        )
    }
}