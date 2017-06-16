import React, {Component} from 'react';
import {connect} from 'react-redux';
import {defaultNavBarStyle} from '../global/navigatorStyle';
import {Navigation} from  'react-native-navigation';
import ProfileDetails from './ProfileDetails';

class MyProfile extends Component {

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    render() {
        return (
            <ProfileDetails user={this.props.user}/>
        );
    }

    onNavigatorEvent(event) {
        if (event.id === 'edit') {
            this._goToEditProfile();
        } else if (event.id === 'signOut') {
            this._signOut();
        }
    }

    _goToEditProfile() {
        this.props.navigator.push({
            screen: 'EditUserProfile',
            title: 'Modifier mon profil',
            navigatorStyle: defaultNavBarStyle,
        });
    }

    _signOut() {
        Navigation.showLightBox({
            screen: "user.authentication.signOut",
            style: {
                backgroundBlur: "dark",
                backgroundColor: "#135caa70"
            }
        });
    }
}

MyProfile.navigatorButtons = {
    rightButtons: [
        {
            icon: require('../../images/navigation/signOut.png'),
            id: 'signOut',
        },
        {
            icon: require('../../images/navigation/edit.png'),
            id: 'edit',
        },
    ],
};

MyProfile.navigatorStyle = defaultNavBarStyle;

const mapStateToProps = ({user}, ownProps) => ({
    user,
    ...ownProps,
});

export default connect(
    mapStateToProps,
)(MyProfile);