import configureStore from "./store/configureStore";
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './modules/global/registerScreens';

const chatMessages = [
    {type: 'received', message: 'I am a received message'},
    {type: 'sent', message: 'I am a sent message'},
    {type: 'received', message: 'I am a received message'},
];

const preloadedState = {
    live: {
        chatMessages,
    },
};

const store = configureStore(preloadedState);
registerScreens(store, Provider);

Navigation.startSingleScreenApp({
    screen: {
        screen: 'appLoader.splashScreen',
    },
    animationType: 'fade',
});