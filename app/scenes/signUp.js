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
import * as util from './../util';
import * as db from '../components/db';

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

        this.props.navigator.push({
            title: 'Home'
        });
    }

    onChangeEmailText(text) {
        this.setState({
            email: text,
            isEmailValid: util.isPasswordValid(text) || !text.length,
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
                let userAlreadyExists = await db.hasUser(this.state.email);
                if (userAlreadyExists) {
                    this.setState({errorMessage: 'This email is already used.'});
                } else {
                    let email = this.state.email.toLowerCase();
                    let userAddedSuccessfully = await db.addUser(email, this.state.password);
                    if (userAddedSuccessfully) {
                        this.setState({modalVisible: true});
                    } else {
                        this.setState({errorMessage: 'Sign up failed. There was a problem with the server.'});
                    }
                }
            } catch (error) {
                console.warn('signUp::onPressSignUp ' + error);
                this.setState({errorMessage: "Couldn't sign up."});
            }
        }
    }

    render() {
        // Messages to help the user fill the form
        // Only relevant ones are showed
        // Several messages can be showed at the same time (in the following order)
        let emailMessage = !this.state.isEmailValid ?
            <Text style={styles.errorInfo}>This is not a valid email.</Text> : null;
        let passwordMessage = !this.state.isPasswordValid ?
            <Text style={styles.errorInfo}>The password must contain at least 6 characters.</Text> : null;
        let passwordCheckMessage = !this.state.isPasswordCheckValid ?
            <Text style={styles.errorInfo}>{"The passwords don't match."}</Text> : null;
        let missingFieldsMessage = !this.state.isFormCompletelyFilled ?
            <Text style={styles.errorInfo}>Please fill all the fields.</Text> : null;
        let errorMessage = this.state.errorMessage.length > 0 ?
            <Text style={styles.errorInfo}>{this.state.errorMessage}</Text> : null;

        return (
            <View style={{flex:1, justifyContent: 'center', marginBottom:100}}>
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
                            styles.textInput,
                            !this.state.isEmailValid && styles.invalidFormat
                            ]}
                                placeholder="Email"
                                keyboardType="email-address"
                                autoCorrect={false}
                                selectTextOnFocus={true}
                                underlineColorAndroid={"white"}
                                onChangeText={this.onChangeEmailText}
                            />
                        </View>

                        {/* User password input */}
                        <View >
                            <TextInput
                                style={[
                            styles.textInput,
                            !this.state.isPasswordValid && styles.invalidFormat
                            ]}
                                placeholder="Password"
                                password={true}
                                autoCorrect={false}
                                selectTextOnFocus={true}
                                underlineColorAndroid={"white"}
                                minLength={6}
                                secureTextEntry={true}
                                onChangeText={this.onChangePasswordText}
                            />
                        </View>

                        {/* User password verification input */}
                        <View >
                            <TextInput
                                style={[
                            styles.textInput,
                            !this.state.isPasswordCheckValid && styles.invalidFormat
                            ]}
                                placeholder="Verify password"
                                password={true}
                                autoCorrect={false}
                                selectTextOnFocus={true}
                                underlineColorAndroid={"white"}
                                minLength={6}
                                secureTextEntry={true}
                                onChangeText={this.onChangePasswordCheckText}
                            />
                        </View>

                        {/* Display error messages to help the user fill out the form */}
                        <View>
                            {emailMessage}
                            {passwordMessage}
                            {passwordCheckMessage}
                            {missingFieldsMessage}
                            {errorMessage}
                        </View>

                        {/* Notify the user when their account was created before redirecting to home page */}
                        {this.renderAccountCreationPopout()}

                        {/* SIGN IN and SIGN UP buttons */}
                        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop:30}}>
                            <View style={{flex:1, padding:5}}>
                                <Button
                                    onPress={this.onPressSignUp}
                                    title="Sign up"
                                    color="#841584"
                                />
                            </View>
                        </View>

                        {/* Log in instead of creating a new account */}
                        <TouchableHighlight onPress={this.onPressSignIn}>
                            <Text
                                style={{textAlign: 'center', fontSize: 12, color: 'blue', fontStyle: 'italic', marginTop:15}}>
                                Already have an account? Sign in
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
                                {"Account created! \nLet's see what's happening around!\n\n"}
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
}

var styles = StyleSheet.create({
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
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 18,
        textAlign: 'center'
    }
});