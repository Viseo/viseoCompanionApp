import { Navigation } from 'react-native-navigation';
import SignIn from './../containers/SignInForm';
import SignUp from './../scenes/signUp';
import App from "../containers/App";
import Home from "../scenes/home";
import Notifications from "../modules/notifications/Notifications";
import Shop from "../modules/shop/Shop";
import VizzManagement from "../modules/vizz/VizzManagement";

export function registerScreens(store, provider) {
    Navigation.registerComponent('SignIn', () => SignIn, store, provider);
    Navigation.registerComponent('SignUp', () => SignUp, store, provider);
    Navigation.registerComponent('Home', () => Home, store, provider);
    Navigation.registerComponent('Notifications', () => Notifications, store, provider);
    Navigation.registerComponent('Shop', () => Shop, store, provider);
    Navigation.registerComponent('VizzManagement', () => VizzManagement, store, provider);
    Navigation.registerComponent('App', () => App, store, provider);
}