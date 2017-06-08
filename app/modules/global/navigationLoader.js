import {Navigation} from 'react-native-navigation';
import {defaultNavBarStyle, tabBarStyle} from './navigatorStyle';

export const startAppLoader = () => {
    Navigation.startSingleScreenApp({
        screen: {
            screen: 'appLoader.splashScreen',
        },
        animationType: 'fade',
    });
};

export const startApp = () => {
    Navigation.startTabBasedApp({
        tabs: [
            {
                label: 'Accueil',
                screen: 'NewsFeed',
                title: 'Fil d\'actualité',
                icon: require('../../images/navigation/home.png'),
                navigatorStyle: defaultNavBarStyle,
            },
            {
                label: 'Calendrier',
                screen: 'events.events',
                title: 'Evènements à venir',
                icon: require('../../images/navigation/calendar.png'),
                navigatorStyle: defaultNavBarStyle,
            },
            {
                label: 'Achats',
                screen: 'Shop',
                title: 'Catalogue',
                icon: require('../../images/navigation/shop.png'),
                navigatorStyle: defaultNavBarStyle,
            },
            {
                label: 'Portefeuille',
                screen: 'VizzManagement',
                title: 'Gestion de mes vizz',
                icon: require('../../images/navigation/vizz.png'),
                navigatorStyle: defaultNavBarStyle,
            },
            {
                label: 'Notifications',
                screen: 'Notifications',
                title: 'Mes notifications',
                icon: require('../../images/navigation/notifications.png'),
                navigatorStyle: defaultNavBarStyle,
            },
        ],
        tabsStyle: tabBarStyle,
        appStyle: tabBarStyle,
        navigatorStyle: defaultNavBarStyle,
        animationType: 'fade',
    });
};