import configureStore from "./store/configureStore.depreciated";
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens/index.depreciated';

const store = configureStore();
registerScreens(store, Provider);

Navigation.startTabBasedApp({
    tabs: [
        {
            label: 'Home',
            screen: 'SignIn',
            icon: require('./images/eye.png'),
        },
    ]
});