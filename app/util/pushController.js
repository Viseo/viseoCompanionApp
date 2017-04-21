import React, {Component} from "react";
import {Platform, AppState} from "react-native";
import FCM, {
    FCMEvent,
    RemoteNotificationResult,
    WillPresentNotificationResult,
    NotificationType
} from "react-native-fcm";
import moment from "moment";


export default class PushController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appState: AppState.currentState
        }
    }

    componentDidMount() {
        FCM.requestPermissions();
        FCM.getFCMToken();

        if (Platform.OS === 'ios') {
            FCM.subscribeToTopic("/topics/newEventIOS");
        } else {
            FCM.subscribeToTopic("/topics/newEventAndroid");
        }

        this.notificationListner = FCM.on(FCMEvent.Notification, notif => {
            FCM.setBadgeNumber(1);
            if (notif.local_notification) {
                return;
            }
            if (notif.opened_from_tray) {
                FCM.setBadgeNumber(0);
                FCM.removeAllDeliveredNotifications();
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
            if (!AppState.currentState.match(/inactive|background/)) {
                this.showLocalNotification(notif);
            }
        });
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
            fire_date: moment(event.date).hour(8).minute(0).toDate().getTime(),
            id: event.id + "day",
            title: "Rappel : " + event.name,
            body: "Aujourd'hui à " + moment(event.date).format("h[h]mm"),
            icon: "ic_notif",
            large_icon: "ic_launcher",
            "show_in_foreground": true,
            priority: "high",
        }
    );
    FCM.scheduleLocalNotification(
        {
            fire_date: moment(event.date).subtract(15, 'minute').toDate().getTime(),
            id: event.id + "min",
            title: "Dans 15min : " + event.name,
            body: "Lieu : " + event.location,
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
};