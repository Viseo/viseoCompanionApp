import {Navigation} from 'react-native-navigation';
import Action from './Action';
import Actions from './Actions';

export default function (store, provider) {
    Navigation.registerComponent('actions.CreateAction', () => Action, store, provider);
    Navigation.registerComponent('actions.Actions', () => Actions, store, provider);
}