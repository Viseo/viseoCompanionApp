import {Navigation} from 'react-native-navigation';
import {Action} from './Action';

export default function (store, provider) {
    Navigation.registerComponent('actions.CreateAction', () => Action, store, provider);
}