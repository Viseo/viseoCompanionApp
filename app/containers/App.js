import React, {Component} from "react";
import {BackAndroid, Navigator, StyleSheet, View} from "react-native";
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
import {connect} from "react-redux";
import {authenticate} from "../actionCreators/user";
import {bindActionCreators} from "redux";
import settings from "../config/settings";
import colors from "../components/colors";
import { Navigation } from 'react-native-navigation';

class App extends Component {
    state = {
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
        this._setSplashScreenDuration();
        this.props.navigator.toggleTabs({
            to: 'hidden',
            animated: true,
        });
    }

    componentWillReceiveProps(props) {
        const {hasSavedUser, email, password, authenticationStatus} = props;
        const authenticationInProgressCode = 0;
        if (authenticationStatus !== authenticationInProgressCode) {
            this._checkIfUserIsAuthenticated(authenticationStatus);
        } else if (hasSavedUser) {
            if (!this.state.isAuthenticatingSavedUser) {
                this._authenticateSaveUser(email, password);
            }
        } else {
            this._navigateToHomeScreen();
        }
    }
    render() {
        return (
            <View style={styles.splashScreen}>
                <AppText style={styles.splashScreenTitle}>Viseo Companion</AppText>
            </View>
        );
    }

    oldrenderReadyView() {
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

    _authenticateSaveUser(email, password) {
        this.setState({
            isAuthenticatingSavedUser: true,
        });
        this.props.authenticate(email, password);
    }

    _checkIfUserIsAuthenticated(authenticationCode) {
        const authenticationSuccessfulCode = 1;
        this.setState({
            isSavedUserAuthenticated: authenticationCode === authenticationSuccessfulCode,
            isReady: true,
        });
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

    _navigateToHomeScreen() {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    label: 'Home',
                    screen: 'Home',
                    title: 'Viseo Companion',
                    icon: require('./../images/eye.png'),
                },
                {
                    label: 'Shop',
                    screen: 'Shop',
                    icon: require('./../images/eye.png'),
                },
                {
                    label: 'VizzManagement',
                    screen: 'VizzManagement',
                    icon: require('./../images/eye.png'),
                },
                {
                    label: 'Notifications',
                    screen: 'Notifications',
                    icon: require('./../images/eye.png'),
                }
            ],
        });
    }

    _setLanguage() {
        strings.setLanguage('fr');
        setDateLang(strings.getLanguage());
    }

    _setSplashScreenDuration = () => {
        setTimeout(() => {
            this.setState({
                shouldShowSplashScreen: false,
            })
        }, settings.minSplashScreenDuration);
        setTimeout(() => {
            this.props.navigator.push({
                screen:'SignIn',
            });
        }, settings.maxSplashScreenDuration);
    }
}

App.navigatorStyle = {
    navBarHidden: true,
};

App.defaultProps = {
    isReady: false,
};

const styles = StyleSheet.create({
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

const mapStateToProps = ({user}, ownProps) => ({
    hasSavedUser: user.rememberMe,
    email: user.email,
    password: user.passwordInput,
    authenticationStatus: user.authenticationStatus,
    ...ownProps
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            authenticate
        },
        dispatch)
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)(App);

