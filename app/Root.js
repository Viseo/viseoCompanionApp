import configureStore from "./store/configureStore";
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './modules/global/registerScreens';

const store = configureStore();
registerScreens(store, Provider);

Navigation.startSingleScreenApp({
    screen: {
        screen: 'appLoader.splashScreen',
    },
    animationType: 'fade',
});