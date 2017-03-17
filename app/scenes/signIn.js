/**
 * Created by AAB3605 on 13/02/2017.
 */
'use strict';
import React, {Component} from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    Navigator,
    Image,
    NavMenu,
    ScrollView,
    View,
    TouchableOpacity,
    ListView,
    Dimensions,
    Button,
    Alert,
    TouchableHighlight
} from "react-native";
import CheckBox from "react-native-check-box";
import styles from "./../styles/form";
import db from "../util/db";
import * as util from "../util/util.js";
import strings from "../util/localizedStrings";
import EmailInput from './../components/emailInput';
import PasswordInput from './../components/passwordInput';

export default class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errorMessage: '',
            rememberUser: false
        };

        this.autoSubmitFormWhenLastInputIsFilled = this.autoSubmitFormWhenLastInputIsFilled.bind(this);
        this.onPressRememberMe = this.onPressRememberMe.bind(this);
        this.onPressRecoverPassword = this.onPressRecoverPassword.bind(this);
        this.onPressSignIn = this.onPressSignIn.bind(this);
        this.onPressSignUp = this.onPressSignUp.bind(this);
    }

    onPressRememberMe() {
        this.setState({
            rememberUser: !this.state.rememberUser
        });
    }

    onPressRecoverPassword() {
        this.props.navigator.push({
            title: 'RecoverPassword'
        });
    }

    authenticateUser = async () => {
        try {
            this.setState({email: this.state.email.toLowerCase()});
            let user = await db.authenticate(this.state.email, this.state.password);
            const unabledToReachServerCode = -1;
            if (user == unabledToReachServerCode) {
                this.setState({errorMessage: strings.unableToReachServer});
            } else if (user) {
                this.props.navigator.resetTo({
                    title: 'Home',
                    passProps: {
                        user
                    }
                });
            } else {
                this.setState({errorMessage: strings.wrongCredentials});
            }
        } catch (error) {
            console.warn('signIn::authenticateUser ' + error);
            this.setState({errorMessage: strings.unableToReachServer});
        }
    }

    async onPressSignIn() {
        this.setState({errorMessage: ''});
        if (util.hasEmptyElement(this.state.email, this.state.password)) {
            this.setState({errorMessage: strings.missingFormFields});
        } else {
            this.authenticateUser();
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
            <View style={{flex:1, justifyContent: 'center', backgroundColor:'white'}}>
                <ScrollView>
                    <View style={{flexDirection: 'column', justifyContent: 'center', padding:30}}>

                        {this.renderLogo()}
                        {this.renderEmailInput()}
                        {this.renderPasswordInput()}

                        <View style={{flexDirection: 'row', flex:1}}>
                            {this.renderRememberPasswordCheckbox()}

                            <View style={{flex:1, alignItems: 'flex-end'}}>
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
        return (
            <Text style={styles.errorInfo}>{this.state.errorMessage}</Text>
        );
    }

    renderEmailInput() {
        return(
            <EmailInput ref="email"
                        onChangeText={email => this.setState({email})}
                        onSubmitEditing={() => {
                if(!this.autoSubmitFormWhenLastInputIsFilled())
                                 this.refs.password.focus();}}/>
        );
    }

    renderGoToSignUpForm() {
        return (
            <TouchableHighlight onPress={this.onPressSignUp} underlayColor='transparent'>
                <Text
                    style={{textAlign: 'center', fontSize: 12, color: 'blue', fontStyle: 'italic', marginTop:15}}>
                    {strings.createAccountLink}
                </Text>
            </TouchableHighlight>
        );
    }

    renderLogo() {
        return (
            <View style={{alignItems: 'center', paddingBottom:50}}>
                <Image
                    source={require('./../images/loginLogo.png')}
                    style={{width: 110, height: 110}}
                />
            </View>
        );
    }

    renderPasswordInput() {
        return(
            <PasswordInput ref="password"
                        onChangeText={password => this.setState({password})}
                        onSubmitEditing={() => {
                if(!this.autoSubmitFormWhenLastInputIsFilled())
                                 this.refs.email.focus();}}/>
        );
    }

    renderRecoverPassword() {
        return (
            <TouchableHighlight onPress={this.onPressRecoverPassword}>
                <Text
                    style={{textAlign: 'right', fontSize: 12, color: 'brown', fontStyle: 'italic',paddingRight:5}}>
                    {strings.forgotPassword}
                </Text>
            </TouchableHighlight>
        );
    }

    renderRememberPasswordCheckbox() {
        return (
            <CheckBox
                style={{flex: 1, padding: 10}}
                onClick={this.onPressRememberMe}
                isChecked={true}
                rightText={strings.rememberMe}
            />
        );
    }

    renderSubmit() {
        return (
            <View style={{flexDirection: 'row', justifyContent: 'center', marginTop:30}}>
                <View style={{flex:1, padding:5}}>
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