import {Navigation} from 'react-native-navigation';
import Events from './Events';
import CreateEvent from './CreateEvent';
import Event from './Event';
import UpdateComment from './comments/UpdateComment';
import LiveEvent from '../live/LiveEvent';
import CreateComment from './comments/CreateComment';
import CreateChildComment from './comments/CreateChildComment';
import Comments from './comments/Comments';
import EditEvent from './EditEvent';
import OthersProfile from '../user/OtherProfile';
import ReviewPopup from './reviews/ReviewPopup';
import SearchEvents from './search/SearchEvents';
import ProfileDetails from '../user/ProfileDetails';
import MyProfile from '../user/MyProfile';

export default function (store, provider) {
    Navigation.registerComponent('events.event', () => Event, store, provider);
    Navigation.registerComponent('events.events', () => Events, store, provider);
    Navigation.registerComponent('events.createEvent', () => CreateEvent, store, provider);
    Navigation.registerComponent('events.editEvent', () => EditEvent, store, provider);
    Navigation.registerComponent('events.searchEvents', () => SearchEvents, store, provider);
    Navigation.registerComponent('Comments', () => Comments, store, provider);
    Navigation.registerComponent('CreateComment', () => CreateComment, store, provider);
    Navigation.registerComponent('UpdateComment', () => UpdateComment, store, provider);
    Navigation.registerComponent('events.createEvents', () => CreateEvent, store, provider);
    Navigation.registerComponent('events.liveEvent', () => LiveEvent, store, provider);
    Navigation.registerComponent('CreateChildComment', () => CreateChildComment, store, provider);
    Navigation.registerComponent('user.othersProfile', () => OthersProfile, store, provider);
    Navigation.registerComponent('user.myProfile', () => MyProfile, store, provider);
    Navigation.registerComponent('user.ProfileDetails', () => ProfileDetails, store, provider);
    Navigation.registerComponent('notation.popup', () => ReviewPopup, store, provider);
}