import React, {Component} from 'react';
import {Button, Image, ScrollView, StyleSheet, View} from 'react-native';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import strings from '../../global/localizedStrings';
import AppText from '../../global/AppText';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {authenticate, rememberUser as toggleRememberUser} from './authentication.actions';
import colors from '../../global/colors';
import PasswordCheckInput from './PasswordCheckInput';
import {addUser, getUserByEmail} from '../../global/db';
import {Navigation} from 'react-native-navigation';
import {defaultNavBarStyle} from '../../global/navigatorStyle';

class SignUp extends Component {

    state = {
        email: '',
        password: '',
        passwordCheck: '',
        errorMessage: '',
        hasSubmittedForm: false,
    };

    constructor(props) {
        super(props);
    }

    render() {
        const logo = this._renderLogo();
        const shouldDisplayErrorMessage = this.state.hasSubmittedForm && !this._isFormFilled();
        const errorMessage = shouldDisplayErrorMessage ? this._renderErrorMessage() : null;
        const signUpButton = this._renderSignUpButton();
        return (
            <ScrollView contentContainerStyle={styles.mainContainer}>
                {logo}
                <EmailInput onEmailChange={email => this._setEmail(email)}/>
                <PasswordInput onPasswordChange={password => this._setPassword(password)}/>
                <PasswordCheckInput
                    password={this.state.password}
                    onPasswordCheckChange={passwordCheck => this._setPasswordCheck(passwordCheck)}
                />
                {errorMessage}
                {signUpButton}
            </ScrollView>
        );
    }

    _authenticatedNewUser(email, password) {
        this.props.authenticate(email, password);
        this.props.toggleRememberUser(true);
    }

    _isFormFilled() {
        return this.state.email
            && this.state.password
            && this.state.passwordCheck;
    }

    _renderErrorMessage() {
        return <AppText style={styles.errorInfo}>{this.state.errorMessage}</AppText>;
    }

    _renderLogo() {
        return (
            <View style={{alignItems: 'center', paddingBottom: 50}}>
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

    async _signUp() {
        this.setState({hasSubmittedForm: true});
        if (this._isFormFilled()) {
            this.setState({errorMessage: ''});
            const {email, password} = this.state;
            const userAlreadyExists = await getUserByEmail(email);
            if (userAlreadyExists) {
                this.setState({errorMessage: strings.emailAlreadyUsed});
            } else {
                const lowercaseEmail = email.toLowerCase();
                let userAddedSuccessfully = await addUser(lowercaseEmail, password);
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
    signUpButton: {
        marginTop: 30,
    },
});