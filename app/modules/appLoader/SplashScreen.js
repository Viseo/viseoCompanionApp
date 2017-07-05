import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import AppText from '../global/components/AppText';
import colors from '../global/colors';
import {authenticate} from '../user/authentication/authentication.actions';
import {connect} from 'react-redux';
import {startApp} from '../global/navigationLoader';
import {bindActionCreators} from 'redux';
import {hideTabBar, showUnreachableServerPopup} from '../global/navigationUtil';
import strings from './../global/localizedStrings';
import setDateLang from './../global/dateHandler';
import {defaultNavBarStyle} from '../global/navigatorStyle';
import {callWithTimeout} from '../global/db';
import PropTypes from 'prop-types';

export class SplashScreen extends Component {

    minSplashScreenDuration = 1500;
    maxSplashScreenDuration = 5000;
    state = {
        isAuthenticatingSavedUser: false,
        preventSplashScreenFromClosing: false,
        isOn: false,
    };

    constructor(props) {
        super( props );
    }

    componentWillMount() {
        hideTabBar( this.props.navigator );
        this._setLanguage();
        this._setSplashScreenDuration();
        const {email, password} = this.props.loggedUser;
        this._authenticateSavedUser( email, password );
    }

    componentWillReceiveProps({isAuthenticated}) {
        this.setState( {
            isAuthenticated,
        } );
    }

    render() {
        return (
            <View style={styles.splashScreen}>
                <AppText style={styles.splashScreenTitle}>Viseo Companion</AppText>
            </View>
        );
    }

    async _authenticateSavedUser(email, password) {
        const hasSavedUser = email.length > 0 && password.length > 0;
        if (hasSavedUser && !this.state.isAuthenticatingSavedUser) {
            this.setState( {
                isAuthenticatingSavedUser: true,
            } );
            const onServerTimeout = () => {
                this.setState( {
                    preventSplashScreenFromClosing: true,
                } );
                showUnreachableServerPopup();
            };
            await callWithTimeout(
                () => this.props.authenticate( email, password ),
                onServerTimeout,
            );
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
            setTimeout( () => {
                if (!this.state.preventSplashScreenFromClosing) {
                    this._navigateToSignIn();
                }
            }, remainingLoadingTime );
        }
    }

    _navigateToHome() {
        startApp();
    }

    _navigateToSignIn() {
        this.props.navigator.popToRoot();
        this.props.navigator.push( {
            screen: 'user.authentication.signIn',
            title: 'Connexion',
            navigatorStyle: defaultNavBarStyle,
            backButtonHidden: true,
        } );
    }

    _setLanguage() {
        strings.setLanguage( 'fr' );
        setDateLang( strings.getLanguage() );
    }

    _setSplashScreenDuration() {
        setTimeout( () => {
                this._closeSplashScreenIfEverythingIsLoaded();
            }, this.minSplashScreenDuration,
        );
    }
}

SplashScreen.navigatorStyle = {
    navBarHidden: true,
    tabBarHidden: true,
};

SplashScreen.propTypes = {
    navigator: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    loggedUser: PropTypes.object.isRequired,
    authenticate: PropTypes.func.isRequired,
};

const mapStateToProps = ({authentication}) => ({
    isAuthenticated: authentication.isAuthenticated,
    loggedUser: authentication.loggedUser,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators( {
        authenticate,
    }, dispatch );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps )( SplashScreen );

const styles = StyleSheet.create( {
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
    },
} );
