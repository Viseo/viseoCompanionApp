import React, {Component} from "react";
import {View, Dimensions, Platform} from "react-native";
import EventInfo from "./../containers/EventInfo";

const {height} = Dimensions.get('window');

export default class Event extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return(
            <View style={{height, marginTop: (Platform.OS === 'ios') ? 20 : 0}}>
                <EventInfo
                    navigator={this.props.navigator}
                    id={this.props.id}
                    canEdit={this.props.edit}
                    canParticipate={this.props.participate}
                />
            </View>
        )
    }
}