/**
 * Created by LMA3606 on 22/02/2017.
 */

import React, {Component} from 'react';
import PushNotification from 'react-native-push-notification';

export default class PushController extends Component{
    componentDidMount(){
        PushNotification.configure({

            // (required) Called when a remote or local notification is opened or received
            onNotification: function(notification) {
                console.log( 'NOTIFICATION:', notification );
            },

        });
    }
    render(){
        return null;
    }
}