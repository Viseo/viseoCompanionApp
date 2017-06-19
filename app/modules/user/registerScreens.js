import {Navigation} from 'react-native-navigation';
import EditProfile from './EditProfile';
import MyProfile from './MyProfile';
import OthersProfile from './OtherProfile';
import SignOut from './authentication/SignOut';
import SignIn from './authentication/SignIn';
import RecoverPassword from './authentication/RecoverPassword';
import SignUp from './authentication/SignUp';
import SignUpSuccessfulPopup from './authentication/SignUpSuccessfulPopup';

export default function (store, provider) {
    Navigation.registerComponent('user.authentication.recoverPassword', () => RecoverPassword, store, provider);
    Navigation.registerComponent('user.authentication.signIn', () => SignIn, store, provider);
    Navigation.registerComponent('user.authentication.signUp', () => SignUp, store, provider);
    Navigation.registerComponent('user.authentication.signOut', () => SignOut, store, provider);
    Navigation.registerComponent('user.authentication.signUpSuccessfulPopup', () => SignUpSuccessfulPopup, store, provider);
    Navigation.registerComponent('user.editProfile', () => EditProfile, store, provider);
    Navigation.registerComponent('user.myProfile', () => MyProfile, store, provider);
    Navigation.registerComponent('user.othersProfile', () => OthersProfile, store, provider);
}