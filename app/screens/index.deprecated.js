import { Navigation } from 'react-native-navigation';
import SignIn from './../containers/SignInForm';
import SignUp from './../containers/signUp';
import App from "../containers/App";
import Notifications from "../modules/notifications/Notifications";
import Shop from "../modules/shop/Shop";
import VizzManagement from "../modules/vizz/VizzManagement";
import EventInfo from '../../'
import Profile from "../modules/user/Profile";
import EditProfile from "../modules/user/EditProfile";
import CreateEvent from "../modules/events/CreateEvent";
import Events from "../modules/events/Events";
import NewsFeed from "../modules/newsFeed/NewsFeed";
import PastEvents from "../modules/events/PastEvents";
import PastEvent from "../modules/events/PastEvent";
import Comments from "../scenes/commentsList";
import CreateComment from "../modules/events/CreateComment";
import UpdateComment from "../modules/events/UpdateComment";
import CreateChildComment from "../modules/events/CreateChildComment";
import App from "../containers/App";
import EventInfo from "../containers/EventInfo";

export function registerScreens(store, provider) {
    Navigation.registerComponent('SignIn', () => SignIn, store, provider);
    Navigation.registerComponent('SignUp', () => SignUp, store, provider);
    Navigation.registerComponent('NewsFeed', () => NewsFeed, store, provider);
    Navigation.registerComponent('Notifications', () => Notifications, store, provider);
    Navigation.registerComponent('Shop', () => Shop, store, provider);
    Navigation.registerComponent('VizzManagement', () => VizzManagement, store, provider);
    Navigation.registerComponent('Event', () => EventInfo, store, provider);
    Navigation.registerComponent('Events', () => Events, store, provider);
    Navigation.registerComponent('PastEvents', () => PastEvents, store, provider);
    Navigation.registerComponent('PastEvent', () => PastEvent, store, provider);
    Navigation.registerComponent('UserProfile', () => Profile, store, provider);
    Navigation.registerComponent('EditUserProfile', () => EditProfile, store, provider);
    Navigation.registerComponent('CreateEvent', () => CreateEvent, store, provider);
    Navigation.registerComponent('App', () => App, store, provider);
    Navigation.registerComponent('Comments', () => Comments, store, provider);
    Navigation.registerComponent('CreateComment', () => CreateComment, store, provider);
    Navigation.registerComponent('CreateChildComment', () => CreateChildComment, store, provider);
    Navigation.registerComponent('UpdateComment', () => UpdateComment, store, provider);
}