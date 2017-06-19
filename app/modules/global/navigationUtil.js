import {Navigation} from 'react-native-navigation';

export function hideTabBar(navigator) {
    navigator.toggleTabs({
        to: 'hidden',
    });
}

export function showInvalidFormPopup() {
    Navigation.showLightBox({
        screen: 'global.invalidFormPopup',
        style: {
            backgroundBlur: 'dark',
            backgroundColor: '#135caa70',
        },
    });
}

export function showTabBar(navigator) {
    navigator.toggleTabs({
        to: 'shown',
    });
}

export function showUnreachableServerPopup() {
    Navigation.showLightBox({
        screen: 'global.unreachableServerPopup',
        style: {
            backgroundBlur: 'dark',
            backgroundColor: '#135caa70',
        },
    });
}