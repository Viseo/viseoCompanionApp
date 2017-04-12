import React, {Component} from "react";

import {Platform} from 'react-native';

import FCM, {
    FCMEvent,
    RemoteNotificationResult,
    WillPresentNotificationResult,
    NotificationType
} from "react-native-fcm";

import moment from 'moment';


export default class PushController extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        FCM.requestPermissions();
        FCM.getFCMToken();
        this.notificationListner = FCM.on(FCMEvent.Notification, notif => {
            if (notif.local_notification) {
                return;
            }
            if (notif.opened_from_tray) {
                return;
            }
            if (Platform.OS === 'ios') {
                switch (notif._notificationType) {
                    case NotificationType.Remote:
                        notif.finish(RemoteNotificationResult.NewData); //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
                        break;
                    case NotificationType.NotificationResponse:
                        notif.finish();
                        break;
                    case NotificationType.WillPresent:
                        notif.finish(WillPresentNotificationResult.All); //other types available: WillPresentNotificationResult.None
                        break;
                }
            }
            this.showLocalNotification(notif);
        });
        FCM.subscribeToTopic("/topics/newEvent");
    }

    componentWillUnmount() {
        this.notificationListner.remove();
    }

    showLocalNotification(notif) {
        FCM.presentLocalNotification({
            body: notif.body,
            title: notif.title,
            status: notif.status,
            sound: "default",
            "show_in_foreground": true,
            priority: "high",
            vibrate: 300,
            "lights": true,
            icon: "ic_notif",
            "large_icon": "ic_launcher",
            id: notif.id,
        });
    }

    render() {
        return null;
    }
}

PushController.scheduleEventSnoozes = (event) => {
    FCM.scheduleLocalNotification(
        {
            fire_date: moment().year(moment(event.date).year()).month(moment(event.date).month()).date(moment(event.date).day()).hour(8).valueOf(),
            id: event.id + "day",
            title: "Rappel : " + event.name,
            body: event.name,
            icon: "ic_notif",
            large_icon: "ic_launcher",
            "show_in_foreground": true,
            priority: "high",
        }
    );
    FCM.scheduleLocalNotification(
        {
            fire_date: moment(event.date).subtract(15, 'minute'),
            id: event.id + "min",
            title: "Rappel : " + event.name,
            body: event.name,
            icon: "ic_notif",
            large_icon: "ic_launcher",
            "show_in_foreground": true,
            priority: "high",
        }
    );
};

PushController.unscheduleEventSnoozes = (event) => {
    FCM.cancelLocalNotification(event.id + "day");
    FCM.cancelLocalNotification(event.id + "min");
}