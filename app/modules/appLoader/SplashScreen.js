import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import AppText from "../../components/appText";
import colors from "../global/colors";
import {authenticate} from "./../user/authentication.actions";
import {connect} from "react-redux";
import startApp from "../global/startApp";
import {bindActionCreators} from "redux";

class SplashScreen extends Component {

    minSplashScreenDuration = 2000;
    maxSplashScreenDuration = 2500;
    state = {
        isAuthenticatingSavedUser: false,
        shouldShowSplashScreen: true,
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this._hideTabBar();
        this._setSplashScreenDuration();
        const {email, password} = this.props.loggedUser;
        this._authenticateSavedUser(email, password);
    }

    componentWillReceiveProps({isAuthenticated}) {
        this.setState({
            isAuthenticated
        });
    }

    render() {
        return (
            <View style={styles.splashScreen}>
                <AppText style={styles.splashScreenTitle}>Viseo Companion</AppText>
            </View>
        );
    }

    _authenticateSavedUser(email, password) {
        const hasSavedUser = email.length > 0 && password.length > 0;
        if (hasSavedUser && !this.state.isAuthenticatingSavedUser) {
            this.setState({
                isAuthenticatingSavedUser: true,
            });
            this.props.authenticate(email, password);
        }
    }

    _closeSplashScreenIfEverythingIsLoaded() {
        if (this.props.isAuthenticated) {
            this._navigateToHome();
        }
        else if (!this.state.isAuthenticatingSavedUser) {
            this._navigateToSignIn();
        } else {
            const remainingLoadingTime = this.maxSplashScreenDuration - this.minSplashScreenDuration;
            setTimeout(() => this._navigateToSignIn(), remainingLoadingTime);
        }
    }

    _hideTabBar() {
        this.props.navigator.toggleTabs({
            to: 'hidden',
            animated: false,
        });
    }

    _navigateToHome() {
        startApp();
    }

    _navigateToSignIn() {
        this.props.navigator.push({
            screen: 'authentication.signIn',
        });
    }

    _setSplashScreenDuration() {
        setTimeout(() => {
                this._closeSplashScreenIfEverythingIsLoaded()
            }, this.minSplashScreenDuration
        );
    }
}

SplashScreen.navigatorStyle = {
    navBarHidden: true,
    tabBarHidden: true,
};

const mapStateToProps = ({authentication}) => ({
    isAuthenticated: authentication.isAuthenticated,
    loggedUser: authentication.loggedUser,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        authenticate
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)(SplashScreen);

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
