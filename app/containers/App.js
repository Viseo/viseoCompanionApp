import React, {Component} from "react";
import {BackAndroid, StyleSheet, View} from "react-native";
import SignIn from "./../containers/SignInForm";
import strings from "./../util/localizedStrings";
import setDateLang from "./../util/dateHandler";
import AppText from "./../components/appText";
import {connect} from "react-redux";
import {authenticate} from "../actionCreators/user";
import {bindActionCreators} from "redux";
import settings from "../config/settings";
import colors from "../components/colors";
import startApp from "../modules/global/startApp";

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
        startApp();
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

