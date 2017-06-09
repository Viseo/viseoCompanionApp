import { Navigation } from 'react-native-navigation';
import Comments from "../events/Comments";
import CreateComment from "../events/CreateComment";
import registerAppLoader from '../appLoader/registerScreens';
import registerEventsModule from '../events/registerScreens';
import registerNewsFeedModule from '../newsFeed/registerScreens';
import registerNotificationsModule from '../notifications/registerScreens';
import registerShopModule from '../shop/registerScreens';
import registerUserModule from '../user/registerScreens';
import registerVizzModule from '../vizz/registerScreens';
import UnreachableServerPopup from './UnreachableServerPopup';

export function registerScreens(store, provider) {
    registerAppLoader(store, provider);
    registerEventsModule(store, provider);
    registerNewsFeedModule(store, provider);
    registerNotificationsModule(store, provider);
    registerShopModule(store, provider);
    registerUserModule(store, provider);
    registerVizzModule(store, provider);

    Navigation.registerComponent('Comments', () => Comments, store, provider);
    Navigation.registerComponent('CreateComment', () => CreateComment, store, provider);
    Navigation.registerComponent('global.unreachableServerPopup', () => UnreachableServerPopup);
}
