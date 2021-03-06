import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Button, Image, ScrollView, StyleSheet, TouchableHighlight, View} from 'react-native';
import CheckBox from 'react-native-check-box';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import colors from '../../global/colors';
import AppText from '../../global/components/AppText';
import {doServerCall} from '../../global/db';
import strings from '../../global/localizedStrings';
import {startApp} from '../../global/navigationLoader';
import {defaultNavBarStyle} from '../../global/navigatorStyle';
import {authenticate, rememberUser as toggleRememberUser} from './authentication.actions';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';

export class SignIn extends Component {

    state = {
        email: '',
        password: '',
        errorMessage: '',
        hasSubmittedForm: false,
    };

    constructor(props) {
        super( props );
        this.props.navigator.setOnNavigatorEvent( this.onNavigatorEvent.bind( this ) );
    }

    componentWillReceiveProps({isAuthenticated, isAuthenticating}) {
        if (!isAuthenticating) {
            if (isAuthenticated) {
                this._navigateToHome();
            }
            else {
                this.setState( {
                    errorMessage: strings.wrongCredentials,
                } );
            }
        }
    }

    render() {
        const logo = this._renderLogo();
        const shouldDisplayErrorMessage = this.state.hasSubmittedForm;
        const errorMessage = shouldDisplayErrorMessage ? this._renderErrorMessage() : null;
        const signInButton = this._renderSignInButton();
        const rememberUserCheckBox = this._renderRememberUserCheckbox();
        const recoverPasswordLink = this._renderRecoverPassword();
        return (
            <ScrollView contentContainerStyle={styles.mainContainer}>
                {logo}
                <EmailInput
                    onEmailChange={email => this._setEmail( email )}
                    onSubmitEditing={ () => {
                        this._autoSubmitWhenFilled();
                        this.refs.password.focus();
                    }}
                />
                <PasswordInput
                    ref="password"
                    onPasswordChange={password => this._setPassword( password )}
                    returnKeyType="done"
                    onSubmitEditing={ () => {
                        this._autoSubmitWhenFilled();
                    }}
                />
                <View style={{flexDirection: 'row', flex: 1}}>
                    {rememberUserCheckBox}
                    {recoverPasswordLink}
                </View>
                {errorMessage}
                {signInButton}
            </ScrollView>
        );
    }

    onNavigatorEvent(event) {
        if (event.id === 'signUp') {
            this._navigateToSignUp();
        }
    }

    _isFormFilled() {
        return this.state.email
            && this.state.password
            || this.setState( {errorMessage: strings.missingFormFields} );
    }

    _navigateToHome() {
        startApp();
    }

    _navigateToRecoverPassword() {
        this.props.navigator.push( {
            screen: 'user.authentication.recoverPassword',
            title: 'Récupération de mot de passe',
            navigatorStyle: defaultNavBarStyle,
            passProps: {
                email: this.state.email,
            },
        } );
    }

    _navigateToSignUp() {
        this.props.navigator.push( {
            screen: 'user.authentication.signUp',
            title: 'Nouvel utilisateur',
            navigatorStyle: defaultNavBarStyle,
        } );
    }

    _renderErrorMessage() {
        return <AppText style={styles.errorInfo}>{this.state.errorMessage}</AppText>;
    }

    _renderLogo() {
        return (
            <View style={{alignItems: 'center', paddingBottom: 50}}>
                <Image
                    source={require( '../../../images/user/loginLogo.png' )}
                    style={{width: 110, height: 110}}
                />
            </View>
        );
    }

    _renderRecoverPassword() {
        return (
            <View style={{flex: 1, alignItems: 'flex-end'}}>
                <TouchableHighlight onPress={() => this._navigateToRecoverPassword()}>
                    <AppText style={styles.rememberPasswordLink}>{strings.forgotPassword}</AppText>
                </TouchableHighlight>
            </View>
        );
    }

    _renderRememberUserCheckbox() {
        return (
            <CheckBox
                style={{flex: 1, padding: 10}}
                onClick={() => this._toggleRememberUser()}
                isChecked={this.props.rememberUser}
                rightText={strings.rememberMe}
            />
        );
    }

    _renderSignInButton() {
        return (
            <View style={styles.signInButton}>
                <Button
                    title={strings.signIn}
                    onPress={() => this._signIn()}
                    color={colors.blue}
                />
            </View>
        );
    }

    _setEmail(email) {
        this.setState( {
            email,
        } );
    }

    _setPassword(password) {
        this.setState( {
            password,
        } );
    }

    _autoSubmitWhenFilled() {
        if (this._isFormFilled()) {
            this._signIn();
        }
    }

    _signIn() {
        this.setState( {hasSubmittedForm: true} );
        if (this._isFormFilled()) {
            this.setState( {errorMessage: ''} );
            const {email, password} = this.state;
            doServerCall( () => this.props.authenticate( email, password ) );
        }
    }

    _toggleRememberUser() {
        this.props.toggleRememberUser( !this.props.rememberUser );
    }
}

SignIn.propTypes = {
    authenticate: PropTypes.func.isRequired,
    rememberUser: PropTypes.bool.isRequired,
    toggleRememberUser: PropTypes.func.isRequired,
    navigator: PropTypes.object.isRequired,
    isAuthenticating: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

SignIn.navigatorButtons = {
    rightButtons: [
        {
            title: 'Créer un compte',
            id: 'signUp',
            buttonColor: 'blue',
            buttonFontSize: 12,
            buttonFontWeight: '400',
        },
    ],
};

const mapStateToProps = ({authentication}, ownProps) => ({
    isAuthenticating: authentication.isAuthenticating,
    isAuthenticated: authentication.isAuthenticated,
    rememberUser: authentication.rememberUser,
    ...ownProps,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators( {
            authenticate,
            toggleRememberUser,
        },
        dispatch,
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)( SignIn );

const styles = StyleSheet.create( {
    errorInfo: {
        textAlign: 'center',
        fontSize: 12,
        color: 'brown',
        fontStyle: 'italic',
    },
    mainContainer: {
        paddingHorizontal: 60,
        paddingTop: 30,
        backgroundColor: 'white',
    },
    rememberPasswordLink: {
        textAlign: 'right',
        fontSize: 12,
        color: 'brown',
        fontStyle: 'italic',
        paddingRight: 5,
    },
    signInButton: {
        marginTop: 30,
    },
} );