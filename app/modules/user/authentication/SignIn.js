import React, {Component} from "react";
import {Button, Image, ScrollView, StyleSheet, TouchableHighlight, View} from "react-native";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import strings from "../../global/localizedStrings";
import AppText from "../../global/AppText";
import {authenticate} from "./authentication.actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {startApp} from "../../global/navigationLoader";
import CheckBox from "react-native-check-box";
import {rememberUser as toggleRememberUser} from "../../../actionCreators/user";
import {defaultNavBarStyle} from "../../global/navigatorStyle";
import colors from "../../global/colors";
import {doServerCall} from "../../global/db";

class SignIn extends Component {

    state = {
        email: '',
        password: '',
        errorMessage: '',
        hasSubmittedForm: false,
    };

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    componentWillReceiveProps({isAuthenticated}) {
        if (isAuthenticated) {
            this._navigateToHome();
        } else {
            this.setState({
                errorMessage: strings.wrongCredentials,
            });
        }
    }

    render() {
        const logo = this._renderLogo();
        const shouldDisplayErrorMessage = this.state.hasSubmittedForm ;
        const errorMessage = shouldDisplayErrorMessage ? this._renderErrorMessage() : null;
        const signInButton = this._renderSignInButton();
        const rememberUserCheckBox = this._renderRememberUserCheckbox();
        const recoverPasswordLink = this._renderRecoverPassword();
        return (
            <ScrollView contentContainerStyle={styles.mainContainer}>
                {logo}
                <EmailInput
                    onEmailChange={email => this._setEmail(email)}
                    onSubmitEditing={ () => {
                        this._autoSubmitWhenFilled();
                        this.refs.password.focus();
                    }}
                />
                <PasswordInput
                    ref="password"
                    onPasswordChange={password => this._setPassword(password)}
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
            || this.setState({errorMessage: strings.missingFormFields});
    }

    _navigateToHome() {
        startApp();
    }

    _navigateToRecoverPassword() {
        this.props.navigator.push({
            screen: 'user.authentication.recoverPassword',
            title: 'Récupération de mot de passe',
            navigatorStyle: defaultNavBarStyle,
        });
    }

    _navigateToSignUp() {
        this.props.navigator.push({
            screen: 'user.authentication.signUp',
            title: 'Nouvel utilisateur',
            navigatorStyle: defaultNavBarStyle,
        })
    }

    _renderErrorMessage() {
        return <AppText style={styles.errorInfo}>{this.state.errorMessage}</AppText>;
    }

    _renderLogo() {
        return (
            <View style={{alignItems: 'center', paddingBottom: 50}}>
                <Image
                    source={require('../../../images/user/loginLogo.png')}
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
        this.setState({
            email,
        });
    }

    _setPassword(password) {
        this.setState({
            password,
        });
    }

    _autoSubmitWhenFilled() {
        if (this._isFormFilled()) {
            this._signIn();
        }
    }

    _signIn() {
        this.setState({hasSubmittedForm: true});
        if (this._isFormFilled()) {
            this.setState({errorMessage: ""})
            const {email, password} = this.state;
            doServerCall(() => this.props.authenticate(email, password));
        }
    }

    _toggleRememberUser() {
        this.props.toggleRememberUser(!this.props.rememberUser);
    }
}

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
    isAuthenticated: authentication.isAuthenticated,
    rememberUser: authentication.rememberUser,
    ...ownProps,
});

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            authenticate,
            toggleRememberUser,
        },
        dispatch,
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SignIn);

const styles = StyleSheet.create({
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
});