import {Navigation} from 'react-native-navigation';
import registerAppLoader from '../appLoader/registerScreens';
import registerActionModule from '../actions/registerScreens';
import registerEventsModule from '../events/registerScreens';
import registerNewsFeedModule from '../newsFeed/registerScreens';
import registerNotificationsModule from '../notifications/registerScreens';
import registerShopModule from '../shop/registerScreens';
import registerUserModule from '../user/registerScreens';
import registerVizzModule from '../vizz/registerScreens';
import UnreachableServerPopup from './components/UnreachableServerPopup';
import InvalidFormPopup from './components/InvalidFormPopup';
import ModalButtons from './ModalButtons';
import CreateAction from '../actions/CreateAction';

export function registerScreens(store, provider) {
    registerAppLoader(store, provider);
    registerActionModule(store, provider);
    registerEventsModule(store, provider);
    registerNewsFeedModule(store, provider);
    registerNotificationsModule(store, provider);
    registerShopModule(store, provider);
    registerUserModule(store, provider);
    registerVizzModule(store, provider);
    Navigation.registerComponent('global.modalButtons', () => ModalButtons,store, provider);
    Navigation.registerComponent('actions.CreateAction', () => CreateAction,store, provider);
    Navigation.registerComponent('global.unreachableServerPopup', () => UnreachableServerPopup);
    Navigation.registerComponent('global.invalidFormPopup', () => InvalidFormPopup);
}
