import { Navigation } from 'react-native-navigation';
import SignIn from './../containers/SignInForm';

export function registerScreens(store, provider) {
    Navigation.registerComponent('SignIn', () => SignIn, store, provider);
}