import React, {Component} from 'react';
import {Button, Image, ScrollView, StyleSheet, View} from 'react-native';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import strings from '../../global/localizedStrings';
import AppText from '../../global/components/AppText';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {authenticate, rememberUser as toggleRememberUser} from './authentication.actions';
import colors from '../../global/colors';
import PasswordCheckInput from './PasswordCheckInput';
import * as db from '../../global/db';
import {Navigation} from 'react-native-navigation';
import TextField from 'react-native-md-textinput';

class SignUp extends Component {

    state = {
        email: '',
        password: '',
        passwordCheck: '',
        firstName: '',
        lastName: '',
        errorMessage: '',
        hasSubmittedForm: false,
    };

    constructor(props) {
        super(props);
    }

    render() {
        const logo = this._renderLogo();
        const shouldDisplayErrorMessage = this.state.hasSubmittedForm;
        const errorMessage = shouldDisplayErrorMessage ? this._renderErrorMessage() : null;
        const signUpButton = this._renderSignUpButton();
        const firstNameInput = this._renderFirstNameInput();
        const lastNameInput = this._renderLastNameInput();
        return (
            <ScrollView contentContainerStyle={styles.mainContainer}>
                {logo}
                <EmailInput
                    ref="email"
                    onEmailChange={email => this._setEmail(email)}
                    onSubmitEditing={ () => {
                        this._autoSubmitWhenFilled();
                        this.refs.password.focus();
                    }}
                />
                <PasswordInput
                    ref="password"
                    onPasswordChange={password => this._setPassword(password)}
                    onSubmitEditing={ () => {
                        this._autoSubmitWhenFilled();
                        this.refs.passwordCheck.focus();
                    }}
                />
                <PasswordCheckInput
                    ref="passwordCheck"
                    password={this.state.password}
                    onPasswordCheckChange={passwordCheck => this._setPasswordCheck(passwordCheck)}
                    onSubmitEditing={ () => {
                        this._autoSubmitWhenFilled();
                        this.refs.firstName.focus();
                    }}
                />
                {firstNameInput}
                {lastNameInput}
                {errorMessage}
                {signUpButton}
            </ScrollView>
        );
    }

    _renderFirstNameInput() {
        return (
            <TextField
                ref="firstName"
                label={'Prénom'}
                style={{color: colors.mediumGray}}
                highlightColor='#00BCD4'
                value={this.state.firstName}
                onChangeText={firstName => {
                    this.setState({firstName});
                }}
                returnKeyType={'next'}
                onSubmitEditing={ () => {
                    this._autoSubmitWhenFilled();
                    this.refs.lastName.focus();
                }}
            />
        );
    }

    _renderLastNameInput() {
        return (
            <TextField
                ref="lastName"
                label={'Nom'}
                style={{color: colors.mediumGray}}
                highlightColor='#00BCD4'
                value={this.state.lastName}
                onChangeText={lastName => {
                    this.setState({lastName});
                }}
                returnKeyType={'done'}
                onSubmitEditing={ () => {
                    this._autoSubmitWhenFilled();
                }}
            />
        );
    }

    _authenticatedNewUser(email, password) {
        this.props.authenticate(email, password);
        this.props.toggleRememberUser(true);
    }

    _isFormFilled() {
        return this.state.email
            && this.state.password
            && this.state.passwordCheck
            && this.state.firstName
            && this.state.lastName
            || this.setState({errorMessage: strings.missingFormFields});
    }

    _renderErrorMessage() {
        return <AppText style={styles.errorInfo}>{this.state.errorMessage}</AppText>;
    }

    _renderLogo() {
        return (
            <View style={{alignItems: 'center', paddingVertical: 10}}>
                <Image
                    source={require('../../../images/user/signUpLogo.png')}
                    style={{width: 110, height: 110}}
                />
            </View>
        );
    }

    _renderSignUpButton() {
        return (
            <View style={styles.signUpButton}>
                <Button
                    title={strings.signUp}
                    onPress={() => this._signUp()}
                    color={colors.blue}
                />
            </View>
        );
    }

    _setEmail(email) {
        this.setState({
            email,
        });
        this._autoCompleteName(email);
    }

    _setPassword(password) {
        this.setState({
            password,
        });
    }

    _setPasswordCheck(passwordCheck) {
        this.setState({
            passwordCheck,
        });
    }

    _showSignUpSuccessfulPopUp(onOk) {
        Navigation.showLightBox({
            screen: 'user.authentication.signUpSuccessfulPopup',
            style: {
                backgroundBlur: 'dark',
                backgroundColor: '#135caa70',
            },
            passProps: {
                onOk,
            },
        });
    }

    _autoSubmitWhenFilled() {
        if (this._isFormFilled()) {
            this._signUp();
        }
    }

    _autoCompleteName(email) {
        const regex = /(\w*).(\w*)@viseo.com/;
        const match = regex.exec(email);
        if (match)
            this.setState({
                firstName: this._capitalizeFirstLetter(match[1]),
                lastName: this._capitalizeFirstLetter(match[2]),
            });
    }

    _capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async _signUp() {
        this.setState({hasSubmittedForm: true});
        if (this._isFormFilled()) {
            this.setState({errorMessage: ''});
            const {email, password, firstName, lastName} = this.state;
            const userAlreadyExists = await db.users.getByEmail(email);
            if (userAlreadyExists) {
                this.setState({errorMessage: strings.emailAlreadyUsed});
            } else {
                const lowercaseEmail = email.toLowerCase();
                let userAddedSuccessfully = await db.users.add({
                    email: lowercaseEmail,
                    password,
                    firstName,
                    lastName,
                });
                if (userAddedSuccessfully) {
                    this._showSignUpSuccessfulPopUp(() => this._authenticatedNewUser(email, password));
                } else {
                    this.setState({errorMessage: strings.unableToReachServer});
                }
            }
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            authenticate,
            toggleRememberUser,
        },
        dispatch,
    );
};

export default connect(
    null,
    mapDispatchToProps,
)(SignUp);

const styles = StyleSheet.create({
    errorInfo: {
        textAlign: 'center',
        fontSize: 13,
        color: 'brown',
        fontStyle: 'italic',
    },
    mainContainer: {
        paddingHorizontal: 60,
        paddingTop: 0,
        backgroundColor: 'white',
    },
    rememberPasswordLink: {
        textAlign: 'right',
        fontSize: 12,
        color: 'brown',
        fontStyle: 'italic',
        paddingRight: 5,
    },
    signUpButton: {
        marginTop: 30,
    },
});