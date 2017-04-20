/**
 * Created by VBO3596 on 18/04/2017.
 */
import React, {Component} from 'react'
import {
    View,
    Stylesheet
} from 'react-native'
import UserProfileInfo from './../containers/UserProfileInfo'

export default class UserProfile extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return(
            <View style={{flex:1, flexDirection:'column'}}>
                <UserProfileInfo navigator={this.props.navigator}/>
            </View>
        )
    }
}