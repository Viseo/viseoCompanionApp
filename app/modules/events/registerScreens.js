import { Navigation } from 'react-native-navigation';
import Events from "./Events";
import PastEvents from "./PastEvents";
import PastEvent from "./PastEvent";
import CreateEvent from "./CreateEvent";
import Event from './Event';

export default function(store, provider) {
    Navigation.registerComponent('events.event', () => Event, store, provider);
    Navigation.registerComponent('events.events', () => Events, store, provider);
    Navigation.registerComponent('events.pastEvents', () => PastEvents, store, provider);
    Navigation.registerComponent('events.pastEvent', () => PastEvent, store, provider);
    Navigation.registerComponent('CreateEvent', () => CreateEvent, store, provider);
}