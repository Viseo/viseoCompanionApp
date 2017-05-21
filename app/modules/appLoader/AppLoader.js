import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import AppText from "../../components/appText";
import colors from "../global/colors";
import {authenticate} from "../../actionCreators/user";
import {connect} from "react-redux";

class AppLoader extends Component {

    minSplashScreenDuration = 1000;
    maxSplashScreenDuration = 3000;
    state = {
        isAuthenticatingSavedUser: false,
        isSavedUserAuthenticated: false,
        shouldShowSplashScreen: true,
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this._setSplashScreenDuration();
    }

    componentWillReceiveProps({isAuthenticated, savedUser}) {
        if(isAuthenticated) {
            this.setState({
                isSavedUserAuthenticated: true
            })
        } else {
            this._authenticateSavedUser(savedUser.email, savedUser.password);
        }
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
        if (this.state.isSavedUserAuthenticated) {
            this._navigateToHome();
        }
        else if (!this.state.isAuthenticatingSavedUser) {
            this._navigateToSignIn();
        } else {
            const remainingLoadingTime = this.maxSplashScreenDuration - this.minSplashScreenDuration;
            setTimeout(() => this._navigateToSignIn(), remainingLoadingTime);
        }
    }

    _navigateToHome() {
        this.props.navigator.switchToTab({
            tabIndex: 1
        });
    }

    _navigateToSignIn() {
        this.props.navigator.push({
            screen: 'SignIn',
            title: 'Connexion',
            backButtonHidden: true,
        });
    }

    _setSplashScreenDuration() {
        setTimeout(() => this._closeSplashScreenIfEverythingIsLoaded(), this.minSplashScreenDuration);
    }
}

AppLoader.navigatorStyle = {
    navBarHidden: true,
    tabBarHidden: true,
};

const mapStateToProps = ({authentication}) => ({
    isAuthenticated: authentication.isAuthenticated,
    savedUser: authentication.savedUser,
});

const mapDispatchToProps = (dispatch) => ({
    authenticate
});

export default connect(
    mapStateToProps,
    mapDispatchToProps)(AppLoader);

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
