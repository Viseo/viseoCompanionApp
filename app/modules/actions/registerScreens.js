import {Navigation} from 'react-native-navigation';
import Action from './Action';
import VizzManagement from '../vizz/VizzManagement';

export default function (store, provider) {
    Navigation.registerComponent('actions.CreateAction', () => Action, store, provider);
    Navigation.registerComponent('VizzManagement', () => VizzManagement, store, provider);
}