import React, {Component} from 'react';
import {View, StyleSheet} from "react-native";
import AppText from "../../components/appText";
import colors from "../global/colors";
import {authenticate} from "../../actionCreators/user";
import {connect} from "react-redux";

class AppLoader extends Component {

    minSplashScreenDuration = 1;
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
        this._setSplashScreenDuration();
    }

    componentWillReceiveProps(props) {
        const {hasSavedUser, email, password, authenticationStatus} = props;
        const authenticationInProgressCode = 0;
        if (authenticationStatus !== authenticationInProgressCode) {
            this._checkIfUserIsAuthenticated(authenticationStatus);
        } else if (hasSavedUser) {
            if (!this.state.isAuthenticatingSavedUser) {
                this._authenticateSavedUser(email, password);
            }
        } else {
            this._navigateToHome();
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
        this.setState({
            isAuthenticatingSavedUser: true,
        });
        this.props.authenticate(email, password);
    }

    _allowCloseSplashScreen() {
        if(!this.state.isAuthenticatingSavedUser) {
            this._navigateToSignIn();
        } else {
            this.setState({
                shouldShowSplashScreen: false,
            });
        }
    }

    _checkIfUserIsAuthenticated(authenticationCode) {
        const authenticationSuccessfulCode = 1;
        this.setState({
            isSavedUserAuthenticated: authenticationCode === authenticationSuccessfulCode,
            isReady: true,
        });
    }

    _setSplashScreenDuration = () => {
        setTimeout(() => {
            this._allowCloseSplashScreen();
        }, this.minSplashScreenDuration);
    };

    _navigateToHome() {
        this.props.navigator.switchToTab({
            tabIndex: 1
        });
    }

    _navigateToSignIn() {
        this.props.navigator.push({
            screen:'SignIn',
            title:'Connexion',
            backButtonHidden: true,
        });
    }
}

AppLoader.navigatorStyle = {
    navBarHidden: true,
    tabBarHidden: true,
};

const mapStateToProps = ({user}, ownProps) => ({
    hasSavedUser: user.rememberMe,
    email: user.email,
    password: user.passwordInput,
    authenticationStatus: user.authenticationStatus,
    ...ownProps
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
