/**
 * Created by VBO3596 on 18/04/2017.
 */
import React, {Component} from "react";
import {Platform, Stylesheet, View} from "react-native";
import UserProfileInfo from "./../containers/UserProfileInfo";

export default class UserProfile extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column', marginTop: (Platform.OS === 'ios') ? 20 : 0}}>
                <UserProfileInfo navigator={this.props.navigator}/>
            </View>
        )
    }
}