import {Navigation} from 'react-native-navigation';
import VizzManagement from '../vizz/VizzManagement';

export default function (store, provider) {
    Navigation.registerComponent('VizzManagement', () => VizzManagement, store, provider);
}