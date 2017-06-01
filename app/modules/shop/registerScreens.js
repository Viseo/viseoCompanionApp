import { Navigation } from 'react-native-navigation';
import Shop from "./Shop";

export default function(store, provider) {
    Navigation.registerComponent('Shop', () => Shop, store, provider);
}