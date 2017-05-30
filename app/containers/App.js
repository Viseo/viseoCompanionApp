import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import SignIn from "./../containers/SignInForm";
import strings from "./../util/localizedStrings";
import setDateLang from "./../util/dateHandler";
import AppText from "./../components/appText";
import {connect} from "react-redux";
import {authenticate} from "../actionCreators/user";
import {bindActionCreators} from "redux";
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
        this._setSplashScreenDuration();
        this.props.navigator.toggleTabs({
            to: 'hidden',
            animated: true,
        });
    }

    componentWillReceiveProps(props) {
        const {hasSavedUser, email, password, isAuthenticated} = props;
        if (!isAuthenticated && hasSavedUser) {
            if (!this.state.isAuthenticatingSavedUser) {
                this._authenticateSaveUser(email, password);
            }
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

    _closeSplashScreenIfAuthenticated() {
        if (this.props.isAuthenticated) {
            this._navigateToHomeScreen();
        } else {
            setTimeout(() => {
                this.props.navigator.push({
                    screen: 'SignIn',
                });
            }, 1500);
        }
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
            });
            this._closeSplashScreenIfAuthenticated();
        }, 1000);
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
    password: user.password,
    authenticationStatus: user.authenticationStatus,
    isAuthenticated: user.isAuthenticated,
    ...ownProps
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            authenticate,
        },
        dispatch)
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)(App);

