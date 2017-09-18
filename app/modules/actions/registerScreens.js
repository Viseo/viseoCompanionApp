import {Navigation} from 'react-native-navigation';
import VizzManagement from '../vizz/VizzManagement';
import Events from "../events/Events";
import CreateAction from './CreateAction';

export default function (store, provider) {
    Navigation.registerComponent('VizzManagement', () => VizzManagement, store, provider);
    Navigation.registerComponent('events.events', () => Events, store, provider);

    Navigation.registerComponent('actions.CreateAction', () => CreateAction,store, provider);
}