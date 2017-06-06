import { Navigation } from 'react-native-navigation';
import Events from "./Events";
import PastEvents from "./PastEvents";
import PastEvent from "./PastEvent";
import CreateEvent from "./CreateEvent";
import Event from './Event';
import UpdateComment from "./UpdateComment";
import LiveEvent from "../live/LiveEvent";
import CreateComment from './CreateComment';
import CreateChildComment from './CreateChildComment';
import Comments from '../../scenes/commentsList';

export default function(store, provider) {
    Navigation.registerComponent('events.event', () => Event, store, provider);
    Navigation.registerComponent('events.events', () => Events, store, provider);
    Navigation.registerComponent('events.pastEvents', () => PastEvents, store, provider);
    Navigation.registerComponent('events.pastEvent', () => PastEvent, store, provider);
    Navigation.registerComponent('CreateEvent', () => CreateEvent, store, provider);
    Navigation.registerComponent('Comments', () => Comments, store, provider);
    Navigation.registerComponent('CreateComment', () => CreateComment, store, provider);
    Navigation.registerComponent('UpdateComment', () => UpdateComment, store, provider);
    Navigation.registerComponent('events.createEvents', () => CreateEvent, store, provider);
    Navigation.registerComponent('events.liveEvent', () => LiveEvent, store, provider);
    Navigation.registerComponent('CreateChildComment', () => CreateChildComment, store, provider);
}