/**
 * Created by VBO3596 on 18/04/2017.
 */
import React, {Component} from "react";
import {Platform, Stylesheet, View} from "react-native";
import UserProfileInfo from "./../containers/UserProfileInfo";

export default class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    render() {
        console.warn(this.props.user.firstName);
        return (
            <View style={{flex: 1, flexDirection: 'column', marginTop: (Platform.OS === 'ios') ? 20 : 0}}>
                <UserProfileInfo navigator={this.props.navigator}/>
            </View>
        )
    }

    onNavigatorEvent(event) {
        if (event.id === 'edit') {
            this._goToEditUserProfile();
        }
    }

    _goToEditUserProfile() {
        this.props.navigator.push({
            screen:'EditUserProfile',
            title:'Modifier mon profil',
        });
    }
}

UserProfile.navigatorButtons = {
    rightButtons: [
        {
            icon: require('../images/navigation/edit.png'),
            id: 'edit',
        }
    ]
};