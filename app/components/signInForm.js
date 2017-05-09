/**
 * Created by MBE3664 on 24/04/2017.
 */
import React, {Component} from 'react';
import {
    View,
    Button,
    Image,
    TouchableHighlight,
    ScrollView,
    StyleSheet,
} from 'react-native';
import AppText from '../components/appText';
import EmailInput from './../components/emailInput';
import PasswordInput from './../components/passwordInput';
import CheckBox from "react-native-check-box";
import strings from "../util/localizedStrings";
import * as util from "../util/util.js";

export default class SignInForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: this.props.email,
            password: this.props.password,
            errorMessage: '',
            rememberUser: true
        }
        this.autoSubmitFormWhenLastInputIsFilled = this.autoSubmitFormWhenLastInputIsFilled.bind(this);
        this.onPressRememberMe = this.onPressRememberMe.bind(this);
        this.onPressRecoverPassword = this.onPressRecoverPassword.bind(this);
        this.onPressSignIn = this.onPressSignIn.bind(this);
        this.onPressSignUp = this.onPressSignUp.bind(this);
    }

    componentWillReceiveProps({email, password, authenticationStatus}) {
        this.setState({
            email,
            password
        }, () => {
            this.autoSubmitFormWhenLastInputIsFilled();
        });
        if (authenticationStatus === 1) {
            this.navigateTo('Home');
        }
    }

    navigateTo = (destination) => {
        this.props.navigator.resetTo({
            title: destination
        });
    }

    onPressRememberMe() {
        this.props.rememberUser(!this.state.rememberUser)
        this.setState({
            rememberUser: !this.state.rememberUser
        });
    }

    onPressRecoverPassword() {
        this.props.navigator.push({
            title: 'RecoverPassword'
        });
    }

    onPressSignIn() {
        this.setState({errorMessage: ''});
        if (util.hasEmptyElement(this.state.email, this.state.password)) {
            this.setState({errorMessage: strings.missingFormFields});
        } else {
            this.props.onSubmitEditing(this.state.email, this.state.password);
        }

    }

    onPressSignUp() {
        this.props.navigator.push({
            title: 'SignUp'
        });
    }

    autoSubmitFormWhenLastInputIsFilled() {
        if (this.state.email.length && this.state.password.length) {
            this.onPressSignIn();
            return true;
        }
        return false;
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>
                <ScrollView>
                    <View style={{flexDirection: 'column', justifyContent: 'center', padding: 30}}>

                        {this.renderLogo()}
                        {this.renderEmailInput()}
                        {this.renderPasswordInput()}

                        <View style={{flexDirection: 'row', flex: 1}}>
                            {this.renderRememberPasswordCheckbox()}

                            <View style={{flex: 1, alignItems: 'flex-end'}}>
                                {this.renderRecoverPassword()}
                            </View>
                        </View>

                        {this.renderDisplayErrorMessages()}
                        {this.renderSubmit()}
                        {this.renderGoToSignUpForm()}
                    </View>
                </ScrollView>
            </View>
        )
    }

    renderDisplayErrorMessages = () => {
        let errorMessage = '';
        switch (this.props.authenticationStatus) {
            case 2:
                errorMessage = strings.unableToReachServer;
                break;
            case 3:
                errorMessage = strings.wrongCredentials;
                break;
            default:
                break
        }

        return (
            <AppText style={styles.errorInfo}>{errorMessage}</AppText>
        );
    }

    renderEmailInput() {
        return (
            <EmailInput ref="email"
                        onChangeText={email => this.setState({email})}
                        value={this.state.email}
                        onSubmitEditing={() => {
                            if (!this.autoSubmitFormWhenLastInputIsFilled())
                                this.refs.password.focus();
                        }}
            />
        );
    }

    renderGoToSignUpForm() {
        return (
            <TouchableHighlight onPress={this.onPressSignUp} underlayColor='transparent'>
                <AppText
                    style={{textAlign: 'center', fontSize: 12, color: 'blue', fontStyle: 'italic', marginTop: 15}}>
                    {strings.createAccountLink}
                </AppText>
            </TouchableHighlight>
        );
    }

    renderLogo() {
        return (
            <View style={{alignItems: 'center', paddingBottom: 50}}>
                <Image
                    source={require('./../images/loginLogo.png')}
                    style={{width: 110, height: 110}}
                />
            </View>
        );
    }

    renderPasswordInput() {
        return (
            <PasswordInput ref="password"
                           onChangeText={password => this.setState({password})}
                           value={this.state.password}
                           onSubmitEditing={() => {
                               if (!this.autoSubmitFormWhenLastInputIsFilled())
                                   this.refs.email.focus();
                           }}/>
        );
    }

    renderRecoverPassword() {
        return (
            <TouchableHighlight onPress={this.onPressRecoverPassword}>
                <AppText
                    style={{textAlign: 'right', fontSize: 12, color: 'brown', fontStyle: 'italic', paddingRight: 5}}>
                    {strings.forgotPassword}
                </AppText>
            </TouchableHighlight>
        );
    }

    renderRememberPasswordCheckbox() {
        return (
            <CheckBox
                style={{flex: 1, padding: 10}}
                onClick={this.onPressRememberMe}
                isChecked={this.state.rememberUser}
                rightText={strings.rememberMe}
            />
        );
    }

    renderSubmit() {
        return (
            <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 30}}>
                <View style={{flex: 1, padding: 5}}>
                    <Button
                        onPress={this.onPressSignIn}
                        title={strings.signIn}
                        color="#841584"
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    errorInfo: {
        textAlign: 'center',
        fontSize: 12,
        color: 'brown',
        fontStyle: 'italic'
    },
    invalidFormat: {
        borderColor: 'crimson',
        borderWidth: 1
    },
    textInput: {
        borderWidth: 0,
        borderRadius: 10,
        fontSize: 18,
        textAlign: 'center',
        padding: 4,
        height: 40,
        marginBottom: 10,
    }
});