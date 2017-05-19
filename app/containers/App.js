import React, {Component} from "react";
import {Navigator, BackAndroid, View, StyleSheet} from "react-native";
import SignIn from "./../containers/SignInForm";
import SignUp from "./../scenes/signUp";
import RecoverPassword from "./../scenes/recoverPassword";
import Home from "./../scenes/home";
import History from "./../scenes/History";
import strings from "./../util/localizedStrings";
import setDateLang from "./../util/dateHandler";
import AddEvent from "./../scenes/addEvent";
import Event from "./../scenes/Event";
import UserProfile from "./../scenes/UserProfile";
import AppText from "./../components/appText";
import colors from "../modules/global/colors";

class App extends Component {
    state = {
        isReady: false,
        isAuthenticatingSavedUser: false,
        isSavedUserAuthenticated: false,
        shouldShowSplashScreen: true,
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this._setLanguage();
        this._configureBackButtonForAndroidDevices();
    }

    render() {
        const {isReady, shouldShowSplashScreen} = this.state;
        return !shouldShowSplashScreen && isReady ?
            this.renderReadyView() :
            this.renderLoadingView();
    }

    renderLoadingView() {
        return (
            <View style={styles.splashScreen}>
                <AppText style={styles.splashScreenTitle}>Viseo Companion</AppText>
            </View>
        );
    }

    renderReadyView() {
        const routes = [
            {title: 'Home'},
            {title: 'SignIn'},
            {title: 'SignUp'},
            {title: 'RecoverPassword'},
            {title: 'Event'},
            {title: 'AddEvent'},
            {title: 'Profile'},
            {title: 'History'},
        ];
        const initialRoute = this.state.isSavedUserAuthenticated ? 0 : 1;
        return (
            <Navigator
                initialRoute={routes[initialRoute]}
                renderScene={(route, navigator) => {
                    this.navigator = navigator;
                    if (route.title === 'SignIn') {
                        return (
                            <SignIn navigator={navigator} {...route.passProps}/>
                        );
                    } else if (route.title === 'SignUp') {
                        return (
                            <SignUp navigator={navigator} {...route.passProps}/>
                        );
                    } else if (route.title === 'RecoverPassword') {
                        return (
                            <RecoverPassword navigator={navigator} {...route.passProps}/>
                        );
                    } else if (route.title === 'Home') {
                        // store.dispatch(fetchEvents(store.getState().user));
                        return (
                            <Home navigator={navigator} {...route.passProps}/>
                        );
                    } else if (route.title === 'Event') {
                        return (
                            <Event navigator={navigator} {...route.passProps}/>
                        );
                    } else if (route.title === 'AddEvent') {
                        return (
                            <Event navigator={navigator} {...route.passProps}/>
                        );
                    } else if (route.title === 'Profile') {
                        return (
                            <UserProfile navigator={navigator} {...route.passProps}/>
                        );
                    }
                    else if (route.title === 'History') {
                        return (
                            <History navigator={navigator} {...route.passProps}/>
                        );
                    }
                }}
                configureScene={(route, routeStack) =>
                    Navigator.SceneConfigs.PushFromRight
                }
            />
        )
    }

    _configureBackButtonForAndroidDevices() {
        BackAndroid.addEventListener('hardwareBackPress', () => {
            if (this.navigator && this.navigator.getCurrentRoutes().length > 1) {
                this.navigator.pop();
                return true;
            }
            return false;
        });
    }

    _setLanguage() {
        strings.setLanguage('fr');
        setDateLang(strings.getLanguage());
    }
}

App.defaultProps = {
    isReady: false,
}

const styles = StyleSheet.create({
    navigator: {
        flex: 1,
    },
    splashScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    splashScreenTitle: {
        fontSize: 30,
        color: colors.blue,
        fontWeight: 'bold',
    }
});


