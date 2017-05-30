import { Navigation } from 'react-native-navigation';
import SignIn from './../../containers/SignInForm';
import SignUp from './../../containers/signUp';
import Profile from "../../components/UserProfileInfo";
import EditProfile from "./EditProfile";

export default function(store, provider) {
    Navigation.registerComponent('authentication.signIn', () => SignIn, store, provider);
    Navigation.registerComponent('authentication.signUp', () => SignUp, store, provider);
    Navigation.registerComponent('UserProfile', () => Profile, store, provider);
    Navigation.registerComponent('EditUserProfile', () => EditProfile, store, provider);
}