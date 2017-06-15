import { Navigation } from 'react-native-navigation';
import Events from "./Events";
import PastEvents from "./PastEvents";
import PastEvent from "./PastEvent";
import CreateEvent from "./CreateEvent";
import Event from './Event';
import UpdateComment from "./comments/UpdateComment";
import LiveEvent from "../live/LiveEvent";
import CreateComment from './comments/CreateComment';
import CreateChildComment from './comments/CreateChildComment';
import Comments from './comments/Comments';
import EditEvent from './EditEvent';

export default function(store, provider) {
    Navigation.registerComponent('events.event', () => Event, store, provider);
    Navigation.registerComponent('events.events', () => Events, store, provider);
    Navigation.registerComponent('events.pastEvents', () => PastEvents, store, provider);
    Navigation.registerComponent('events.pastEvent', () => PastEvent, store, provider);
    Navigation.registerComponent('events.createEvent', () => CreateEvent, store, provider);
    Navigation.registerComponent('events.editEvent', () => EditEvent, store, provider);
    Navigation.registerComponent('Comments', () => Comments, store, provider);
    Navigation.registerComponent('CreateComment', () => CreateComment, store, provider);
    Navigation.registerComponent('UpdateComment', () => UpdateComment, store, provider);
    Navigation.registerComponent('events.createEvents', () => CreateEvent, store, provider);
    Navigation.registerComponent('events.liveEvent', () => LiveEvent, store, provider);
    Navigation.registerComponent('CreateChildComment', () => CreateChildComment, store, provider);
}