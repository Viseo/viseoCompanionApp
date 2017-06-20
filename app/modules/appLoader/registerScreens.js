import {Navigation} from 'react-native-navigation';
import SplashScreen from './SplashScreen';

export default function (store, provider) {
    Navigation.registerComponent('appLoader.splashScreen', () => SplashScreen, store, provider);
}