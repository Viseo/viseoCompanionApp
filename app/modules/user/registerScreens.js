import { Navigation } from 'react-native-navigation';
import EditProfile from "./EditProfile";
import Profile from './Profile';
import SignOut from './SignOut';
import SignIn from './SignIn';
import RecoverPassword from './RecoverPassword';
import SignUp from './SignUp';

export default function(store, provider) {
    Navigation.registerComponent('authentication.recoverPassword', () => RecoverPassword, store, provider);
    Navigation.registerComponent('authentication.signIn', () => SignIn, store, provider);
    Navigation.registerComponent('authentication.signUp', () => SignUp, store, provider);
    Navigation.registerComponent('authentication.signOut', () => SignOut, store, provider);
    Navigation.registerComponent('user.profile', () => Profile, store, provider);
    Navigation.registerComponent('EditUserProfile', () => EditProfile, store, provider);
}