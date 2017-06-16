import { Navigation } from 'react-native-navigation';
import registerAppLoader from '../appLoader/registerScreens';
import registerEventsModule from '../events/registerScreens';
import registerNewsFeedModule from '../newsFeed/registerScreens';
import registerNotificationsModule from '../notifications/registerScreens';
import registerShopModule from '../shop/registerScreens';
import registerUserModule from '../user/registerScreens';
import registerVizzModule from '../vizz/registerScreens';
import registerNotationModule from '../notation/registerScreens';
import UnreachableServerPopup from './UnreachableServerPopup';

export function registerScreens(store, provider) {
    registerAppLoader(store, provider);
    registerEventsModule(store, provider);
    registerNewsFeedModule(store, provider);
    registerNotificationsModule(store, provider);
    registerShopModule(store, provider);
    registerUserModule(store, provider);
    registerVizzModule(store, provider);
    registerNotationModule(store,provider),

    Navigation.registerComponent('global.unreachableServerPopup', () => UnreachableServerPopup);
}
