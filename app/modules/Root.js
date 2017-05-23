import configureStore from "../store/configureStore";
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from '../screens/index';

const store = configureStore();
registerScreens(store, Provider);

Navigation.startTabBasedApp({
    tabs: [
        {
            label: 'Home',
            screen: 'AppLoader',
            icon: require('../images/eye.png'),
            title: 'Actualités'
        },
    ]
});