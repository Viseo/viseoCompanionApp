import { Navigation } from 'react-native-navigation';
import Notifications from "./Notifications";

export default function(store, provider) {
    Navigation.registerComponent('Notifications', () => Notifications, store, provider);
}