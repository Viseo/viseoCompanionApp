import {Navigation} from 'react-native-navigation';
import {centerNavStyle, defaultNavBarStyle, tabBarStyle} from "./navigatorStyle";
import {iconsMap, iconsLoaded} from './appIcons';

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
                label: 'Portefeuille',
                screen: 'VizzManagement',
                title: 'Gestion de mes vizz',
                icon: require('../../images/navigation/vizz.png'),
                navigatorStyle: defaultNavBarStyle

            },
            {
                screen: 'global.modalButtons',
                title: '',
                icon: iconsMap['ios-add'],
                navigatorStyle: centerNavStyle,
                passProps:{show:true}

            },
            {
                label: 'Achats',
                screen: 'Shop',
                title: 'Catalogue',
                icon: require('../../images/navigation/shop.png'),
                navigatorStyle: defaultNavBarStyle,
            },
            {
                label: 'Evènements',
                screen: 'events.events',
                title: 'Evènements',
                icon: require('../../images/navigation/calendar.png'),
                navigatorStyle: defaultNavBarStyle,
            },
        ],
        tabsStyle: tabBarStyle,
        appStyle: tabBarStyle,
        navigatorStyle: defaultNavBarStyle,
        animationType: 'fade',
    });
};