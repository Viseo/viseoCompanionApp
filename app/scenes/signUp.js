/**
 * Created by AAB3605 on 14/02/2017.
 */
'use strict';
import React, {Component} from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    Image,
    NavMenu,
    ScrollView,
    View,
    TouchableOpacity,
    ListView,
    Dimensions,
    Button,
    Alert,
    TouchableHighlight,
    Modal
} from "react-native";
import * as util from '../util/util';
import db from '../util/db';
import formStyle from './../styles/form';
import strings from '../util/localizedStrings';

export default class SignUp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            isEmailValid: true,
            password: '',
            isPasswordValid: true,
            passwordCheck: '',
            isPasswordCheckValid: true,
            isFormCompletelyFilled: true,
            errorMessage: '',
            modalVisible: false
        }

        this.onAccountCreatedNotificationPressed = this.onAccountCreatedNotificationPressed.bind(this);
        this.onChangeEmailText = this.onChangeEmailText.bind(this);
        this.onChangePasswordText = this.onChangePasswordText.bind(this);
        this.onChangePasswordCheckText = this.onChangePasswordCheckText.bind(this);
        this.onPressSignIn = this.onPressSignIn.bind(this);
        this.onPressSignUp = this.onPressSignUp.bind(this);
    }

    onAccountCreatedNotificationPressed() {
        this.setState({
            modalVisible: false
        });

        this.props.navigator.resetTo({
            title: 'Home'
        });
    }

    onChangeEmailText(text) {
        this.setState({
            email: text,
            isEmailValid: util.isEmailValid(text) || !text.length,
            isFormCompletelyFilled: true
        });
    }

    onChangePasswordText(text) {
        this.setState({
            password: text,
            isPasswordValid: util.isPasswordValid(text) || !text.length,
            isFormCompletelyFilled: true
        });
    }

    onChangePasswordCheckText(text) {
        let isPasswordCheckValid = this.state.password === text || !text.length;

        this.setState({
            passwordCheck: text,
            isPasswordCheckValid: isPasswordCheckValid,
            isFormCompletelyFilled: true
        });
    }

    onPressSignIn() {
        this.props.navigator.pop();
    }

    async onPressSignUp() {
        this.setState({errorMessage: ''});

        if (util.hasEmptyElement(this.state.email, this.state.password, this.state.passwordCheck)) {
            this.setState({isFormCompletelyFilled: false});
        } else if (!util.isEmailValid(this.state.email)) {
            this.setState({isEmailValid: false});
        } else if (!util.isPasswordValid(this.state.password)) {
            this.setState({isPasswordValid: false});
        } else if (this.state.password !== this.state.passwordCheck) {
            this.setState({isPasswordCheckValid: false});
        } else {
            try {
                let userAlreadyExists = await db.getUserByEmail(this.state.email);
                if (userAlreadyExists) {
                    this.setState({errorMessage: strings.emailAlreadyUsed});
                } else {
                    let email = this.state.email.toLowerCase();
                    let userAddedSuccessfully = await db.addUser(email, this.state.password);
                    if (userAddedSuccessfully) {
                        this.setState({modalVisible: true});
                    } else {
                        this.setState({errorMessage: strings.unableToReachServer});
                    }
                }
            } catch (error) {
                console.warn('signUp::onPressSignUp ' + error);
                this.setState({errorMessage: strings.unableToReachServer});
            }
        }
    }

    autoSubmitFormWhenLastInputIsFilled() {
        if(this.state.email.length && this.state.password.length && this.state.passwordCheck.length) {
            this.onPressSignUp();
            return true;
        }

        return false;
    }

    render() {
        return (
            <View style={{flex:1, justifyContent: 'center'}}>
                <ScrollView>
                    <View style={{flexDirection: 'column', justifyContent: 'center', padding:30}}>

                        {/* VISEO or SIGN UP logo */}
                        <View style={{alignItems: 'center', paddingBottom:50}}>
                            <Image
                                source={require('./../images/signUpLogo.png')}
                                style={{width: 110, height: 110}}
                            />
                        </View>

                        {/* User email input */}
                        <View>
                            <TextInput
                                style={[
                            formStyle.textInput,
                            !this.state.isEmailValid && formStyle.invalidFormat
                            ]}
                                placeholder={strings.email}
                                keyboardType="email-address"
                                autoCorrect={false}
                                selectTextOnFocus={true}
                                underlineColorAndroid={"white"}
                                onChangeText={this.onChangeEmailText}
                                returnKeyType="next"
                                autoCapitalize="none"
                                onSubmitEditing={() => {
                                    this.refs.password.focus();
                                }}
                            />
                        </View>

                        {/* User password input */}
                        <View >
                            <TextInput
                                style={[
                            formStyle.textInput,
                            !this.state.isPasswordValid && formStyle.invalidFormat
                            ]}
                                ref="password"
                                placeholder={strings.password}
                                password={true}
                                autoCorrect={false}
                                selectTextOnFocus={true}
                                underlineColorAndroid={"white"}
                                minLength={6}
                                secureTextEntry={true}
                                onChangeText={this.onChangePasswordText}
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    this.refs.passwordBis.focus();
                                }}
                            />
                        </View>

                        {/* User password verification input */}
                        <View >
                            <TextInput
                                style={[
                            formStyle.textInput,
                            !this.state.isPasswordCheckValid && formStyle.invalidFormat
                            ]}
                                ref="passwordBis"
                                placeholder={strings.verifyPassword}
                                password={true}
                                autoCorrect={false}
                                selectTextOnFocus={true}
                                underlineColorAndroid={"white"}
                                minLength={6}
                                secureTextEntry={true}
                                onChangeText={this.onChangePasswordCheckText}
                                returnKeyType="done"
                                onSubmitEditing={() => {
                                        if (!util.hasEmptyElement(this.state.email, this.state.password, this.state.passwordCheck)
                                            && util.isEmailValid(this.state.email)
                                            && util.isPasswordValid(this.state.password)
                                            && this.state.password == this.state.passwordCheck) {
                                            this.autoSubmitFormWhenLastInputIsFilled();
                                        }
                                    }
                                }
                            />
                        </View>

                        {/* Display error messages to help the user fill out the form */}
                        {this.renderFormFillingInformation()}

                        {/* Notify the user when their account was created before redirecting to home page */}
                        {this.renderAccountCreationPopout()}

                        {/* SIGN UP button */}
                        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop:30}}>
                            <View style={{flex:1, padding:5}}>
                                <Button
                                    onPress={this.onPressSignUp}
                                    title={strings.signUp}
                                    color="#841584"
                                />
                            </View>
                        </View>

                        {/* Log in instead of creating a new account */}
                        <TouchableHighlight onPress={this.onPressSignIn} underlayColor='transparent'>
                            <Text
                                style={{textAlign: 'center', fontSize: 12, color: 'blue', fontStyle: 'italic', paddingTop:15}}>
                                {strings.signInLink}
                            </Text>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
            </View>
        );
    }

    renderAccountCreationPopout() {
        return (
            <View>
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.onAccountCreatedNotificationPressed;
                    }}
                >
                    <View style={{flex:2, backgroundColor: 'rgba(227, 254, 255, 0.5)'}}></View>
                    <View
                        style={{
                            flex:1,
                            justifyContent: 'center',
                            alignItems:'center',
                            backgroundColor: 'rgba(186, 242, 255, 1)'
                        }}
                    >
                        <View>
                            <Text style={{textAlign:'center'}}>
                                {strings.accountCreated}
                            </Text>
                            <Button
                                onPress={this.onAccountCreatedNotificationPressed}
                                title="OK"
                                color="#6ABEFF"
                            />
                        </View>
                    </View>
                    <View style={{flex:2, backgroundColor: 'rgba(227, 254, 255, 0.5)'}}></View>
                </Modal>
            </View>
        );
    }

    renderFormFillingInformation() {
        // Messages to help the user fill the form
        // Only relevant ones are showed
        // Several messages can be showed at the same time (in the following order)
        let emailMessage = !this.state.isEmailValid ?
            <Text style={formStyle.errorInfo}>{strings.invalidEmailFormat}</Text> : null;
        let passwordMessage = !this.state.isPasswordValid ?
            <Text style={formStyle.errorInfo}>{strings.invalidPasswordFormat}</Text> : null;
        let passwordCheckMessage = !this.state.isPasswordCheckValid ?
            <Text style={formStyle.errorInfo}>{strings.passwordsDontMatch}</Text> : null;
        let missingFieldsMessage = !this.state.isFormCompletelyFilled ?
            <Text style={formStyle.errorInfo}>{strings.missingFormFields}</Text> : null;
        let errorMessage = this.state.errorMessage.length > 0 ?
            <Text style={formStyle.errorInfo}>{this.state.errorMessage}</Text> : null;

        return (
            <View>
                {emailMessage}
                {passwordMessage}
                {passwordCheckMessage}
                {missingFieldsMessage}
                {errorMessage}
            </View>
        );
    }
}
