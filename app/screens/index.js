import { Navigation } from 'react-native-navigation';
import NewsFeed from "../modules/newsFeed/Newsfeed";
import AppLoader from "../modules/appLoader/AppLoader";
import SignIn from "../modules/authentication/SignIn";

export function registerScreens(store, provider) {
    Navigation.registerComponent('NewsFeed', () => NewsFeed, store, provider);
    Navigation.registerComponent('AppLoader', () => AppLoader, store, provider);
    Navigation.registerComponent('SignIn', () => SignIn, store, provider);
}